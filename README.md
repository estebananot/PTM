
```md
# PTM · Product Inventory (Full Stack)

Monorepo con:
- **MySQL 8** (contenedor `crud_db`)
- **Spring Boot (Java 21)** API (contenedor `crud_api`)
- **Vite + React + Tailwind** servido por **Nginx** (contenedor `crud_web`)

La UI consume el backend por `/api/...` a través de Nginx, así que no hay problemas de CORS.

---

## Requisitos
- Docker Desktop instalado y corriendo
- Docker Compose (incluido en Docker Desktop)

---

## Estructura del proyecto
```

.
├── backend/
├── frontend/
├── db/
├── docker-compose.yml
└── .env



---

## Variables de entorno (.env en la raíz)
Crea un archivo **.env** al lado de `docker-compose.yml`:

```env
MYSQL_ROOT_PASSWORD=XXX
MYSQL_DB=XXX
MYSQL_USER=XXX
MYSQL_PASSWORD=XXX
````

---

## Ejecutar el proyecto

Desde la **carpeta raíz**:

```bash
docker compose up --build
```

Abrir:

* Front: [http://localhost:3000](http://localhost:3000)
* API: [http://localhost:8080](http://localhost:8080)

---

## Detener el proyecto

```bash
docker compose down
```

---

## Reload / Rebuild (cuando cambias código o configuración)

### Rebuild completo:

```bash
docker compose down
docker compose up --build
```

### Rebuild solo un servicio (ej: backend):

```bash
docker compose build api --no-cache
docker compose up -d api
```

### Ver logs (útil para debug):

```bash
docker compose logs -f
```
