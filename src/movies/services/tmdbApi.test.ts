import axios from "axios";
import { create } from "ts-mock-autofixture-kit";
import { NowPlaying } from "../models/movies.model";
import { getMovies } from "./tmdbApi";

jest.mock('axios', () => ({
  get: jest.fn()
}));

const axiosMock = axios as jest.Mocked<typeof axios>;
const mockMovies = create<NowPlaying>();

describe('TmdbApi', () => {
  const url = process.env.REACT_APP_API_URL;
  const key = process.env.REACT_APP_API_KEY

  test('should return the result data', async () => {
    axiosMock.get.mockResolvedValueOnce({ data: mockMovies, status: 200 });

    const result = await getMovies(1);

    expect(result).toEqual(mockMovies.results);
    expect(axiosMock.get).toHaveBeenCalledWith(`${url}movie/now_playing`, { "params": { "api_key": key, "page": 1 } })
  });

  test('should return error when the status is not 200', async () => {
    axiosMock.get.mockResolvedValueOnce({ data: {}, status: 400 });

    await expect(getMovies(1)).rejects.toThrow('Error fetching movies');
    expect(axiosMock.get).toHaveBeenCalledWith(`${url}movie/now_playing`, { "params": { "api_key": key, "page": 1 } })
  });
});
