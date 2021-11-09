import React, { Component } from "react";
import Clock from "react-live-clock";
  
class Today extends Component{
  render(){
    return(
      <h3>
        <Clock format={'YYYY년 MM월 DD일 HH:mm:ss'} ticking={true} timezone={'KR/Pacific'}/>
      </h3>
    )
  }
}
  
export default Today;
