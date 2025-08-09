import { useEffect, useState } from 'react';
import { Actor } from '../models/actor.model';
import { ActorCast } from '../models/actorCast.model';
import { getActor, getActorCredits } from '../services/tmdbApi';

export const useActor = (id: string) => {
  const [actor, setActor] = useState<Actor>();
  const [credits, setCredits] = useState<ActorCast[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActor = async () => {
      try {
        const [resultActor, resultActorCast] = await Promise.all([
          getActor(id),
          getActorCredits(id),
        ]);
        setActor(resultActor);
        setCredits(resultActorCast);
      } catch (error: any) {
        setError(error.message || 'Error loading actor');
      } finally {
        setLoading(false);
      }
    };

    fetchActor();
  }, [id]);

  return { actor, credits, loading, error };
};
