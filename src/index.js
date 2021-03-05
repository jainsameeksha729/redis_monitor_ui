import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';
import {Router, Route} from 'react-router-dom';
import {createHashHistory} from 'history' 
import MainComponent from './common/main.jsx';

import Redis from './redis.jsx';

let hashHistory = createHashHistory({hashType: 'slash'})
ReactDOM.render(
  <React.StrictMode>
  <Router history={hashHistory}>
    <Route path="/" component={MainComponent}/>
    <Route path="/:md5" component={Redis} />
    {/* </Route> */}
  </Router>
  </React.StrictMode>,
  document.getElementById('wrapper')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
