import axios from 'axios';
import { Movie, ApiResponse } from '../types/Movie';

const TMDB_API_KEY = '319c20bfd05d0e4a845d49b56e2dc2de';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // URL base para imágenes de póster

export const getPopularMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get<ApiResponse<Movie>>(`${TMDB_BASE_URL}/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'es-ES', // O el idioma que prefieras
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies from TMDB:", error);
    throw error;
  }
};

export const getMovieById = async (id: number): Promise<Movie> => {
  try {
    const response = await axios.get<Movie>(`${TMDB_BASE_URL}/movie/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'es-ES',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie with id ${id} from TMDB:`, error);
    throw error;
  }
};

// Función para construir la URL completa de la imagen del póster
export const getPosterUrl = (posterPath: string | null): string => {
  if (posterPath) {
    return `${TMDB_IMAGE_BASE_URL}${posterPath}`;
  }
  return 'URL_IMAGEN_DEFAULT_SI_NO_HAY_POSTER'; // Una imagen de respaldo
};