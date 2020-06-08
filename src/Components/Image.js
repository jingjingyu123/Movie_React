import React, { Component} from 'react';
import Messages from './Messages'
import 'react-popupbox/dist/react-popupbox.css'
import {
    PopupboxManager,
    PopupboxContainer
  } from 'react-popupbox';
import config from './config.js';
const firebase = require('firebase');
var d3=require("d3");

     
export class Image extends Component{
  constructor() {
    super();
    this.state = {
      nodes2:[],
      links2:[],
      test:[]
    }
  }

  drag = (simulation)=>{
  function dragStarted(d){
    if(!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx=d.x;
    d.fy=d.y;
  }
  function dragged(d){
    d.fx=d3.event.x;
    d.fy=d3.event.y;
  }
  function dragEnded(d){
    if(!d3.event.active) simulation.alphaTarget(0);
    d.fx=null;
    d.fy=null;
  }

  return d3.drag()
  .on("start",dragStarted)
  .on("drag",dragged)
  .on("end",dragEnded);
}

  chart(nodes,links){
    const width=1920;
    const height=1080;

    const obj_links=links.map(d=>Object.create(d));
    const obj_nodes=nodes.map(d=>Object.create(d));

    const svg=d3.create("svg").attr("viewBox",[0,0,width,height]);

    const link=svg.append("g")
    .attr("stroke","#999")
    .attr("stroke-opacity",0.6)
    .selectAll("line")
    .data(obj_links)
    .join("line")
    .attr("stroke-width",d=>Math.sqrt(d.value));

    var defs = svg.append('svg:defs');
    var config = {
      "avatar_size" : 48
    }

    const img = (node) => {
      if(node.group == 2) {
          defs.append('pattern')
              .attr('id', 'id' + node.id)
              .attr('patternUnits', 'objectBoundingBox')
              .attr('width', 1.2)
              .attr('height', 1.2)
              .append('image')
              .attr('xlink:href', node.Poster)
              .attr('width', 225)
              .attr('height', 225)
              .attr('x', -40)
              .attr('y', -20)
          return 'url(#id' + node.id + ')'
      }
      return d3.color("green")
  }


    const color=(node)=>{
      if(node.group==1){
        return d3.color("green");
      }
      return d3.color("black");
    }

    const radius=(node)=>{
      if(node.group==1){
        return 20;
      }
        return 60;
    }

    const simulation=d3.forceSimulation(obj_nodes)
    .force("link",d3.forceLink().links(links).id(d=> {return d.index}).distance(200))
    .force("charge",d3.forceManyBody())
    .force("center",d3.forceCenter(width/2,height/2));

    const node=svg.append("g")
    .attr("stroke","#999")
    .attr("stroke-width",1.5)
    .selectAll("circle")
    .data(obj_nodes)
    .join("circle")
    .attr("r",radius)
    .attr("fill",color)
    .attr("fill",img)
    .on('mouseover', function(d) {
      if(d.group == 1) { 
          svg.append('text')
              .attr('stroke', 'black')
              .text(d.name)
              .attr('x', d3.select(this).attr("cx") + 10)
              .attr('y', d3.select(this).attr("cy") + 10)
      }
  })
  .on('mouseout', function(d) {
      if(d.group == 1) {
          d3.select('text').remove();
      }
  })
    .call(this.drag(simulation));

    simulation.on("tick",()=>{
      link
        .attr("x1",d=>d.source.x)
        .attr("y1",d=>d.source.y)
        .attr("x2",d=>d.target.x)
        .attr("y2",d=>d.target.y)

      node
        .attr("cx",d=>d.x)
        .attr("cy",d=>d.y)
    })
    return svg.node();
  }
  componentDidMount(){
    //get information from database
    const moviesRef = firebase.database().ref('movies');
    const elem=document.getElementById("mysvg");
    moviesRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let temp1=[];
      let nodes_temp = [];
      let links_temp = [];
      var k=0;
      var list=0;
      var list_temp=0;
      var test_temp=[];
      for (let item in items) {
        if(items[item].List=="GraphViz"){
          nodes_temp.push({
                name:items[item].Title,
                id:k,
                group:2,
                Poster:items[item].Poster
            });
          var a = items[item].Actors.split(", "); 
          for(var i=0;i<a.length;i++){
                    nodes_temp.push({
                    name: a[i],
                    id:k,
                    group:1,
                    Poster:items[item].Poster
                });
          }

        var list_temp=list;
        for(var i=0;i<a.length;i++){
          list++;
          links_temp.push({
            source:list_temp,  //poster
            target:list,       //actor 
            value:1
        });
        }
        list++;
        k++;
          }
      }

      for(var m=0;m<nodes_temp.length-1;m++){
        for(var n=m+1;n<nodes_temp.length;n++){
          if(nodes_temp[m].name==nodes_temp[n].name){
            for(var z=0;z<links_temp.length;z++){
              if(links_temp[z].target==n){
                // var temp_source=links_temp[z].source;
                var tsource=links_temp[z].source;
                links_temp.splice(z,1);
                var key=z;
                for(key;key<links_temp.length;key++){
                  if(links_temp[key].value==1){
                  var p1;
                  p1=links_temp[key].target-1;
                  links_temp[key].target=p1;
                  }

                  if(links_temp[key].source>n){
                    var p2;
                    p2=links_temp[key].source-1;              
                    links_temp[key].source=p2;
                  }
                }

                links_temp.push({
                  source:tsource,
                  target:m,
                  value:2
                })
              }
            }
            nodes_temp.splice(n,1);
            n--;
          }
        }
      }


      this.setState({
        nodes2:nodes_temp,
        links2:links_temp,
        test:test_temp
      }
      , function(){
        elem.appendChild(this.chart(this.state.nodes2,this.state.links2));
      });
    });
  }

  render(){
    if (!firebase.apps.length) {
      firebase.initializeApp(config)
  }
    return (
      <div id="mysvg"></div>
    )
  }
}

export default Image;