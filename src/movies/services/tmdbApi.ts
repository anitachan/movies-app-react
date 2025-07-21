import axios from 'axios';

export const getMovies = async (page: number) => {
    const base = process.env.REACT_APP_API_URL;
    const api_key = process.env.REACT_APP_API_KEY
        ;
    const url = `${base}movie/now_playing`;

    const response = await axios.get(url, {
        params: { api_key, page }
    });
    if (response.status !== 200) {
        throw new Error('Error fetching movies');
    }

    return response.data.results;
}