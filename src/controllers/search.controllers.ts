import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv';

import axios from "axios";

dotenv.config();

export const searchImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query, page, per_page } = req.query;

    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query, page, per_page: per_page },
      headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
    });

    res.status(201).json(response.data)
  } catch (error) {
    console.log(error);
  }
};
