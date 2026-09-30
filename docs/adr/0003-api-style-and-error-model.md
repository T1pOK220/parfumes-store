# ADR 0003 — Стиль API та модель помилок

## Статус

Прийнято

## Контекст

Для інтернет-магазину парфумів необхідно визначити єдиний стиль побудови API, правила використання HTTP-методів та статус-кодів, а також єдиний формат повідомлень про помилки.

API використовується frontend-застосунком для роботи з парфумами, користувачами, кошиком, замовленнями та обраними товарами.

Також необхідно забезпечити відповідність API його документації OpenAPI.

## Прийняте рішення

### 1. Стиль REST API

API будується відповідно до принципів REST.

Для назв endpoint використовуються назви ресурсів, а операція визначається HTTP-методом.

Основні ресурси магазину:

* `/api/perfumes` — парфуми;
* `/api/users` — користувачі;
* `/api/cart` — кошик;
* `/api/orders` — замовлення;
* `/api/favourites` — обрані парфуми.

Для роботи з парфумами використовуються такі endpoint:

```http
GET /api/perfumes
GET /api/perfumes/{id}
POST /api/perfumes
PATCH /api/perfumes/{id}
DELETE /api/perfumes/{id}
```

Не використовуються endpoint, у назві яких описується дія:

```http
GET /api/getPerfumes
POST /api/createPerfume
DELETE /api/deletePerfume/{id}
```

Замість цього дія визначається HTTP-методом.

### 2. HTTP-методи

| Метод  | Призначення                |
| ------ | -------------------------- |
| GET    | Отримання даних            |
| POST   | Створення нового ресурсу   |
| PATCH  | Часткове оновлення ресурсу |
| DELETE | Видалення ресурсу          |

Приклади:

```http
GET /api/perfumes
```

отримує список парфумів.

```http
POST /api/perfumes
```

створює новий парфум.

```http
PATCH /api/perfumes/15
```

оновлює дані парфуму з ID `15`.

```http
DELETE /api/perfumes/15
```

видаляє парфум з ID `15`.

### 3. Політика HTTP статус-кодів

API використовує такі основні HTTP статус-коди:

| Код | Назва                 | Використання                                 |
| --- | --------------------- | -------------------------------------------- |
| 200 | OK                    | Успішне отримання або оновлення даних        |
| 201 | Created               | Успішне створення ресурсу                    |
| 204 | No Content            | Успішне видалення ресурсу без тіла відповіді |
| 400 | Bad Request           | Некоректний запит                            |
| 401 | Unauthorized          | Користувач не авторизований                  |
| 403 | Forbidden             | Користувач не має необхідних прав            |
| 404 | Not Found             | Ресурс не знайдено                           |
| 409 | Conflict              | Конфлікт даних                               |
| 422 | Unprocessable Content | Помилка валідації даних                      |
| 500 | Internal Server Error | Внутрішня помилка сервера                    |

Наприклад, якщо парфум з ID `15` існує:

```http
GET /api/perfumes/15
```

повертається:

```http
200 OK
```

Якщо такого парфуму немає:

```http
404 Not Found
```

Якщо новий парфум успішно створений:

```http
201 Created
```

### 4. Формат успішної відповіді

Успішна відповідь повинна містити дані у форматі JSON.

Наприклад:

```json
{
  "id": 15,
  "name": "Dior Sauvage",
  "price": 3500,
  "volume": 100,
  "gender": "Чоловічий",
  "type": "Деревний",
  "stock": 10
}
```

Для отримання списку парфумів API повертає масив:

```json
[
  {
    "id": 15,
    "name": "Dior Sauvage",
    "price": 3500,
    "volume": 100,
    "gender": "Чоловічий",
    "type": "Деревний",
    "stock": 10
  },
  {
    "id": 16,
    "name": "Chanel Coco Mademoiselle",
    "price": 4200,
    "volume": 100,
    "gender": "Жіночий",
    "type": "Квітковий",
    "stock": 5
  }
]
```

