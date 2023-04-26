import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './searchedmovies.css';

const SearchedMoviesContainer = () => {
  const dispatch = useDispatch();
  const baseUrl = "https://image.tmdb.org/t/p/original";
  const { searchedMovies } = useSelector(state => state.user);

  return (
    <div className="searched__movies">
      <div className="container searched__movies-container">
        {
          searchedMovies.map((movie) => {
            return(
              movie.poster_path && 
              <div className="movieCard" key={movie.id}>
                <img
                  src={`${baseUrl}${movie.poster_path}`}
                  alt={movie.name} />
                <small>{movie?.name || movie?.title}</small>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}



export default SearchedMoviesContainer
