import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';
import { create } from 'ts-mock-autofixture-kit';
import { NowPlaying } from '../models/movies.model';
import { getMovies } from '../services/tmdbApi';
import { useMovies } from './useMovies';

const mockMovies = create<NowPlaying>();

jest.mock('../services/tmdbApi', () => ({
  getMovies: jest.fn(),
}));

describe('UseMovies', () => {
  beforeEach(() => {
    (getMovies as jest.Mock).mockResolvedValue(mockMovies.results);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should set initial variables', async () => {
    const { result } = renderHook(() => useMovies());
    await waitFor(() => {
      const { movies, loading, error } = result.current;
      expect(movies).toEqual([]);
      expect(error).toBeNull();
      expect(loading).toBe(true);
      expect(getMovies).toHaveBeenCalledWith(1);
    });
  });

  test('should return movies', async () => {
    const { result } = renderHook(() => useMovies());
    await waitFor(() => {
      const { movies, loading, error, loadMore } = result.current;
      expect(movies).toEqual(mockMovies.results);
      expect(error).toBeNull();
      expect(loadMore).toEqual(expect.any(Function));
      expect(loading).toBe(false);
      expect(getMovies).toHaveBeenCalledWith(1);
    });
  });

  test('should return empty array and error when service response an error', async () => {
    (getMovies as jest.Mock).mockRejectedValueOnce(new Error('Error'));

    const { result } = renderHook(() => useMovies());
    await waitFor(() => {
      const { movies, loading, error, loadMore } = result.current;
      expect(movies).toEqual([]);
      expect(error).toEqual('Loading movies error');
      expect(loadMore).toEqual(expect.any(Function));
      expect(loading).toBe(false);
      expect(getMovies).toHaveBeenCalledWith(1);
    });
  });

  test('should return when is loading in true', async () => {
    const neverEndingPromise = new Promise(() => {});
    (getMovies as jest.Mock).mockReturnValueOnce(neverEndingPromise);
    const { result } = renderHook(() => useMovies());

    act(() => {
      result.current.loadMore();
      result.current.loadMore();
    });

    expect(getMovies).toHaveBeenCalledTimes(1);
  });

  test('should call setPage when loadMore is called and not loading', async () => {
    const mockedGetMovies = getMovies as jest.Mock;
    mockedGetMovies.mockResolvedValue([]);

    const { result } = renderHook(() => useMovies());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.loadMore();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const wasCalledWithPage2 = mockedGetMovies.mock.calls.some(([pageArg]) => pageArg === 2);
    expect(wasCalledWithPage2).toBe(true);
    expect(getMovies).toHaveBeenCalledWith(1);
    expect(getMovies).toHaveBeenCalledWith(2);
  });
});
