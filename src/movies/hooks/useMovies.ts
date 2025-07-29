import { useEffect, useRef, useState } from "react";
import type { Movie } from "../models/movies.model";
import { getMovies } from "../services/tmdbApi";

export const useMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const hasFetchedInitial = useRef(false)

    useEffect(() => {
        const fetchMovies = async () => {
            if (loading) return;

            setLoading(true);
            try {
                const result = await getMovies(page);
                setMovies((prev) => [...prev, ...result]);
            } catch {
                setError("Loading movies error");
            } finally {
                setLoading(false);
            }
        };

        if (page === 1 && hasFetchedInitial.current) return;
        hasFetchedInitial.current = true;

        fetchMovies();
    }, [page, loading]);

    const loadMore = () => {
        if (loading) return;
        setPage((prev) => prev + 1);
    };

    return { movies, loading, error, loadMore };
};
