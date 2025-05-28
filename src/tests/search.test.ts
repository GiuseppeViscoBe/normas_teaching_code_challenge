import { Request, Response, NextFunction } from 'express';
import { searchImage } from '../controllers/search.controllers'; 
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('searchImage controller', () => {
  const mockReq = {
    query: {
      query: 'cats',
      page: '1',
      per_page: '2',
    },
  } as unknown as Request;

  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  const mockNext = jest.fn() as NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return filtered images when axios call succeeds', async () => {
    const unsplashMockResponse = {
      data: {
        results: [
          {
            id: 'UQwbKtu-2Ek',
            width: 2327,
            height: 2973,
            description: 'Four bees on their honeycomb. ',
            urls: {
              raw: 'raw_url_1',
              full: 'full_url_1',
              regular: 'regular_url_1',
              small: 'small_url_1',
              thumb: 'thumb_url_1',
              small_s3: 'small_s3_url_1',
            },
          },
          {
            id: 'ys-sZZkdT1s',
            width: 5000,
            height: 3333,
            description: null,
            urls: {
              raw: 'raw_url_2',
              full: 'full_url_2',
              regular: 'regular_url_2',
              small: 'small_url_2',
              thumb: 'thumb_url_2',
              small_s3: 'small_s3_url_2',
            },
          },
        ],
      },
    };

    mockedAxios.get.mockResolvedValue(unsplashMockResponse);

    await searchImage(mockReq, mockRes, mockNext);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.unsplash.com/search/photos',
      expect.objectContaining({
        params: {
          query: 'cats',
          page: '1',
          per_page: '2',
        },
        headers: expect.objectContaining({
          Authorization: expect.stringContaining('Client-ID'),
        }),
      })
    );

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      message: 'Data retrieved succesfully from api',
      data: {
        imageResults: [
          {
            imageId: 'UQwbKtu-2Ek',
            width: 2327,
            height: 2973,
            description: 'Four bees on their honeycomb. ',
            urls: {
              raw: 'raw_url_1',
              full: 'full_url_1',
              regular: 'regular_url_1',
              small: 'small_url_1',
              thumb: 'thumb_url_1',
              small_s3: 'small_s3_url_1',
            },
          },
          {
            imageId: 'ys-sZZkdT1s',
            width: 5000,
            height: 3333,
            description: 'No description available',
            urls: {
              raw: 'raw_url_2',
              full: 'full_url_2',
              regular: 'regular_url_2',
              small: 'small_url_2',
              thumb: 'thumb_url_2',
              small_s3: 'small_s3_url_2',
            },
          },
        ],
      },
    });
  });
});
