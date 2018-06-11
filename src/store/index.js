import { createStore , combineReducers } from 'redux';

function isBackshowReducer(state=false,action){
	if(action.type==='Is_Back_Show'){
		return action.payload;
	}else{
		return state;
	}
}

function getMusicUrlReducer(state='',action){
	if(action.type === 'GET_MUSIC_URL'){
		return action.payload;
	}
	else{
		return state;
	}
}

function isPlayMusicReducer(state=false,action){
	if(action.type === 'Is_Play_Music'){
		return action.payload;
	}else{
		return state
	}
}


var reducers = combineReducers({
	isBackshow:isBackshowReducer,
	getMusicUrl : getMusicUrlReducer,
	isPlayMusic:isPlayMusicReducer
});

var store = createStore(reducers);

export default store;
