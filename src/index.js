import AddMovieReviewPage from './pages/addMovieReviewPage'
import MoviesContextProvider from "./contexts/moviesContext";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import SiteHeader from './components/siteHeader'
import MovieReviewPage from "./pages/movieReviewPage";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage"; 

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 360000,
        refetchInterval: 360000, 
        refetchOnWindowFocus: false
      },
    },
  });

  const App = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SiteHeader />
          <MoviesContextProvider>
              {" "}
              <Switch>
              <Route exact path="/reviews/form" component={AddMovieReviewPage} />
                ........
              </Switch>
          </MoviesContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    );
  };
  
  ReactDOM.render(<App />, document.getElementById("root"));