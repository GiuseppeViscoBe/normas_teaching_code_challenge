import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv';

import axios from "axios";
import { searchResponseFiltered } from "../models/searchResponseFiltered.interface";
import { UnsplashSearchResponse } from "../models/unsplashSearchResponse.interface";

dotenv.config();

export const searchImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query, page, per_page } = req.query;

    const response = await axios.get<UnsplashSearchResponse>("https://api.unsplash.com/search/photos", {
      params: { query, page, per_page: per_page },
      headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
    });


    //make it a function
    //is it correct the type of item ? 
    const results: searchResponseFiltered[] = response.data.results.map((item: searchResponseFiltered) => ({
      id: item.id,
      width: item.width,
      height: item.height,
      description: item.description ? item.description : 'No description available' ,
      urls: {
        raw: item.urls.raw,
        full: item.urls.full,
        regular: item.urls.regular,
        small: item.urls.small,
        thumb: item.urls.thumb,
        small_s3: item.urls.small_s3
      }
    }));

    
    res.status(201).json(results)
  } catch (error) {
    console.log(error);
  }
};
