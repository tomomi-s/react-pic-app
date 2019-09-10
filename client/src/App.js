import React, {useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import PrivateRoute from './components/routing/PrivateRoute';

import AddPost from './components/post/AddPost';
import DeletePostModal from './components/post/DeletePostModal';
import EditPost from './components/post/EditPost';

import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token)
}



const App = ()=> {
  useEffect(() => {
    //Init Materialize JS
    M.AutoInit();
  })

  

  return (
    <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <div className="container">
          <Alert />
          <Switch>
            <PrivateRoute exact path="/" component={Home}/>
            <PrivateRoute exact path="/post/new" component={AddPost}/>
            <PrivateRoute exact path="/post/:id" component={EditPost}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
          </Switch> 
          <PrivateRoute component={DeletePostModal} />
        </div>
      </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
