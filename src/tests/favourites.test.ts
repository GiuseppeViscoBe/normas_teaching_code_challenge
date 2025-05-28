import { Request, Response, NextFunction } from 'express';
import { saveFavourite, getFavourites, deleteFavourite } from '../controllers/favourites.controllers';
import { FavouritesModel } from '../models/favourite.model';

jest.mock('../models/favourite.model');

const mockReq = {} as Request;
const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;
const mockNext = jest.fn() as NextFunction;

describe('Favourites Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveFavourite', () => {
    it('should return 400 if user-id header is missing', async () => {
      const req = { headers: {}, body: {} } as Request;
      await saveFavourite(req, mockRes, mockNext);

      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('should return 409 if image already exists', async () => {
      const req = {
        headers: { 'user-id': '123' },
        body: { imageId: 'img1' },
      } as unknown as Request;

      (FavouritesModel.findOne as jest.Mock).mockResolvedValue({ imageId: 'img1' });

      await saveFavourite(req, mockRes, mockNext);

      expect(FavouritesModel.findOne).toHaveBeenCalledWith({
        imageId: 'img1',
        userId: '123',
      });
    });

    it('should create and return new favourite if it does not exist', async () => {
      const req = {
        headers: { 'user-id': '123' },
        body: { imageId: 'img2', title: 'Test Image' },
      } as unknown as Request;

      const created = { _id: 'abc', imageId: 'img2', userId: '123' };
      (FavouritesModel.findOne as jest.Mock).mockResolvedValue(null);
      (FavouritesModel.create as jest.Mock).mockResolvedValue(created);

      await saveFavourite(req, mockRes, mockNext);

      expect(FavouritesModel.create).toHaveBeenCalledWith({
        imageId: 'img2',
        title: 'Test Image',
        userId: '123',
      });

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Favourite saved succesfully',
        data: { favourite: created },
      });
    });
  });

  describe('getFavourites', () => {
    it('should return 400 if user-id is missing', async () => {
      const req = { headers: {} } as Request;
      await getFavourites(req, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should return favourites list', async () => {
      const favourites = [{ imageId: 'img1' }, { imageId: 'img2' }];
      (FavouritesModel.find as jest.Mock).mockResolvedValue(favourites);

      const req = { headers: { 'user-id': '123' } } as unknown as Request;
      await getFavourites(req, mockRes, mockNext);

      expect(FavouritesModel.find).toHaveBeenCalledWith({ userId: '123' });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Favourites retrieved successfully',
        data: { favourites },
      });
    });
  });

  describe('deleteFavourite', () => {
    it('should return 400 if user-id is missing', async () => {
      const req = { headers: {}, params: { imageId: 'img1' } } as unknown as Request;
      await deleteFavourite(req, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should return 400 if imageId param is missing', async () => {
      const req = { headers: { 'user-id': '123' }, params: {} } as unknown as Request;
      await deleteFavourite(req, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should return 404 if favourite not found', async () => {
      const req = {
        headers: { 'user-id': '123' },
        params: { imageId: 'img1' },
      } as unknown as Request;

      (FavouritesModel.findOneAndDelete as jest.Mock).mockResolvedValue(null);

      await deleteFavourite(req, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should return 200 if favourite is deleted', async () => {
      const deleted = { imageId: 'img1' };
      (FavouritesModel.findOneAndDelete as jest.Mock).mockResolvedValue(deleted);

      const req = {
        headers: { 'user-id': '123' },
        params: { imageId: 'img1' },
      } as unknown as Request;

      await deleteFavourite(req, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Favourite deleted successfully',
        data: { favourite: deleted },
      });
    });
  });
});
