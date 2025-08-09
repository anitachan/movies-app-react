import axios from 'axios';
import { create, createList } from 'ts-mock-autofixture-kit';
import { Actor } from '../models/actor.model';
import { ActorCast } from '../models/actorCast.model';
import { Cast } from '../models/cast.model';
import { MovieDetail } from '../models/movieDetail';
import { NowPlaying } from '../models/movies.model';
import { getActor, getActorCredits, getCast, getMovie, getMovies } from './tmdbApi';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

const axiosMock = axios as jest.Mocked<typeof axios>;

describe('TmdbApi', () => {
  const url = process.env.REACT_APP_API_URL;
  const key = process.env.REACT_APP_API_KEY;

  test('should return all now playing movies result from page 1', async () => {
    const mockMovies = create<NowPlaying>();
    axiosMock.get.mockResolvedValueOnce({ data: mockMovies, status: 200 });

    const result = await getMovies(1);

    expect(result).toEqual(mockMovies.results);
    expect(axiosMock.get).toHaveBeenCalledWith(`${url}movie/now_playing`, {
      params: { api_key: key, page: 1 },
    });
  });

  test('should return error when the movie is not 200', async () => {
    axiosMock.get.mockResolvedValueOnce({ data: {}, status: 400 });

    await expect(getMovies(1)).rejects.toThrow('Error fetching movies');
    expect(axiosMock.get).toHaveBeenCalledWith(`${url}movie/now_playing`, {
      params: { api_key: key, page: 1 },
    });
  });

  test('should return a movie by id', async () => {
    const mockMovie = create<MovieDetail>();
    const id = create<string>();

    axiosMock.get.mockResolvedValueOnce({ data: mockMovie, status: 200 });

    const result = await getMovie(id);

    expect(result).toEqual(mockMovie);
    expect(axiosMock.get).toHaveBeenCalledWith(`${url}movie/${id}`, { params: { api_key: key } });
  });

  test('should return error when movie status is not 200', async () => {
    const id = create<string>();
    axiosMock.get.mockResolvedValueOnce({ data: {}, status: 400 });

    await expect(getMovie(id)).rejects.toThrow('Error fetching movie');
    expect(axiosMock.get).toHaveBeenCalledWith(`${url}movie/${id}`, { params: { api_key: key } });
  });

  test('should return the cast by movieId', async () => {
    const mockCast = { cast: createList<Cast>(3) };
    const id = create<string>();

    axiosMock.get.mockResolvedValueOnce({ data: mockCast, status: 200 });

    const result = await getCast(id);

    expect(result).toEqual(mockCast.cast);
    expect(axiosMock.get).toHaveBeenCalledWith(`${url}movie/${id}/credits`, {
      params: { api_key: key },
    });
  });

  test('should return error when cast status is not 200', async () => {
    const id = create<string>();
    axiosMock.get.mockResolvedValueOnce({ data: {}, status: 400 });

    await expect(getCast(id)).rejects.toThrow('Error fetching cast');
    expect(axiosMock.get).toHaveBeenCalledWith(`${url}movie/${id}/credits`, {
      params: { api_key: key },
    });
  });

  test('should return the actor', async () => {
    const mockActor = create<Actor>();
    const id = create<string>();

    axiosMock.get.mockResolvedValueOnce({ data: mockActor, status: 200 });

    const result = await getActor(id);

    expect(result).toEqual(mockActor);
    expect(axiosMock.get).toHaveBeenCalledWith(`${url}person/${id}`, { params: { api_key: key } });
  });

  test('should return error when actor status is not 200', async () => {
    const id = create<string>();
    axiosMock.get.mockResolvedValueOnce({ data: {}, status: 400 });

    await expect(getActor(id)).rejects.toThrow('Error fetching actor');
    expect(axiosMock.get).toHaveBeenCalledWith(`${url}person/${id}`, { params: { api_key: key } });
  });

  test('should return the actor credits', async () => {
    const mockActorCast = { cast: createList<ActorCast>(3) };
    const id = create<string>();

    axiosMock.get.mockResolvedValueOnce({ data: mockActorCast, status: 200 });

    const result = await getActorCredits(id);

    expect(result).toEqual(mockActorCast.cast);
    expect(axiosMock.get).toHaveBeenCalledWith(`${url}person/${id}/movie_credits`, {
      params: { api_key: key },
    });
  });

  test('should return error when actor credit status is not 200', async () => {
    const id = create<string>();
    axiosMock.get.mockResolvedValueOnce({ data: {}, status: 400 });

    await expect(getActorCredits(id)).rejects.toThrow('Error fetching actor credits');
    expect(axiosMock.get).toHaveBeenCalledWith(`${url}person/${id}/movie_credits`, {
      params: { api_key: key },
    });
  });
});
