import { renderHook } from "@testing-library/react";
import { createList } from "ts-mock-autofixture-kit";
import { MovieDetail } from "../models/movieDetail";
import { useFavorites } from "./useFavorites";

describe('useFavorites', () => {

  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => '');
  });

  test('should return an empty array when localStorage is empty', () => {
    const { result } = renderHook(() => useFavorites());
    const { favorites } = result.current;

    expect(favorites).toEqual([])
  });

  test('should return a favorites array when localStorage is not empty', () => {
    const mockMovies = createList<MovieDetail>(3);
    const jsonString = JSON.stringify(mockMovies);
    const jsonConvert = JSON.parse(jsonString);
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(jsonString);

    const { result } = renderHook(() => useFavorites());
    const { favorites } = result.current;

    expect(favorites).toEqual(jsonConvert)
  });

  test('should set false when it returns an error', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementationOnce(() => {
      throw new Error('Error');
    });
    const { result } = renderHook(() => useFavorites());
    const { favorites } = result.current;

    expect(favorites).toEqual([])
  });
})
