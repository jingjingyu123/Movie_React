import React, { Component} from 'react';
import globalVal from './Global/globalVar';
import axios from 'axios'
import useState from 'react';
import config from './config.js';
import Movies from './Movies';
const firebase = require('firebase');

export class Projects extends Component{
    constructor() {
        super();
        this.state = {
          list:''
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.listSubmissionHandler = this.listSubmissionHandler.bind(this)
        }

        changeHandler(e) {
            this.setState({
              [e.target.name]: e.target.value
            });
          }        
  
        listSubmissionHandler(e) {
          e.preventDefault();
          const listRef = firebase.database().ref('lists');
          window.alert("successful");
          listRef.push(this.state.list)
        }
   
    render(){
      if (!firebase.apps.length) {
          firebase.initializeApp(config)
      }
         return ( 
         <div className='Messages'>
             <header>
                 <div className='wrapper'>
                     <h1>Create your List!</h1>
                 </div>
              </header>
          <div className='container'>
          <form onSubmit={this.listSubmissionHandler}>
              <label>
                <b>List Name</b>
              </label>
              <input onChange={this.changeHandler} value={this.state.list} type="text" name="list"/>
              <button>Submit</button>
            </form>
          </div>
        </div>
      );
    }
}

export default Projects;