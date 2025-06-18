import React, { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { getPopularMovies, searchMovies } from '../services/MovieServices';
import { NavBar } from '../components/navigation/NavBar';
import MovieCard from '../components/MovieCard';

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userAvatar, setUserAvatar] = useState<string>('');

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

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      const results = await searchMovies(query);
      setMovies(results);
    } catch (err) {
      console.error('Error searching movies:', err);
      setError('Error al buscar películas. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    // In a real app, this would redirect to your auth provider
    setIsAuthenticated(true);
    setUserAvatar('https://via.placeholder.com/32');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserAvatar('');
  };

  if (loading) return <p className="p-4">Cargando películas...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar
        onSearch={handleSearch}
        isAuthenticated={isAuthenticated}
        onLogin={handleLogin}
        onLogout={handleLogout}
        userAvatar={userAvatar}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;