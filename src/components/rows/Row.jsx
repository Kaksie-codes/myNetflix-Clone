import React, { useEffect, useState, useRef } from 'react';
import './row.css';
import { AiOutlineRight, AiOutlineLeft} from 'react-icons/ai'
import axios from '../../axios';
import MovieModal from '../moviemodal/MovieModal';


const Row = ({title, fetctURL, isLargeRow}) => {
    const [movies, setMovies] = useState([]);
    const baseUrl = "https://image.tmdb.org/t/p/original/";
    const rowRef = useRef();
    const [isMoved, setIsMoved] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            const request = await axios.get(fetctURL);
            setMovies(request.data.results);
            return request;
        }

        fetchData();
    },[fetctURL])

    const handleClick = (direction) => {
        setIsMoved(true);

        if(rowRef.current){
            const {scrollLeft, clientWidth}= rowRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;

            rowRef.current.scrollTo({left: scrollTo, behaviour: 'smooth'})
        }
    }

  return (
    <div className="movies__row-wrapper">
        <h2>{title}</h2>
        <div className="row__group">
            <AiOutlineLeft className={`_icon left ${!isMoved && 'hidden'}`} onClick={() => handleClick("left")}/>  
            <div className="row__wrapper" ref={rowRef}>
            
               {
                   movies.map((movie) => {
                       return (
                           ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path))
                           && (
                                                               
                               <div  className={`movie ${isLargeRow && "row__posterLarge"}`} key={movie.id}>
                                    <img
                                    src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                    alt={movie.name} />
                                    <p>{movie?.name || movie?.title}</p>
                               </div>
                               
                            
                           )
                       )
                   })
               }
            </div>
            <AiOutlineRight className="_icon right" onClick={() => handleClick("right")}/>
        </div>        
    </div>
  )
}

export default Row;
{/* <MovieModal movie={movie} key={Math.floor(Math.random() * 123454667)}/> */}