import React, { Component} from 'react';
import './App.css'
import Body from './Components/Body';
import Header from './Components/Header';
import Tablist from './Components/TabList';
import ScrollUpButton from "react-scroll-up-button";
 

export class App extends Component{

  constructor(){
    super();
    this.state = {
      activeTab: 1
    }
    this.changeTab = (id)=>{
      this.setState({
        activeTab: id
      })
      if(id == 1) document.title='Home';
      else if(id==2) document.title='Create Lists';
      else if(id==3) document.title='Add Movies';
      else if(id==4) document.title='Movies';
      else document.title='Graph';
    }
    document.title='Home';
  }
  render(){
    const tabs=[
      {
      id:1,
      title:'Home'
      },
      {
        id:2,
        title:'Create Lists'
      },
      {
        id:3,
        title:'Add Movies'
      },
      {
        id:4,
        title:'Movies'
      },
      {
        id:5,
        title:'Graph'
      }
    ]
    return (
      <div background-color="blanchedalmond" width="100vh" height="100vh" className="body">
        <div className="header">
          <Header/>
        </div>
        <div className="nav-bar">
            <Tablist tabs={tabs} 
            changeTab={this.changeTab}
            activeTab={this.state.activeTab}/>
        </div>
        <div className="main-body">
          <ScrollUpButton/>
            <Body background-color="blanchedalmond" activeTab={this.state.activeTab}/>
        </div>
      </div>
    );
  }
}

export default App;