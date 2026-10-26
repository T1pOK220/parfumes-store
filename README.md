## API документація

API проєкту описаний за допомогою OpenAPI 3.0.

### OpenAPI контракт

[Переглянути `openapi.yaml`](docs/api/openapi.yaml)

### Swagger Editor

Специфікація API була перевірена та відображена в Swagger Editor.

![Swagger API документація](docs/api/swagger_screenshot.png)

## Docker

### Преревірка працездатності docker.
docker version 
docker run hello-world

[Переглянути скрішот працездатності](docs/docker/image.png)

### Dockerfile(backend)

Збірка Docker-образу:

cd backend
docker build -t myapp-node:1.0.0 

Запуск контейнера:

docker run --name parfumes-api --rm -d -p 5000:5000 parfumes-api-node:1.0.0

Пояснення параметрів:

--name myapp — задає ім'я контейнера.

--rm — автоматично видаляє контейнер після його зупинки.

-d — запускає контейнер у фоновому режимі.

-p 5000:5000 — зіставляє порт 5000 комп'ютера з портом 5000 контейнера.

myapp-node:1.0.0 — образ, на основі якого створюється контейнер.

Перегляд логів:

docker logs -f myapp

[Переглянути скрішот працездатності](docs/docker/container.png)

Перевірка запущених контейнерів:

docker ps

Зупинка контейнера:

docker stop myapp

Перевірка запущених контейнерів:

docker ps

Зупинка контейнера:

docker stop myapp