## API документація

API проєкту описаний за допомогою OpenAPI 3.0.

### OpenAPI контракт

[Переглянути `openapi.yaml`](docs/api/openapi.yaml)

### Swagger Editor

Специфікація API була перевірена та відображена в Swagger Editor.

![Swagger API документація](docs/api/swagger_screenshot.png)

# Docker

Структура проєкту:

- frontend — React/Vite застосунок
- backend — Node.js API (PostgreSQL)
- docker-compose.yml — сервіси web, api, db

## 1. Перевірка Docker

```
docker version
docker run hello-world
```

Очікуваний результат: у виводі є «Hello from Docker!».

[Переглянути скрішот працездатності](docs/docker/image.png)

## 2. Контейнеризація застосунку

Файли:

- frontend/Dockerfile, frontend/.dockerignore, frontend/nginx.conf
- backend/Dockerfile, backend/.dockerignore

### Frontend (React/Vite + Nginx)

```
cd frontend
npm run build
docker build -t parfumes-web:1.0.0 .
docker run --name web --rm -d -p 5173:80 parfumes-web:1.0.0
docker logs web
docker stop web
```

Порт доступу: http://localhost:5173

### Backend (Node.js API)

Перед запуском створити backend/.env за зразком backend/.env.example.

```
docker build -t parfumes-api-node:1.0.0 ./backend
docker run --name api --rm -d -p 5000:5000 --env-file backend/.env parfumes-api-node:1.0.0
docker logs api
docker stop api
```

Порт доступу: http://localhost:5000 (перевірка: http://localhost:5000/health)

[Переглянути скрішот працездатності](docs/docker/container.png)

## 3. Docker Compose (web + api + db)

Сервіси:

- web — frontend (Nginx), http://localhost:5173
- api — backend, http://localhost:5000
- db — PostgreSQL 15, порт 5432

Змінні середовища API (PORT, DATABASE_URL, SECRET_KEY) беруться з backend/.env.

### Запуск

```
docker compose up -d --build
```

### Перевірка

```
docker ps
docker logs web
docker logs api
curl http://localhost:5000/health
```

Очікувана відповідь API: {"status":"ok"}

У застосунку є middleware, який навмисно повертає випадкові помилки 500/503 приблизно для 20% запитів, тому за потреби запит треба повторити.

Frontend: http://localhost:5173

### Зупинка

```
docker compose down
```

## Відтворення з нуля на чистій машині

1. Встановити Docker Desktop і перевірити: docker version, docker run hello-world.
2. Клонувати репозиторій.
3. Створити backend/.env за зразком backend/.env.example.
4. Виконати docker compose up -d --build.
5. Відкрити http://localhost:5173 і перевірити API: curl http://localhost:5000/health.
6. Зупинити: docker compose down.

# CI/CD (frontend)

## Client CI

Workflow: `.github/workflows/client-ci.yml`.

### Локальний запуск клієнта

```bash
npm run dev
npm ci
```

### Перевірки

```bash
npm run lint
npm run test:ci
npm run build
```

### Артефакти

Після виконання workflow зберігаються:

- `frontend-coverage` — звіт покриття тестами;
- `frontend-junit` — результати тестування у форматі JUnit;
- `frontend-dist` — production-збірка frontend.

## Server CI

Workflow: `.github/workflows/server-ci.yml`.

## Delivery: GitHub Container Registry

Для доставки застосунку використовуються Docker-образи, які автоматично збираються та публікуються в GHCR після успішного проходження відповідних перевірок.

Frontend:

`ghcr.io/irynaboyarska/parfumes-store-client:v1.0.1`

Backend:

`ghcr.io/T1pOK220/parfumes-store-server:v1.0.0`

### Посилання

- Client CI: [https://github.com/irynaboyarska/parfumes-store/actions/workflows/client-ci.yml](https://github.com/irynaboyarska/parfumes-store/actions/workflows/client-ci.yml)
- Server CI: [https://github.com/irynaboyarska/parfumes-store/actions/workflows/server-ci.yml](https://github.com/irynaboyarska/parfumes-store/actions/workflows/server-ci.yml)
- Client package: [https://github.com/irynaboyarska/parfumes-store/pkgs/container/parfumes-store-client](https://github.com/irynaboyarska/parfumes-store/pkgs/container/parfumes-store-client)
- Server package: [https://github.com/T1pOK220/parfumes-store/pkgs/container/parfumes-store-server](https://github.com/T1pOK220/parfumes-store/pkgs/container/parfumes-store-server)

## Style points

У проєкті реалізовані додаткові практики CI/CD:

1. **Семантичне тегування** — використання версій `vX.Y.Z` та SHA-тегів для ідентифікації Docker-образів.
2. **Посилений контроль permissions** — мінімальні права доступу `contents: read`, а `packages: write` надається лише job публікації.
3. **Concurrency control** — скасування попередніх запусків workflow для тієї самої групи через `cancel-in-progress`.
4. **Job Summary** — автоматичне формування звіту з показниками test coverage, посиланнями на запуск та інформацією про Docker-образи.
5. **Trivy security scan** — перевірка Docker-образів на вразливості.
6. **Dependabot** — автоматичне оновлення npm-залежностей та GitHub Actions.
