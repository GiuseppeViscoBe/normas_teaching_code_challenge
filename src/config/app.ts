import express, {Application} from 'express'
import { errorHandler } from '../middlewares/errorHandler.middleware';
import { loggerMiddleware } from '../middlewares/logger.middleware';
import favouritesRouter from '../routes/favourite.routes';
import searchRouter from '../routes/search.routes';

const app : Application = express()

app.use(express.json());
app.use(loggerMiddleware)
app.use("/api/1/search", searchRouter);
app.use('/api/1/favourites', favouritesRouter);

app.use(errorHandler)

export default app