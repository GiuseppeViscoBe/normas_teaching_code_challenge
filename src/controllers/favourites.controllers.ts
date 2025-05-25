import { NextFunction, Request, Response } from "express";
import { FavouritesModel } from "../models/favourite.model";

export const saveFavourite = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = req.headers["user-id"] as string;

    if (!userId) {
      return res.status(400).json({ error: "Missing user-id header" });
    }

    const favouriteImageToSave = req.body;

    const exists = await FavouritesModel.findOne({
      imageId: favouriteImageToSave.imageId,
      userId,
    });

    if (exists) {
      return res.status(409).json({ message: "Image already in favourites" });
    }

    const newFavouriteImage = await FavouritesModel.create({
      ...favouriteImageToSave,
      userId,
    });

    res.status(201).json({
      success: true,
      message: "User created succesfully",
      data: {
        favourite: newFavouriteImage,
      },
    });
  } catch (error) {
    console.log(error);
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
      return res.status(400).json({ error: "Missing user-id header" });
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
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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
      return res.status(400).json({ error: "Missing user-id header" });
    }

    const { imageId } = req.params;

    console.log(req.params)
    if (!imageId) {
      return res.status(400).json({ error: "Missing image id in URL" });
    }

    const deleted = await FavouritesModel.findOneAndDelete({ imageId, userId });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Favourite not found for this user",
      });
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
