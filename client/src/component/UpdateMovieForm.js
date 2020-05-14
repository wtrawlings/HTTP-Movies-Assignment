import React, { useState, useEffect } from 'react';
import axios from 'axios';


const UpdateMovieForm = props => {
    const [movieData, setMovieData] = useState({title: "", director: "", metascore: "", stars: ""});
    
    console.log(props)

    //this useEffect is for getting the data to the form on load
    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
        .then(res => {
            setMovieData(res.data);
        })
        .catch(error => {
            console.log({error});
        })
    }, [props.match.params.id]);


    const changeHandler = e => {
        if (e.target.name === "stars" ) {
            setMovieData({...movieData, [e.target.name]: e.target.value.split(",")})
            //this is to deal with the array in NAMES input because others are strings
        } else {
            setMovieData({...movieData, [e.target.name]: e.target.value})
            //this is the normal methos of getting the data to update strings
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
          .put(`http://localhost:5000/api/movies/${movieData.id}`, movieData)
          .then(res => {
            console.log("Res: ", res);
            props.setMovieList(state => state.map(movie => {
                if (movie.id === movieData.id) {
                    return res.data;
                } else {
                    return movie;
                };
            }) );
            props.history.push(`/`);
          })
          .catch(err => console.log("Error is: ", err));
      };



    return (
        <div>
            <form onSubmit={handleSubmit}>
              <input type="text" name='title' placeholder="title" value={movieData.title} onChange={changeHandler} />
              <input type="text" name='director' placeholder="director" value={movieData.director} onChange={changeHandler} />
              <input type="number" name='metascore' placeholder="metascore" value={movieData.metascore} onChange={changeHandler}/>
              <input type="text" name='stars' placeholder="stars" value={movieData.stars} onChange={changeHandler}/>
              <input type="submit" value="submit" />  
            </form>
        </div>
    )
}

export default UpdateMovieForm
