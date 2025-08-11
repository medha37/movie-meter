import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import { addToWatchList, getWatchList } from '../../api/authApi';
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';

const Hero = ({ movies }) => {

    const navigate = useNavigate();
    const [addedToWatchlist, setAddedToWatchlist] = useState([]);

    //newly added code
    const [userWatchlist, setUserWatchlist] = useState([]);
    useEffect(() => {
        const fetchWatchlist = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const res = await getWatchList(); // returns array of imdbIds
                setUserWatchlist(res.data);
            } catch (err) {
                console.error("Error fetching watchlist:", err);
            }
        };

        fetchWatchlist();
    }, []);
    // till here


    function reviews(movieId) {
        navigate(`/Reviews/${movieId}`);
    }
    const addToWatchListHandler = async (movieId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please login to add to your watchlist.");
            navigate("/login");
            return;
        }

        if (userWatchlist.includes(movieId)) {
            alert("This movie is already in your Watchlist!");
            return;
        }

        try {
            await addToWatchList(movieId);
            alert("Added to Watchlist!");
            setUserWatchlist((prev) => [...prev, movieId]); // update persistent state
        } catch (err) {
            console.error(err);
            alert("Failed to add to watchlist.");
        }
    };
    // const addToWatchListHandler = async (movieId) => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         alert("Please login to add to your watchlist.");
    //         navigate("/login");
    //         return;
    //     }

    //     if (addedToWatchlist.includes(movieId)) {
    //         alert("This movie is already in your Watchlist!");
    //         return;
    //     }

    //     try {
    //         await addToWatchList(movieId); // backend API call
    //         alert("Added to Watchlist!");
    //         setAddedToWatchlist(prev => [...prev, movieId]); // Mark as added
    //     } catch (err) {
    //         console.error(err);
    //         alert("Failed to add to watchlist.");
    //     }
    // };
    // const addToWatchListHandler = async (movieId) => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         alert("Please login to add to your watchlist.");
    //         navigate("/login");
    //         return;
    //     }

    //     try {
    //         await addToWatchList(movieId); // backend API call
    //         alert("Added to Watchlist!");
    //     } catch (err) {
    //         console.error(err);
    //         alert("Failed to add to watchlist.");
    //     }
    // };

    return (
        <div className='movie-carousel-container'>
            <Carousel>
                {
                    movies?.map((movie) => {
                        return (
                            <Paper key={movie.imdbId}>
                                <div className='movie-card-container'>
                                    <div className="movie-card" style={{ "--img": `url(${movie.backdrops[0]})` }}>
                                        <div className="movie-detail">
                                            <div className="movie-poster">
                                                <img src={movie.poster} alt={movie.title} />
                                            </div>

                                            {/* <div className="movie-poster">
                                                <img src={movie.poster} alt="" />
                                            </div> */}

                                            <div className="movie-title">
                                                <h4>{movie.title}</h4>
                                            </div>
                                            <div className="movie-buttons-container">
                                                <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                                    <div className="play-button-icon-container">
                                                        <FontAwesomeIcon className="play-button-icon"
                                                            icon={faCirclePlay}
                                                        />
                                                    </div>
                                                </Link>

                                                <div className="movie-review-button-container">
                                                    <Button variant="info" onClick={() => reviews(movie.imdbId)} >Reviews</Button>
                                                </div>
                                                <div>
                                                    <button
                                                        className="watchlist-button"
                                                        onClick={() => addToWatchListHandler(movie.imdbId)}
                                                        disabled={userWatchlist.includes(movie.imdbId)}
                                                        style={{
                                                            backgroundColor: userWatchlist.includes(movie.imdbId) ? '#d4edda' : 'white',
                                                            color: userWatchlist.includes(movie.imdbId) ? 'green' : 'black',
                                                            fontWeight: 'bold',
                                                            marginTop: '10px',
                                                            padding: '6px 14px',
                                                            borderRadius: '5px',
                                                            border: 'none',
                                                            cursor: userWatchlist.includes(movie.imdbId) ? 'not-allowed' : 'pointer'
                                                        }}
                                                    >
                                                        {userWatchlist.includes(movie.imdbId) ? '✓ In Watchlist' : '+ Watchlist'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}

export default Hero

