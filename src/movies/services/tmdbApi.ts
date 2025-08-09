import axios from 'axios';

const base = process.env.REACT_APP_API_URL;
const api_key = process.env.REACT_APP_API_KEY;

export const getMovies = async (page: number) => {
  const url = `${base}movie/now_playing`;

  const response = await axios.get(url, {
    params: { api_key, page },
  });
  if (response.status !== 200) {
    throw new Error('Error fetching movies');
  }
  return response.data.results;
};

export const getMovie = async (id: string) => {
  const url = `${base}movie/${id}`;
  const response = await axios.get(url, {
    params: { api_key },
  });
  if (response.status !== 200) {
    throw new Error('Error fetching movie');
  }
  return response.data;
};

export const getCast = async (id: string) => {
  const url = `${base}movie/${id}/credits`;
  const response = await axios.get(url, {
    params: { api_key },
  });
  if (response.status !== 200) {
    throw new Error('Error fetching cast');
  }
  return response.data.cast;
};

export const getActor = async (id: string) => {
  const url = `${base}person/${id}`;
  const response = await axios.get(url, {
    params: { api_key },
  });
  if (response.status !== 200) {
    throw new Error('Error fetching actor');
  }
  return response.data;
};

export const getActorCredits = async (id: string) => {
  const url = `${base}person/${id}/movie_credits`;
  const response = await axios.get(url, {
    params: { api_key },
  });
  if (response.status !== 200) {
    throw new Error('Error fetching actor credits');
  }
  return response.data.cast;
};
