import React, { Component } from 'react';
import { 
	BrowserRouter as Router,
	Route, 
	Switch,
	Redirect
} from 'react-router-dom';
import './App.css';
import Header from './components/header/header.js';
import Audio from './components/audio/audio.js';
import Detail from './components/detail/detail.js';
import List from './components/list/list.js';
class App extends Component {
  render() {
    return (
	<Router>
      <div>
        <Header />
        <Switch>
        	<Route path='/list' component={List} />
        	<Route path='/detail/:cid' component={Detail} />
        	<Redirect from='/*' to='/list'/>
        </Switch>
		<Audio />	
      </div>
    </Router>
    );
  }
}

export default App;
