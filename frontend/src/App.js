import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';
import Login from './components/login/Login';
import Register from './components/register/Register';
import WatchList from './components/watchList/WatchList';

import { Routes, Route } from 'react-router-dom';

function App() {
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);

  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.reviews);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   const email = localStorage.getItem("email");
  //   if (email) setUser(email);
  //   getMovies();
  // }, []);

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home movies={movies} />} />
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
          <Route
            path="/Reviews/:movieId"
            element={
              <Reviews
                getMovieData={getMovieData}
                movie={movie}
                reviews={reviews}
                setReviews={setReviews}
              />
            }
          />
          <Route path="/watchList" element={<WatchList />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;