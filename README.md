# 📸 Ricerca Immagini API ReadMe

### Panoramica
Un'applicazione backend che consente di cercare immagini tramite Unsplash, salvare immagini nei preferiti e gestire le immagini preferite.


### Tecnologie usate
- **Node.js**: Server environment di backend.
- **Express.js**: Framework web per Node.js.
- **MongoDb**: Database usato per gestire i preferiti.
- **TypeScript**: Linguaggio di programmazione per garantire la sicurezza dei tipi.
- **Typegoose**: Schema validation library per la definizione e validazione degli schemi MongoDB in TypeScript.
- **Axios**: Client HTTP usato per effettuare richieste verso l’API di Unsplash e recuperare i dati delle immagini.
- **Morgan**: Middleware per il logging delle richieste HTTP in modo semplice e configurabile.
- **Pino**: Logger ad alte prestazioni per Node.js, usato per il logging strutturato e asincrono delle informazioni di sistema e degli errori.


## 🚀 Funzionalità

### 🔍 Ricerca Immagini

- Effettua una ricerca su [Unsplash](https://unsplash.com) tramite query testuale (`/search?query=gatti`)
- Risposta **strutturata** con le seguenti proprietà:
  - `id`
  - `width`
  - `height`
  - tutti gli URL disponibili (es. `regular`, `thumb`, ecc.)
  - `description`

### ⭐ Gestione Preferiti

- Aggiunta di una foto ai preferiti
- Rimozione di una foto dai preferiti
- Visualizzazione di tutte le immagini salvate

## 🧭 API Endpoints 

Base URL: `/api/1`

---

### 🔍 Ricerca Immagini

- **GET** `/search?query=<termine>&page=<numero>`

Effettua una ricerca di immagini su Unsplash in base al termine specificato e supporta la paginazione tramite il parametro `page`.

**Parametri Query:**

| Nome    | Tipo   | Descrizione                           |
|---------|--------|-------------------------------------|
| query   | string | Termine di ricerca (es. "gatti")    |
| page    | number | Numero della pagina (opzionale)     |
| per_page| number | Numero di risultati per pagina (opzionale) |

**Comportamento:**

- Effettua una chiamata verso l’API di Unsplash usando `axios`.
- Usa `UNSPLASH_URL` come endpoint e `UNSPLASH_ACCESS_KEY` come API key nell’header `Authorization`.
- I risultati sono filtrati e trasformati tramite la funzione `transformToFilteredImage` che estrae solo le proprietà necessarie (`id`, `width`, `height`, `urls`, `description`).
---

### ⭐ Gestione Preferiti

Tutte le rotte per i preferiti richiedono l’header `user-id` per identificare l’utente.
---

#### Aggiungi una foto ai preferiti

- **POST** `/favourites`

**Header:**
- `user-id`: string (obbligatorio)

**Body JSON:**

```json
{
  "imageId": "abc123",
  "width": 1920,
  "height": 1080,
  "urls": {
    "regular": "https://...",
    "thumb": "https://..."
  },
  "description": "Una bellissima immagine"
}
```

**Comportamento:**
- Se manca user-id nell’header, risponde con errore 400.
- Se l’immagine è già presente nei preferiti per quell’utente, risponde con errore 409.
- In caso di successo, salva l’immagine associandola all’utente e ritorna uno status 201 con i dettagli.

**Risposta:**
```json
{
  "success": true,
  "message": "Favourite saved succesfully",
  "data": {
    "favourite": {
      /* dati dell’immagine salvata */
    }
  }
}
```

#### Recupera tutte le immagini preferite


- **GET** `/favourites`

**Header:**
- `user-id`: string (obbligatorio)

**Comportamento:**
- Se manca user-id nell’header, risponde con errore 400.
- Restituisce la lista delle immagini salvate come preferite dall’utente.

**Risposta:**
```json
{
  "success": true,
  "message": "Favourites retrieved successfully",
  "data": {
    "favourites": [
      /* array di immagini preferite */
    ]
  }
}
```

#### Rimuovi una foto dai preferiti

- **DELETE** `/favourites/:imageId`

**Header:**
- `user-id`: string (obbligatorio)

**Parametri URL:**
- `imageId`: string (obbligatorio)

**Comportamento:**
- Se manca user-id nell’header, risponde con errore 400.
- Se non trova la foto tra i preferiti per quell’utente, risponde con errore 404.
- In caso di successo, elimina l’immagine dai preferiti e ritorna lo status 200.

**Risposta:**
```json
{
  "success": true,
  "message": "Favourites retrieved successfully",
  "data": {
    "favourites": [
      /* array di immagini preferite */
    ]
  }
}
```

## ⚙️ Setup

### 1. Clona il repository

```bash
git clone <repository-url>
cd <nome-cartella-progetto>
```

### 2. Installa le dipendenze

```bash
npm install
```

### 3. Configura le variabili d'ambiente
- Crea un file .env nella root del progetto e definisci le seguenti variabili:

- UNSPLASH_ACCESS_KEY — la tua API key di Unsplash
- PORT — la porta su cui avviare il server (es. 8001)
- MONGO_URI — URI di connessione al database MongoDB
- ENVIRONMENT — ambiente di esecuzione (es. development)
- UNSPLASH_URL — URL dell’endpoint Unsplash (es. https://api.unsplash.com/search/photos)

Esempio di .env: 
  ```json
UNSPLASH_ACCESS_KEY=your_unsplash_key_here
PORT=8001
MONGO_URI=your_mongodb_connection_string_here
ENVIRONMENT=development
UNSPLASH_URL=https://api.unsplash.com/search/photos
  ```
### 4. Avvia il server

```bash
npm run dev
```

**Il server sarà disponibile di default su http://localhost:8000.**
**Altrimenti alla porta indicata nel file di configurazione.**

## 🧪 Test

### Esecuzione dei test

Per eseguire tutti i test una volta:

```bash
npm test
```

Per eseguire i test in modalità watch (riavvio automatico ad ogni modifica):
```bash
npm run test:watch
```
### Contributors
- Giuseppe Visco


