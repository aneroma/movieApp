import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromWatchlist from "../components/cardIcons/removeFromWatchlist";


const WatchlistMoviesPage = () => {
  const {watchlists: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const watchlistMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = watchlistMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }
  const movies = watchlistMovieQueries.map((q) => q.data);
  
  return (
        <PageTemplate
          title="Upcoming Movies Watchlist"
          movies={movies}
          action={(movie) => {
            return (
              <>
                <RemoveFromWatchlist movie={movie} />
              </>
            );
          }}
        />
    );    
};

export default WatchlistMoviesPage;