import React, { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { getPopularMovies } from '../services/MovieServices';
import MovieCard from '../components/MovieCard';
import '../styles/HomePage.module.css';

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('No se pudieron cargar las películas. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p className="p-4">Cargando películas...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="home-page">
      <h1 className="page-title">Películas Populares</h1>
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;