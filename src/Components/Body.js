import React, { Component} from 'react';
import Home from './Home'
import Image from './Image'
import Videos from './Videos'
import Projects from './Projects'
import Messages from './Messages'
import Movies from './Movies'
import TabList from './TabList';

export class Body extends Component{
    displayContent=()=>{
        var activeTab=this.props.activeTab
        if(activeTab==1){
            return <Home/>
        }
        else if(activeTab==2){
            return <Projects/>
        }
        else if(activeTab==3){
            return <Messages/>
        }
        else if(activeTab==4){
            return  <Movies/>
        }
        else if(activeTab==5){
            return  <Image/>
        }
    }
  render(){
    return (this.displayContent());
  }
}

export default Body;