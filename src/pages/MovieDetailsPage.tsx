import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from '../types/Movie';
import { getMovieById, getPosterUrl } from '../services/MovieServices';
import styles from '../styles/MovieDetailsPage.module.css'; // Import the CSS module from styles directory

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) {
        setError('ID de película no proporcionado.');
        setLoading(false);
        return;
      }
      try {
        const data = await getMovieById(Number(id));
        setMovie(data);
      } catch {
        setError('No se pudo cargar la película. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p>Cargando detalles de la película...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!movie) return <p>Película no encontrada.</p>;

  return (
    <div className="movie-detail-page">
      <img src={getPosterUrl(movie.poster_path)} alt={movie.title} /> {/* Usa getPosterUrl */}
      <h2>{movie.title}</h2>
      <p><strong>Descripción:</strong> {movie.overview}</p> {/* Campo de TMDB */}
      <p><strong>Fecha de Estreno:</strong> {movie.release_date}</p>
      <p><strong>Puntuación Promedio:</strong> {movie.vote_average}</p>
      {/* TMDB no tiene directamente "género" como un string en el objeto Movie por defecto,
          sino una lista de `genre_ids`. Tendrías que hacer otra llamada a la API de TMDB
          para obtener el mapeo de IDs a nombres de géneros y luego mostrarlos.
      */}
      {/* Aquí podrías añadir un botón "Iniciar sesión para reservar" */}
    </div>
  );
};

export default MovieDetailsPage;