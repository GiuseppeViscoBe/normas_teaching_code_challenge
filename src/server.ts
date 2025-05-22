import express from 'express'
import { searchImage } from './controllers/search.controllers';
import searchRouter from './routes/search.routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express()



const PORT = process.env.PORT || 8000;

app.use(express.json())

app.use('/api/1/search', searchRouter)


app.listen(PORT, () => {
    console.log('Server listening on port: ' + PORT)
})

