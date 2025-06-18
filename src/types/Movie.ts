export interface Movie {
    id: number;
    title: string;
    poster_path: string | null; // Ruta parcial de la imagen del póster
    overview: string; // Descripción
    release_date: string; // Fecha de estreno
    vote_average: number; // Puntuación promedio
    genre_ids?: number[]; // IDs de géneros (necesitarás un mapeo aparte para los nombres)
    // Añade más campos según lo que necesites de la respuesta de TMDB
  }
  
  export interface ApiResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
  }