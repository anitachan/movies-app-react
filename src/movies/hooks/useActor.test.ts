import { renderHook, waitFor } from '@testing-library/react';
import { create } from 'ts-mock-autofixture-kit';
import { Actor } from '../models/actor.model';
import { ActorCast } from '../models/actorCast.model';
import { getActor, getActorCredits } from '../services/tmdbApi';
import { useActor } from './useActor';

jest.mock('../services/tmdbApi', () => ({
  getActor: jest.fn(),
  getActorCredits: jest.fn(),
}));

describe('useActor', () => {
  const id = create<string>();
  const mockActor = create<Actor>();
  const mockActorCast = create<ActorCast[]>();

  beforeEach(() => {
    (getActor as jest.Mock).mockResolvedValue(mockActor);
    (getActorCredits as jest.Mock).mockResolvedValue(mockActorCast);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return actor and creditActor', async () => {
    const { result } = renderHook(() => useActor(id));

    await waitFor(() => {
      const { actor, credits, error, loading } = result.current;

      expect(actor).toEqual(mockActor);
      expect(credits).toEqual(mockActorCast);
      expect(error).toBeNull();
      expect(loading).toEqual(false);
      expect(getActor).toHaveBeenCalledWith(id);
      expect(getActorCredits).toHaveBeenCalledWith(id);
    });
  });

  test('should return movie as undefined and error when service response an error', async () => {
    (getActor as jest.Mock).mockRejectedValueOnce(new Error('Error'));

    const { result } = renderHook(() => useActor(id));
    await waitFor(() => {
      const { actor, credits, loading, error } = result.current;
      expect(actor).toEqual(undefined);
      expect(credits).toEqual(undefined);
      expect(error).toEqual('Error');
      expect(loading).toBe(false);
      expect(getActor).toHaveBeenCalledWith(id);
      expect(getActorCredits).toHaveBeenCalledWith(id);
    });
  });

  test('should return movie as undefined and error when service response an error', async () => {
    (getActorCredits as jest.Mock).mockRejectedValueOnce(new Error('Error'));

    const { result } = renderHook(() => useActor(id));
    await waitFor(() => {
      const { actor, credits, loading, error } = result.current;
      expect(actor).toEqual(undefined);
      expect(credits).toEqual(undefined);
      expect(error).toEqual('Error');
      expect(loading).toBe(false);
      expect(getActor).toHaveBeenCalledWith(id);
      expect(getActorCredits).toHaveBeenCalledWith(id);
    });
  });

  test('should return movie as undefined and error when service response an error', async () => {
    (getActorCredits as jest.Mock).mockRejectedValueOnce({});

    const { result } = renderHook(() => useActor(id));
    await waitFor(() => {
      const { actor, credits, loading, error } = result.current;
      expect(actor).toEqual(undefined);
      expect(credits).toEqual(undefined);
      expect(error).toEqual('Error loading actor');
      expect(loading).toBe(false);
      expect(getActor).toHaveBeenCalledWith(id);
      expect(getActorCredits).toHaveBeenCalledWith(id);
    });
  });
});
