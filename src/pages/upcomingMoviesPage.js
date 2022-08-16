import React from "react";
import MovieListPageTemplate from "../components/templateMovieListPage";
import { getUpcoming } from "../api/tmdb-api";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
//import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import AddToWatchIcon from '../components/cardIcons/addToWatchList';

const UpCoomingMoviesPage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('upcoming', getUpcoming)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <hi>{error.message}</hi>
  }
  const movies = data.results;

  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      action={(movie) => {
        return <AddToWatchIcon movie={movie} />
      }}
    />
  );
    };
    export default UpCoomingMoviesPage;