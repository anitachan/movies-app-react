import { useEffect, useState } from "react";
import { Cast } from "../models/cast.model";
import { MovieDetail } from "../models/movieDetail";
import { getCast, getMovie } from "../services/tmdbApi";

export const useMovie = (id: string) => {
    const [movie, setMovie] = useState<MovieDetail>();
    const [cast, setCast] = useState<Cast[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const [movieResult, castResult] = await Promise.all([getMovie(id), getCast(id)]);
                setMovie(movieResult);
                setCast(castResult);
            } catch (error: any) {
                setError(error.message || 'Loading movie error')
            } finally {
                setLoading(false);
            }
        }

        fetchMovie();
    }, [id])

    return { movie, cast, loading, error };
};