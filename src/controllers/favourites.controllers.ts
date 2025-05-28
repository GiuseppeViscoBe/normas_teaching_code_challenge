import { NextFunction, Request, Response } from "express";
import { FavouritesModel } from "../models/favourite.model";
import { CustomError } from "../interfaces/error.interface";

export const saveFavourite = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = req.headers["user-id"] as string;

    if (!userId) {
      const error : CustomError = new Error("Missing user-id header")
      error.statusCode = 400
      throw error
    }

    const favouriteImageToSave = req.body;

    const exists = await FavouritesModel.findOne({
      imageId: favouriteImageToSave.imageId,
      userId,
    });

    if (exists) {
      const error : CustomError = new Error("Image already in favourites")
      error.statusCode = 409
      throw error
    }

    console.log(favouriteImageToSave)
    const newFavouriteImage = await FavouritesModel.create({
      ...favouriteImageToSave,
      userId,
    });

    res.status(201).json({
      success: true,
      message: "Favourite saved succesfully",
      data: {
        favourite: newFavouriteImage,
      },
    });

  } catch (error) {
    next(error)
  }
};

export const getFavourites = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = req.headers["user-id"] as string;

    if (!userId) {
      const error : CustomError = new Error("Missing user-id header")
      error.statusCode = 400
      throw error
    }

    const favouritesImageList = await FavouritesModel.find({userId});

    res.status(200).json({
      success: true,
      message: "Favourites retrieved successfully",
      data: {
        favourites: favouritesImageList,
      },
    });
  } catch (error) {
    next(error)
  }
};

export const deleteFavourite = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = req.headers["user-id"] as string;

    if (!userId) {
      const error : CustomError = new Error("Missing user-id header")
      error.statusCode = 400
      throw error
    }

    const { imageId } = req.params;

    if (!imageId) {
      const error : CustomError = new Error("Missing image id in URL")
      error.statusCode = 400
      throw error
    }

    const deleted = await FavouritesModel.findOneAndDelete({ imageId, userId });

    if (!deleted) {
      const error : CustomError = new Error("Favourite not found for this user")
      error.statusCode = 404
      throw error
    }

    res.status(200).json({
      success: true,
      message: "Favourite deleted successfully",
      data: { favourite: deleted },
    });
  } catch (error) {
    next(error);
  }
};
