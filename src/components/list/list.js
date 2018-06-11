import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './list.css';

class ListUi extends Component {
	constructor(){
		super();
		this.state={
			songs:[]
		};
		this.isMove=false;
		this.handleMove=this.handleMove.bind(this);
		this.handleEnd=this.handleEnd.bind(this);
	}
  render() {
    return (
      <div id="musicList">
			<ul>
					{
						this.state.songs.map((item,index)=>{
							return(
								<li key={item.id} onTouchMove={this.handleMove} onTouchEnd={()=>this.handleEnd(item.id,item.url)}>
									<div className="listOrder">{index+1}</div>
									<div className="listName">
										<h3>{item.title}</h3>
										<p>{item.author}</p>
									</div>
								</li>
							)
						})
					}
				
			</ul>
	  </div>
    );
  }
  
  componentDidMount(){
  	/*var audio1=document.getElementById('audio1');
  	var audioNow1=document.getElementById('audioNow1');
  	var audioBar1=document.getElementById('audioBar1');
  	if(this.props.isPlayMusic==false){
  		audioNow1.style.width = 0;
  		audioBar1.style.left = 0;
  	}*/
  	this.props.changeBackShow(false);
  	//https://api.hibai.cn/api/demo/index 音乐的接口

  	axios.post('/api/index/index',{
  		"TransCode":"020111",
  		"OpenId":"Test",
  		"Body":{"SongListId":"141998290"}
  	}).then((res)=>{
		//console.log(res);
		this.setState({
			songs:res.data.Body.songs
		})
  	});
  	/*axios.get('/mock/list.json').then((res)=>{
  		if(res.data.ErrCode==="OK"){
  			//console.log(res.data.Body);
  			this.setState({
  				songs:res.data.Body.songs
  			})
  		}
  	})*/
  }
  
  handleMove(){
  	this.isMove=true
  }
  handleEnd(id,url){
  	if(this.isMove){
  		this.isMove=false
  	}else{
  		this.props.history.push('/detail/'+id);
  		var soundsUrl=url;
  		this.props.getMusicUrl(soundsUrl);
  		this.props.isPlayMusicFun()
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
		changeBackShow(f){
			dispatch({type:'Is_Back_Show',payload:f});
		},
		getMusicUrl(url){
			dispatch({type:'GET_MUSIC_URL',payload:url});
		},
		isPlayMusicFun(){
			dispatch({type:'Is_Play_Music',payload:true})
		}
	}
}
var List=connect(mapStateToProps,mapDispatchToProps)(ListUi);
export default List;
