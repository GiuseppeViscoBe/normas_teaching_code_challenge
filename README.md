# 📸 Image Search API ReadMe

### Overview  
A backend application that allows searching images via Unsplash, saving images to favourites, and managing favourite images.

### Technologies Used  
- **Node.js**: Backend server environment.  
- **Express.js**: Web framework for Node.js.  
- **MongoDB**: Database used to manage favourites.  
- **TypeScript**: Programming language to ensure type safety.  
- **Typegoose**: Schema validation library for defining and validating MongoDB schemas in TypeScript.  
- **Axios**: HTTP client used to make requests to the Unsplash API and retrieve image data.  
- **Morgan**: Middleware for easy and configurable HTTP request logging.  
- **Pino**: High-performance logger for Node.js, used for structured and asynchronous system and error logging.

## 🚀 Features

### 🔍 Image Search  
- Perform a search on [Unsplash](https://unsplash.com) via text query (`/search?query=cats`)  
- **Structured** response with the following properties:  
  - `id`  
  - `width`  
  - `height`  
  - all available URLs (e.g. `regular`, `thumb`, etc.)  
  - `description`

### ⭐ Favourites Management  
- Add a photo to favourites  
- Remove a photo from favourites  
- View all saved favourite images  

## 🧭 API Endpoints  

Base URL: `/api/1`

---

### 🔍 Image Search

- **GET** `/search?query=<term>&page=<number>`

Search Unsplash images based on the specified term and support pagination via the `page` parameter.

**Query Parameters:**

| Name     | Type   | Description                      |
|----------|--------|--------------------------------|
| query    | string | Search term (e.g. "cats")       |
| page     | number | Page number (optional)           |
| per_page | number | Results per page (optional)      |

**Behavior:**  
- Makes a call to the Unsplash API using `axios`.  
- Uses `UNSPLASH_URL` as endpoint and `UNSPLASH_ACCESS_KEY` as API key in the `Authorization` header.  
- Results are filtered and transformed by the `transformToFilteredImage` function, which extracts only necessary properties (`id`, `width`, `height`, `urls`, `description`).  

---

### ⭐ Favourites Management

All favourites routes require the `user-id` header to identify the user.

---

#### Add a Photo to Favourites

- **POST** `/favourites`

**Headers:**  
- `user-id`: string (required)

**JSON Body:**

```json
{
  "imageId": "abc123",
  "width": 1920,
  "height": 1080,
  "urls": {
    "regular": "https://...",
    "thumb": "https://..."
  },
  "description": "A beautiful image"
}

```

**Behavior:**
- If the user-id header is missing, it responds with a 400 error.
- If the image is already in the favourites for that user, it responds with a 409 error.
- On success, it saves the image associated with the user and returns a 201 status with the details.

**Response:**
```json
{
  "success": true,
  "message": "Favourite saved succesfully",
  "data": {
    "favourite": {
      /* saved image data */
    }
  }
}
```

#### Retrieve All Favourite Images


- **GET** `/favourites`

**Header:**
- `user-id`: string (required)

**Behavior:**
- If the user-id header is missing, responds with error 400.
- Returns the list of images saved as favourites by the user.

**Response:**
```json
{
  "success": true,
  "message": "Favourites retrieved successfully",
  "data": {
    "favourites": [
      /* array of favourite images */
    ]
  }
}

```

#### Remove an Image from Favourites

- **DELETE** `/favourites/:imageId`

**Header:**
- `user-id`: string (required)

**URL Parameters:**
- `imageId`: string (required)

**Behavior:**
- If the user-id header is missing, responds with error 400.
- If the image is not found among favourites for that user, responds with error 404.
- On success, deletes the image from favourites and returns status 200.

**Response:**
```json
{
  "success": true,
  "message": "Favourites retrieved successfully",
  "data": {
    "favourites": [
      /* array of favourite images */
    ]
  }
}

```

## ⚙️ Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-folder-name>

```

### 2. Install dependencies

```bash
npm install
```

### 3.Configure environment variables
- Crea un file .env nella root del progetto e definisci le seguenti variabili:

Create a .env file in the root of the project and define the following variables:

- UNSPLASH_ACCESS_KEY — your Unsplash API key
- PORT — the port to start the server on (e.g., 8001)
- MONGO_URI — MongoDB connection URI
- ENVIRONMENT — execution environment (e.g., development)
- UNSPLASH_URL — Unsplash endpoint URL (e.g., https://api.unsplash.com/search/photos)

Example .env:
  ```json
UNSPLASH_ACCESS_KEY=your_unsplash_key_here
PORT=8001
MONGO_URI=your_mongodb_connection_string_here
ENVIRONMENT=development
UNSPLASH_URL=https://api.unsplash.com/search/photos
  ```
### 4. Start the server

```bash
npm run dev
```

The server will be available by default at http://localhost:8000.
Otherwise on the port specified in the configuration file.

## 🧪 Test

### Run all tests
To run all tests once:

```bash
npm test
```

To run tests in watch mode (automatically restart on changes):
```bash
npm run test:watch
```
### Contributors
- Giuseppe Visco


