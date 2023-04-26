import React from 'react';
import { HiInformationCircle } from 'react-icons/hi';
import { FaPlay } from 'react-icons/fa';

const Banner = ({movie}) => {
    const style = {
        backgroundImage:`url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path || movie?.poster_path}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    }

    function truncate(string, n){
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }
  return (
    <header className="banner" style={style}>
        <div className="banner__contents">
            <h1>{movie?.title || movie?.name || movie?.original_name}</h1>
            <div className="banner__buttons">
                <button className="banner__button">Play <FaPlay/> </button>
                <button className="banner__button inverse">My List <HiInformationCircle/></button>
            </div>
            <p>
                {truncate(movie?.overview,150)}                
            </p>
            <div className="banner--fadebottom"/>
        </div>        
        
    </header>
  )
}

export default Banner