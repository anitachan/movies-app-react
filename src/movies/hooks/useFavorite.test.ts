import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { fixtureOf } from 'ts-mock-autofixture-kit';
import { MovieDetail } from '../models/movieDetail';
import { useFavorite } from './useFavorite';

describe('useFavorite', () => {
  const mockMovie = fixtureOf<MovieDetail>({ seed: 42 }).create();
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => '');
  });

  test('should set favorite as false when does not exists on local storage', () => {
    const { result } = renderHook(() => useFavorite(mockMovie));
    const { isFavorite } = result.current;

    expect(isFavorite).toBe(false);
  });

  test('should set favorite as true when exists on local storage', () => {
    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementationOnce(() => JSON.stringify([mockMovie]));
    const { result } = renderHook(() => useFavorite(mockMovie));
    const { isFavorite } = result.current;

    expect(isFavorite).toBe(true);
  });

  test('should set false when it returns an error', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementationOnce(() => {
      throw new Error('Error');
    });
    const { result } = renderHook(() => useFavorite(mockMovie));
    const { isFavorite } = result.current;

    expect(isFavorite).toBe(false);
  });

  test('should add to favorites when it is not on localStorage', () => {
    const { result } = renderHook(() => useFavorite(mockMovie));
    const { toggleFavorite } = result.current;

    const spy = jest.spyOn(Storage.prototype, 'setItem');

    act(() => {
      toggleFavorite();
    });

    expect(spy).toHaveBeenCalledWith('favorites', JSON.stringify([mockMovie]));
  });

  test('should remove from favorites when it not on localStorage', () => {
    const movie: MovieDetail = { ...mockMovie };
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify([movie]));
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useFavorite(movie));
    const { toggleFavorite } = result.current;

    act(() => {
      toggleFavorite();
    });

    expect(setItemSpy).toHaveBeenCalledWith('favorites', '[]');
  });

  test('should not call set localStorage when it has an error', () => {
    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValueOnce('')
      .mockImplementationOnce(() => {
        throw new Error('Error');
      });

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useFavorite(mockMovie));
    const { toggleFavorite } = result.current;

    act(() => {
      toggleFavorite();
    });

    expect(setItemSpy).not.toHaveBeenCalled();
  });
});
