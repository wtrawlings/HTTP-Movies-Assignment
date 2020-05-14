import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import MovieCard from "./MovieCard";

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  const removeMovie = () => {
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
    .then(() => {
      props.setMovieList(state => state.filter(movie => movie.id != params.id ))
      props.history.push(`/`)
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <p></p>
      {/* Add a button in the movie component that routes you 
      to your new route with the movies's id as the URL param */}
      <Link to={`/update-movie/${movie.id}`}>
        <div className="edit-button" >
          Update
        </div>
      </Link>
      
        <div className="delete-button" onClick={removeMovie}>
          Delete
        </div>
     
    </div>
  );
}

export default Movie;
