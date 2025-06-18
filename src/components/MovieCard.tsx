import React from 'react';
import { Movie } from '../types/Movie';
import { Link } from 'react-router-dom';
import { getPosterUrl } from '../services/MovieServices'; // Importa la función de imagen

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={getPosterUrl(movie.poster_path)} alt={movie.title} /> {/* Usa getPosterUrl */}
      <h3>{movie.title}</h3>
      <p>Ranking: {movie.vote_average}</p> {/* Ejemplo de campo TMDB */}
      <Link to={`/movies/${movie.id}`}>Ver Detalles</Link>
    </div>
  );
};

export default MovieCard;