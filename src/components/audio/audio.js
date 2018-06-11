import React, { Component } from 'react';
import { connect } from 'react-redux';
import './audio.css';

class AudioUI extends Component {
	constructor(){
		super();
		this.handleAudioPlayBtn=this.handleAudioPlayBtn.bind(this);
		this.timer=null;
	}
  render() {
    return (
      <div id="musicAudio">
				<div ref="audioPlayBtn" className="audioPlay" onTouchStart={this.handleAudioPlayBtn}></div>
				<div ref="audioProgress1" className="audioProgress">
					<div id="audioBar1" ref="audioBar1" className="audioBar"></div>
					<div id="audioNow1" ref="audioNow1" className="audioNow"></div>
				</div>
				<audio id="audio1" ref="audio1" src={this.props.getMusicUrl}></audio>
	  	</div>
    );
  }
  componentDidMount(){
  	
  }
  componentDidUpdate(){
  	if(this.props.isPlayMusic&&this.refs.audio1.src!=='http://localhost:3000/list'){	
  		this.musicPlay();
  		this.audioBarMove();
  	}
  	if(!this.props.isPlayMusic&&this.refs.audio1.src!=='http://localhost:3000/list'){
  		this.musicPause();	
  	}
  }
  handleAudioPlayBtn(){
  	if(this.props.isPlayMusic&&this.refs.audio1.src!=='http://localhost:3000/list'){
  		this.props.isPlayMusicFun(false);
  	}	
  	if(!this.props.isPlayMusic&&this.refs.audio1.src!=='http://localhost:3000/list'){
  		this.props.isPlayMusicFun(true);
  	};
  }
  musicPlay(){
  	this.refs.audio1.play();
  	this.refs.audioPlayBtn.style.backgroundImage = 'url(/images/list_audioPause.png)';
  	var This=this;
  	this.autoBarMove();
  	this.timer=setInterval(function(){
  		This.autoBarMove();
  	},1000)
  }
  musicPause(){
  	this.refs.audio1.pause();
  	this.refs.audioPlayBtn.style.backgroundImage = 'url(/images/list_audioPlay.png)';
  	
  	clearInterval(this.timer);
  }
  audioBarMove(){
  	var audioBar1=this.refs.audioBar1;
  	var audioProgress1=this.refs.audioProgress1;
  	var audioNow1=this.refs.audioNow1;
  	var audio1=this.refs.audio1;
  	var dx=0,dfx=0;
  	audioBar1.ontouchstart = function(ev){
  		dx=ev.changedTouches[0].pageX-this.offsetLeft;
  		var This=this;
  		document.ontouchmove = function(ev){
  			dfx=ev.changedTouches[0].pageX-dx;
  			if(dfx<0){
  				dfx=0
  			}else if(dfx>audioProgress1.offsetWidth - audioBar1.offsetWidth+15){
  				dfx=audioProgress1.offsetWidth - audioBar1.offsetWidth+15;
  				
  			}
  			This.style.left=dfx+'px';
  			var scaleX = dfx / (audioProgress1.offsetWidth - audioBar1.offsetWidth + 15);
  			audioNow1.style.width = 100 * scaleX + '%';
  			audio1.currentTime = scaleX * audio1.duration;
  		};
  		document.ontouchend = function(){
				document.ontouchmove = null;
				document.ontouchend = null;
			};
			return false;
  	}
  }
  autoBarMove(){
		var audioProgress1 = this.refs.audioProgress1;
		var audioBar1 = this.refs.audioBar1;
		var audioNow1 = this.refs.audioNow1;
		var audio1 = this.refs.audio1;
		var scaleX = audio1.currentTime / audio1.duration;
  	audioNow1.style.width = 100 * scaleX + '%';
  	audioBar1.style.left = (audioProgress1.offsetWidth - audioBar1.offsetWidth + 15) * scaleX + 'px';
  }
}
function mapStateToProps(state){
  return {
    getMusicUrl : state.getMusicUrl,
    isPlayMusic : state.isPlayMusic,
    isBarMove : state.isBarMove
  };
}
function mapDispatchToProps(dispatch){
  return {
  	isPlayMusicFun(t){
			dispatch({type:'Is_Play_Music',payload:t})
		}
  };
}

var Audio = connect(mapStateToProps,mapDispatchToProps)(AudioUI);

export default Audio;
