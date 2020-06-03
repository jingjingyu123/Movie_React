import React, { Component} from 'react';
import globalVal from './Global/globalVar';
import axios from 'axios'
import useState from 'react';
import config from './config.js';
import Movies from './Movies';
const firebase = require('firebase');

export class Messages extends Component{
    constructor() {
      super();
      this.state = {
        imdbID: '',
        Director: '',
        Title: '',
        Poster: '',
        Rating: '',
        List:'All',
        items: []
      }
      this.changeHandler = this.changeHandler.bind(this);
      this.submissionHandler = this.submissionHandler.bind(this);
      }

      changeHandler(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
      }

      submissionHandler(e) {
        e.preventDefault();
        const moviesRef = firebase.database().ref('movies');
        let temp = "https://www.omdbapi.com/?apikey=a53d51fa&i=" + this.state.movieID;
        const temp2 = axios.get(temp);
        axios.all([temp2]).then(axios.spread((...responses) => {
            moviesRef.orderByChild("movieID").equalTo(this.state.movieID).once('value', snapshot => {
              if (snapshot.exists()) {
                window.alert("Movie exists!")
              }
              else {
                const thing = {
                  movieID: this.state.movieID,
                  Title: responses[0].data.Title,
                  Poster: responses[0].data.Poster,
                  Director: responses[0].data.Director,
                  Rating: responses[0].data.imdbRating,
                  Plot: responses[0].data.Plot,
                  List: this.state.List
                }
                console.log(thing)
                moviesRef.child(this.state.movieID).set(thing);
                window.alert("Movie added!")
              }
            });
          }
        ));
      }
    
  render(){
    if (!firebase.apps.length) {
        firebase.initializeApp(config)
    }
       return ( 
       <div className='Messages'>
           <header>
               <div className='wrapper'>
                   <h1>Add a new movie!</h1>
               </div>
            </header>
        <div className='container'>
          <form onSubmit={this.submissionHandler}>
              <b>Movie ID</b>
            <input onChange={this.changeHandler} value={this.state.movieID} name="movieID"/>
            <button>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Messages ;
