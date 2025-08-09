import { renderHook, waitFor } from '@testing-library/react';
import { create } from 'ts-mock-autofixture-kit';
import { Cast } from '../models/cast.model';
import { MovieDetail } from '../models/movieDetail';
import { getCast, getMovie } from '../services/tmdbApi';
import { useMovie } from './useMovie';

jest.mock('../services/tmdbApi', () => ({
  getMovie: jest.fn(),
  getCast: jest.fn(),
}));

describe('useMovie', () => {
  const mockMovie = create<MovieDetail>();
  const mockCast = create<Cast[]>();
  const id = create<string>();

  beforeEach(() => {
    (getMovie as jest.Mock).mockResolvedValue(mockMovie);
    (getCast as jest.Mock).mockResolvedValue(mockCast);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return movies', async () => {
    const { result } = renderHook(() => useMovie(id));
    await waitFor(() => {
      const { movie, cast, loading, error } = result.current;
      expect(movie).toEqual(mockMovie);
      expect(cast).toEqual(mockCast);
      expect(error).toBeNull();
      expect(loading).toBe(false);
      expect(getMovie).toHaveBeenCalledWith(id);
      expect(getCast).toHaveBeenCalledWith(id);
    });
  });

  test('should return movie and casr as undefined and error when service response an error', async () => {
    (getMovie as jest.Mock).mockRejectedValueOnce(new Error('Error'));

    const { result } = renderHook(() => useMovie(id));
    await waitFor(() => {
      const { movie, cast, loading, error } = result.current;
      expect(movie).toEqual(undefined);
      expect(cast).toEqual(undefined);
      expect(error).toEqual('Error');
      expect(loading).toBe(false);
      expect(getMovie).toHaveBeenCalledWith(id);
      expect(getCast).toHaveBeenCalledWith(id);
    });
  });

  test('should return movie as undefined and error when service response an error', async () => {
    (getCast as jest.Mock).mockRejectedValueOnce(new Error('Error'));

    const { result } = renderHook(() => useMovie(id));
    await waitFor(() => {
      const { movie, cast, loading, error } = result.current;
      expect(movie).toEqual(undefined);
      expect(cast).toEqual(undefined);
      expect(error).toEqual('Error');
      expect(loading).toBe(false);
      expect(getMovie).toHaveBeenCalledWith(id);
      expect(getCast).toHaveBeenCalledWith(id);
    });
  });

  test('should show a default error when the error does not have message', async () => {
    (getCast as jest.Mock).mockRejectedValueOnce({});
    const { result } = renderHook(() => useMovie(id));

    await waitFor(() => {
      const { movie, cast, loading, error } = result.current;
      expect(movie).toEqual(undefined);
      expect(cast).toEqual(undefined);
      expect(error).toEqual('Loading movie error');
      expect(loading).toBe(false);
      expect(getMovie).toHaveBeenCalledWith(id);
      expect(getCast).toHaveBeenCalledWith(id);
    });
  });
});
