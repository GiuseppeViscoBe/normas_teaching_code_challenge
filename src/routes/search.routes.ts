import express from 'express'
import { searchImage } from '../controllers/search.controllers'


const searchRouter = express.Router()


searchRouter.get('/', searchImage )

export default searchRouter