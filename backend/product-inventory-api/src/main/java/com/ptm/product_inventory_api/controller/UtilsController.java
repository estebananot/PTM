package com.ptm.product_inventory_api.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/utils")
public class UtilsController {

    private static final Logger log = LoggerFactory.getLogger(UtilsController.class);

    private final HttpClient client = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .followRedirects(HttpClient.Redirect.NORMAL)
            .build();

    private final ObjectMapper mapper = new ObjectMapper();

    @GetMapping(value = "/translate", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> translate(@RequestParam(required = false) String text) {
        String fallback = (text == null) ? "" : text;

        try {
            String q = URLEncoder.encode(fallback, StandardCharsets.UTF_8);

            // IMPORTANT: el "|" debe ir encodeado como %7C
            String url = "https://api.mymemory.translated.net/get?q=" + q + "&langpair=en%7Ces";

            HttpRequest req = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .timeout(Duration.ofSeconds(10))
                    .GET()
                    .build();

            HttpResponse<String> res = client.send(req, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

            if (res.statusCode() >= 200 && res.statusCode() < 300) {
                JsonNode root = mapper.readTree(res.body());
                String translated = root.path("responseData").path("translatedText").asText(fallback);
                return Map.of("text", translated);
            }

            log.warn("MyMemory returned status={}, fallback.", res.statusCode());
            return Map.of("text", fallback);

        } catch (Exception e) {
            log.warn("Translate failed (MyMemory), fallback. Reason: {}", e.toString());
            return Map.of("text", fallback);
        }
    }
}
