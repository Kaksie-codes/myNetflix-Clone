import React, { useEffect, useState, lazy, Suspense } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Banner from '../../components/Banner';
import axios from '../../axios';
import requests from '../../requests';
import './moviespage.css';
import Row from '../../components/rows/Row';
// import MovieModal from '../../components/moviemodal/MovieModal';
import { useSelector } from 'react-redux';
import SearchedMoviesContainer from '../../components/searchedMovies/SearchedMoviesContainer';

const MoviesPage = () => {
  const [bannerMovie, setBannerMovie] = useState([]);
  const searchedMovies = useSelector(state => state.user.searchedMovies)
  console.log('yeah >>', searchedMovies)
  useEffect(() => {
    const fetchData = async() => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const newBannerMovie = request.data.results;
      const randomNumber = Math.floor(Math.random() * newBannerMovie.length - 1);
      setBannerMovie(newBannerMovie[randomNumber]);
      return request;
    }

    fetchData()
  },[])

  
  return (
    <div className="moviespage">
        <Navbar/>
        {
          !searchedMovies ? (
            <>
                  <Banner movie={bannerMovie}/>
        <div className="movies__collection">
          <Row
            title="NETFLIX ORIGINALS"
            fetctURL={requests.fetchNetflixOriginals}
            isLargeRow={true}
          />
          <Row
            title="Trending Now"
            fetctURL={requests.fetchTrending}
            isLargeRow={false}
          />
          <Row
            title="Top Rated"
            fetctURL={requests.fetchTopRated}
            isLargeRow={false}
          />
          <Row
            title="Action Movies"
            fetctURL={requests.fetchNetflixOriginals}
            isLargeRow={false}
          />
          <Row
            title="Comedy Movies"
            fetctURL={requests.fetchComedyMovies}
            isLargeRow={false}
          />
          <Row
            title="Horror Movies"
            fetctURL={requests.fetchHorrorMovies}
            isLargeRow={false}
          />
          <Row
            title="Romance Movies"
            fetctURL={requests.fetchRomanceMovies}
            isLargeRow={false}
          />
          <Row
            title="Documentaries"
            fetctURL={requests.fetchDocumentaries}
            isLargeRow={false}
          />
        </div>
        
            </>
          ) : (
            <SearchedMoviesContainer/>

          )
        }
      
    </div>
  )
}

export default MoviesPage;
{/* <MovieModal/> */}
