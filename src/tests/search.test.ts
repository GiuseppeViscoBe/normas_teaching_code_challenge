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
            imageId: 'abc123',
            width: 500,
            height: 300,
            description: 'A cat',
            urls: {
              raw: 'raw_url',
              full: 'full_url',
              regular: 'regular_url',
              small: 'small_url',
              thumb: 'thumb_url',
              small_s3: 'small_s3_url',
            },
          },
          {
            imageId: 'def456',
            width: 800,
            height: 600,
            description: null,
            urls: {
              raw: 'raw2',
              full: 'full2',
              regular: 'regular2',
              small: 'small2',
              thumb: 'thumb2',
              small_s3: 'small_s3_2',
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
    expect(mockRes.json).toHaveBeenCalledWith([
      {
        imageId: 'abc123',
        width: 500,
        height: 300,
        description: 'A cat',
        urls: {
          raw: 'raw_url',
          full: 'full_url',
          regular: 'regular_url',
          small: 'small_url',
          thumb: 'thumb_url',
          small_s3: 'small_s3_url',
        },
      },
      {
        imageId: 'def456',
        width: 800,
        height: 600,
        description: 'No description available',
        urls: {
          raw: 'raw2',
          full: 'full2',
          regular: 'regular2',
          small: 'small2',
          thumb: 'thumb2',
          small_s3: 'small_s3_2',
        },
      },
    ]);
  });

});
