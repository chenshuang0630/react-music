import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './detail.css';

class DetailUi extends Component {
	constructor(){
		super();
		this.state={
			lryic:[]
		};
		this.timer2=null;
	}
	render() {
    return (
      <div id="musicLyric">
			     <ul ref="ul1">
			     	{
			     		this.state.lryic.map((item,index)=>{
			     			return(
			     				<li key={index}>{item.lry}</li>
			     			)
			     		})
			     	}
			     </ul>
		  </div>
    );
  }
  componentDidMount(){
  	this.props.changeBackShow(true);
  	var cid = this.props.match.params.cid;
    axios.get('/music/Music/Music?id='+cid+'&type=lrc').then((res)=>{
  	//axios.get('/mock/detail.json').then((res)=>{
  		var lry=this.formatLry(res.data);
  		this.setState({
  			lryic:lry
  		});
  		//console.log(this.state.lryic)
  		//console.log(document.getElementById('audio1'));
  	});
  	
  	this.props.isPlayMusicFun(true);
  }
  componentWillUnmount(){
    clearInterval(this.timer2);
  }
  componentDidUpdate(){
  	var This=this;
  	if(this.props.isPlayMusic){
  		this.timer2=setInterval(function(){
	  		This.autoScrollLryic();
	  	},1000)
  	}else{
  		clearInterval(this.timer2);
  	}
  }
  formatLry(lry){
  	var re=/(\[[^\]]+\])([^[]+)/g;
  	var newlry=[];
  	var This=this;
  	lry.replace(re,function($0,$1,$2){
  		newlry.push({
  			time:This.formatLryTime($1),lry:$2
  		})
  	})
  	return newlry;
  }
  formatLryTime(t){
  	var y=t.substring(1,t.length-1).split(':');
  	var z=(parseFloat(y[0])*60+parseFloat(y[1])).toFixed(2);
  	return z;
  }
  autoScrollLryic(){
  	var audio1=document.getElementById('audio1');
  	var ul1=this.refs.ul1;
  	var li=this.refs.ul1.getElementsByTagName('li');
  	//console.log(audio1.currentTime);
  	for(var i=0;i<this.state.lryic.length;i++){
  		if(audio1.currentTime>this.state.lryic[i].time&&i===this.state.lryic.length-1){
  			//console.log(1111)
  			for(var j=0;j<this.state.lryic.length;j++){
	  				li[j].className='';
	  			}
	  		li[i].className='active';
	  		if(audio1.currentTime >= audio1.duration){
	  			this.props.isPlayMusicFun(false);
	  		}
	  		break;
  		}
	  	if(audio1.currentTime>this.state.lryic[i].time&&audio1.currentTime<this.state.lryic[i+1].time){
	  		//console.log(2222)
  			for(var k=0;k<this.state.lryic.length;k++){
  				li[k].className='';
  			}
  			li[i].className='active';
  			if(i >= 5){
                ul1.style.top = - (li[0].offsetHeight + 15) * (i-4) + 'px';
          	}
	  	}
  		
  	}
  }
}

function mapStateToProps(state){
	return{
		isPlayMusic:state.isPlayMusic
	}
}
function mapDispatchToProps(dispatch){
	return{
		changeBackShow(t){
			dispatch({type:'Is_Back_Show',payload:t});
		},
		isPlayMusicFun(t){
			dispatch({type:'Is_Play_Music',payload:t})
		}
	}
}
var Detail=connect(mapStateToProps,mapDispatchToProps)(DetailUi);
export default Detail;
