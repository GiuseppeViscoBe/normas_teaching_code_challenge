import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv';
import axios from "axios";
import { searchResponseFiltered } from "../interfaces/searchResponseFiltered.interface";
import { UnsplashSearchResponse, UnsplashSearchResponseItem } from "../interfaces/unsplashSearchResponse.interface";
import { transformToFilteredImage } from "../utils/search.utils";

dotenv.config();

export const searchImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query, page, per_page } = req.query;

    const api_url = process.env.UNSPLASH_URL || ''
    console.log(api_url)
    const response = await axios.get<UnsplashSearchResponse>(api_url, {
      params: { query, page, per_page: per_page },
      headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
    });

    const results: searchResponseFiltered[] = response.data.results.map(transformToFilteredImage);

    res.status(201).json({
      success: true,
      message: "Data retrieved succesfully from api",
      data: {
        imageResults: results,
      },
    });

  } catch (error) {
    next(error)
  }
};
