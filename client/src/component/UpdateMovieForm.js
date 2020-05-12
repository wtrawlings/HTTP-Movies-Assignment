import React, { useState, useEffect } from 'react';


//useEffect to pull in data
//props.match.params.id changes
//submit handler to do the put request
//update state from this component



function UpdateMovieForm(props) {
    const [movieData, setMovieData] = useState({title: "", director: "", metascore: "", stars: ""});

    const changeHandler = e => {
        setMovieData({...movieData, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <form >
              <input type="text" name='title' placeholder="title" value={movieData.title} onChange={changeHandler} />
              <input type="text" name='director' placeholder="director" value={movieData.director} onChange={changeHandler} />
              <input type="text" name='metascore' placeholder="metascore" value={movieData.metascore} onChange={changeHandler}/>
              <input type="text" name='stars' placeholder="stars" value={movieData.stars} onChange={changeHandler}/>
              <input type="submit" value="submit" />  
            </form>
        </div>
    )
}

export default UpdateMovieForm
