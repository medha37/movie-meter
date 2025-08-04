import React, { useEffect, useState } from 'react';
import { getWatchList } from '../../api/authApi';
import api from '../../api/axiosConfig';
import './WatchList.css';

const WatchList = ({ user }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                const res = await getWatchList();
                const imdbIds = res.data;

                const movieData = await Promise.all(
                    imdbIds.map(id => api.get(`/api/v1/movies/${id}`))
                );

                setMovies(movieData.map(m => m.data));
            } catch (err) {
                console.error(err);
            }
        };

        fetchWatchlist();
    }, []);

    if (!user) {
        return <div className="watchlist-container"><h2>Please login to view your Watchlist.</h2></div>;
    }

    if (loading) {
        return <div className="watchlist-container"><h2>Loading your Watchlist...</h2></div>;
    }

    return (
        <div className="watchlist-container">
            <h2>Your Watchlist</h2>
            <div className="watchlist-grid">
                {movies.length === 0 ? (
                    <p>No movies in your watchlist yet.</p>
                ) : (
                    movies.map(movie => (
                        <div key={movie.imdbId} className="movie-card-new">
                            <img src={movie.poster} alt={movie.title} />
                            <h3>{movie.title}</h3>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default WatchList;