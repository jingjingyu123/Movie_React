import React, { Component} from 'react';
import config from './config.js';
import 'react-popupbox/dist/react-popupbox.css'
import {
    PopupboxManager,
    PopupboxContainer
  } from 'react-popupbox';
import SimpleReactLightbox from 'simple-react-lightbox';
import { SRLWrapper } from 'simple-react-lightbox';
const firebase = require('firebase');

export class Movies extends Component{
  constructor() {
    super();
    this.state = {
      movieID: '',
      Title: '',
      Poster: '',
      Director: '',
      Rating: '',
      List:'',
      visible:8,
      items: [],
      list:[],
    }
    this.loadmore=this.loadmore.bind(this);
    this.listSelectHandler = this.listSelectHandler.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.deletionHandler = this.deletionHandler.bind(this);
    this.listSubmissionHandler = this.listSubmissionHandler.bind(this);
    this.changeListHandler = this.changeListHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount() {
    const moviesRef = firebase.database().ref('movies');
    moviesRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          movieID: items[item].movieID,
          List:items[item].List,
          Title: items[item].Title,
          Poster: items[item].Poster,
          Director: items[item].Director,
          Rating: items[item].Rating,
        });
      }
      this.setState({
        items: newState
      });
    });

    const listRef = firebase.database().ref('lists')
    listRef.on('value',(snapshot) => {
      let items = snapshot.val()
      let db = []
      for(let item in items){
        db.push(items[item])
      }
      this.setState({
        list:db
      })
    })
  }

  deletionHandler(id){
    firebase.database().ref('movies').child(id).remove()
  }

  changeListHandler(e) {
    let newState = e.target.value   
    const moviesRef = firebase.database().ref('movies');
    moviesRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newMovies = [];
      for (let item in items) {
        if(newState=="All" ||( items[item].List == newState)){    
          newMovies.push({
            id: item,
            movieID: items[item].movieID,
            Title: items[item].Title,
            Poster: items[item].Poster,
            Director: items[item].Director,
            Rating: items[item].Rating,
          });
        }
      }
      this.setState({
        items: newMovies
      })
    })
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  listSubmissionHandler(e) {
    e.preventDefault();
    const listRef = firebase.database().ref('lists')
    listRef.push(this.state.List)
  }


  searchHandler(e){
    e.preventDefault();
    let temp = this.state.Title;
    const moviesRef = firebase.database().ref('movies');
    moviesRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newMovies = [];
      for (let item in items) {
        if(items[item].Title == temp){
          newMovies.push({
            id: item,
            movieID: items[item].movieID,
            Title: items[item].Title,
            Poster: items[item].Poster,
            Director: items[item].Director,
            Rating: items[item].Rating,
          });
        }
      }
      this.setState({
        items: newMovies,
      })
    })
  }

  listSelectHandler(id,list){
    const moviesRef = firebase.database().ref('movies').child(id)
    moviesRef.child("List").set(list)
  }
  
  //load more movies
  loadmore(){
    this.setState((old)=>{
      return {visible:old.visible+8}
    })
  }

  openPopupbox = (movie) => {
    const content = (
      <div>
        <img src={movie.Poster} alt="new"/>
        <div>
          <p><b>IMDB Rating: </b>{movie.Rating}</p>
          <p><i>{movie.Plot} </i></p>
          <p>Director by {movie.Director}</p>

          <select onChange={e => this.listSelectHandler(movie.movieID,e.target.value)}>     
          <option value="" disabled selected>Add to list:</option>
            {this.state.list
                .map(list => (
                    <option value={list}>{list}</option>
                ))
            }
          </select>

          <button onClick={() => {this.deletionHandler(movie.movieID)}}>Delete</button>
        </div>
      </div>
    )
      PopupboxManager.open({
        content,
        config: {
          titleBar: {
            enable: true,
            text: movie.Title
          },
          onOpen: this.onLightBoxOpen,
          onClosed: this.onLightBoxClosed
        }
      })
  }
  onLightBoxOpen = () => {
  document.body.style.overflow = 'hidden'
  }
  onLightBoxClosed = () => {
  document.body.style.overflow = 'inherit'
  }

  render(){
    if (!firebase.apps.length) {
      firebase.initializeApp(config)
  }
    return (
      <div>
          <select onChange={this.changeListHandler}>
              {this.state.list.map(item => (
                <option value={item}>{item}</option>
              ))}
          </select>

          <div>
          <form onSubmit={this.searchHandler}>
            <input onChange={this.changeHandler} value={this.state.Title} type="text" name="Title"/>
            <button>Search</button>
          </form>
          </div>

      <div class="Movies">
        {this.state.items.slice(0,this.state.visible).map((movie, i) => (
            <img src={movie.Poster} key={movie.Title} alt="movie" onClick={this.openPopupbox.bind(this, movie)}/>
        ))}
    </div>
    <PopupboxContainer />

    <button onClick={this.loadmore}>loadmore</button>
    </div>
    );
  }
}

export default Movies;