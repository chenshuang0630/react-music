import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './header.css';

class HeaderUi extends Component {
  render() {
    return (
      <div id="musicHeader">
      {this.props.isBackshow?<span><NavLink to="/list">&lt;</NavLink></span>:''}音乐巅峰榜
	  </div>
    );
  }
}

function mapStateToProps(state){
	return{

		isBackshow:state.isBackshow

	}
}
function mapDispatchToProps(dispatch){
	return{
		
	}
}
var Header=connect(mapStateToProps,mapDispatchToProps)(HeaderUi);
export default Header;