### 5. Єдиний формат помилок

Для всіх помилок API використовується єдиний формат `ErrorResponse`.

```json
{
  "error": "ValidationError",
  "code": "NAME_REQUIRED",
  "details": [
    {
      "field": "name",
      "message": "Name is required"
    }
  ]
}
```

Основні поля:

* `error` — тип помилки;
* `code` — унікальний код конкретної помилки;
* `details` — додаткова інформація про помилку;
* `details.field` — поле, якого стосується помилка;
* `details.message` — опис помилки.

Поле `details` може містити декілька помилок, якщо запит містить декілька некоректних полів.

### 6. Помилки валідації

Якщо передані некоректні дані, API повертає статус `422`.

Наприклад, якщо під час створення парфуму не вказана назва та передані некоректні ціна і об'єм:

```json
{
  "error": "ValidationError",
  "code": "VALIDATION_FAILED",
  "details": [
    {
      "field": "name",
      "message": "Name is required"
    },
    {
      "field": "price",
      "message": "Price must be greater than 0"
    },
    {
      "field": "volume",
      "message": "Volume must be greater than 0"
    }
  ]
}
```

### 7. Приклади помилок API

Якщо користувач намагається отримати неіснуючий парфум:

```http
GET /api/perfumes/999
```

відповідь:

```http
404 Not Found
```

```json
{
  "error": "NotFoundError",
  "code": "PERFUME_NOT_FOUND",
  "details": [
    {
      "field": "id",
      "message": "Perfume with id 999 was not found"
    }
  ]
}
```

Якщо користувач не авторизований:

```http
401 Unauthorized
```

```json
{
  "error": "AuthenticationError",
  "code": "UNAUTHORIZED",
  "details": [
    {
      "field": "authorization",
      "message": "Authentication is required"
    }
  ]
}
```

Якщо користувач не має необхідних прав:

```http
403 Forbidden
```

```json
{
  "error": "AuthorizationError",
  "code": "FORBIDDEN",
  "details": [
    {
      "field": "authorization",
      "message": "You do not have permission to perform this operation"
    }
  ]
}
```

### 8. Робота з кошиком та замовленнями

Для інших ресурсів використовуються такі самі правила REST API.

Для кошика:

```http
GET /api/cart
POST /api/cart
PATCH /api/cart/{id}
DELETE /api/cart/{id}
```

Для замовлень:

```http
GET /api/orders
GET /api/orders/{id}
POST /api/orders
```

Для обраних товарів:

```http
GET /api/favourites
POST /api/favourites
DELETE /api/favourites/{id}
```

Таким чином, всі частини API використовують однаковий підхід до назв endpoint, HTTP-методів, статус-кодів та помилок.

### 9. Відповідність OpenAPI

Усі API endpoint повинні бути описані в OpenAPI-документації.

Для кожного endpoint документація повинна містити:

* URL endpoint;
* HTTP-метод;
* параметри запиту;
* структуру `request body`, якщо вона використовується;
* структуру успішної відповіді;
* можливі HTTP статус-коди;
* структуру помилок `ErrorResponse`.

Наприклад, endpoint:

```http
GET /api/perfumes/{id}
```

повинен бути описаний в OpenAPI разом із параметром `id`, успішною відповіддю `200` та помилкою `404`.

Модель помилки `ErrorResponse` описується в OpenAPI та використовується повторно для різних endpoint.

## Наслідки

### Позитивні наслідки

* API має єдиний стиль для всіх ресурсів.
* Frontend простіше взаємодіє з backend.
* HTTP статус-коди мають визначене призначення.
* Помилки мають однакову структуру.
* API простіше документувати за допомогою OpenAPI.
* Додавання нових ресурсів не потребує створення нового стилю endpoint.

### Негативні наслідки

* Необхідно дотримуватися встановлених правил під час розробки нових endpoint.
* При зміні API необхідно оновлювати OpenAPI-документацію.
* Backend повинен
