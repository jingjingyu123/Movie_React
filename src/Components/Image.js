import React, { Component} from 'react';
import Messages from './Messages'
import globalVal from './Global/globalVar';
import SimpleReactLightbox from 'simple-react-lightbox';
import { SRLWrapper } from 'simple-react-lightbox';
import config from './config.js';
const firebase = require('firebase');



// var photo;
// var data=new Array(8);
// const axios = require('axios');
// // data[0]=JSON.parse(JSON.stringify(globalVal.movie[1]));
// var movie=new Array(8).fill("");
// movie[1]=JSON.parse(JSON.stringify(globalVal.movie[1]));
// var a="tt3896198";
// let b=globalVal.movie[1];
// var b = JSON.parse(JSON.stringify(globalVal.movie[1]));
// var c='https://www.omdbapi.com/?i='+globalVal.movie[1].slice(0)+'&apikey=b780d44a';
    // const axios = require('axios');
    // axios.get(JSON.stringify(globalVal.movie)[1])
    // .then(function (response){
    // data="Title: "+response.data.Title+"  "+"Director:"+response.data.Director+" "+"Ratings: ";
    // var temp2="";
    // for(var i=0;i<response.data.Ratings.length;i++){
    //   temp2=temp2+response.data.Ratings[i].Source+" "+response.data.Ratings[i].Value+"; ";
    // }
    // data=data+temp2;
    // photo=response.data.Poster; 
    // })
    // .catch(function (error){
    // })
    // .then(function(){
    // });
     
export class Image extends Component{
  // constructor() {
  //   super();
  //   this.state = {
  //     username:'',
  //     data:'',
  //     // bio: '',
  //     // can_post: '',
  //     // date: '',
  //     // email: '',
  //     // message: '',
  //     ids:[]
  //   }
  // }
  // componentDidMount() {
  //   const itemsRef = firebase.database().ref('id');
  //   itemsRef.on('value', (snapshot) => {
  //     let ids = snapshot.val();
  //     let newState = [];
  //     // for(let i=0;i<ids.length;i++){
  //     for (let id in ids) {
  //       // movie.push(ids[id].username);
  //       for(var i=0;i<movie.length;i++){
  //         var temp=ids[id].username;
  //         if(movie[i]=='https://www.omdbapi.com/?i='+movie[0]+'&apikey=b780d44a'){
  //           break;
  //         }
  //         if(movie[i]==""){
  //            movie[i]='https://www.omdbapi.com/?i='+movie[0]+'&apikey=b780d44a';
  //            break;
  //         }
  //       }
  //       newState.push({
  //         // id: item,
  //         // title: items[item].date,
  //         username: ids[id].username
  //         // bio: items[item].bio,
  //         // message: items[item].message,
  //         // can_post: items[item].can_post
  //       });
  //     }
      
  //     this.setState({
  //       ids: newState
  //     });
  //   });
  // }
  // render(){
  //   if (!firebase.apps.length) {
  //     firebase.initializeApp(config)
  // }
  //   return(
  //     <div className='Messages'>
  //      <section className='display-item'>
  //           <div className='wrapper'>
  //           {/* <p>{c}</p> */}
  //           <p>{data}</p>
  //           <ul>             
  //             {this.state.ids.map((id) => {
  //                 return (
  //                   <div>
  //                       <p>{id.username}</p>
  //                       <p>{globalVal.movie[2]}</p>
  //                       <p>{data}</p>
  //                       <p>nice</p>
  //                   </div>
  //                       )
  //                       })}
  //           </ul>
  //           </div>
  //         </section>
  //         </div>
  //   )
  // }
}

export default Image;