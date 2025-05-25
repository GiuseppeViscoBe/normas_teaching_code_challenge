import express from 'express';
import { deleteFavourite, getFavourites, saveFavourite } from '../controllers/favourites.controllers';

const favouritesRouter = express.Router();

favouritesRouter.post('/', saveFavourite);
favouritesRouter.get('/', getFavourites)
favouritesRouter.delete('/:imageId', deleteFavourite)

export default favouritesRouter;
