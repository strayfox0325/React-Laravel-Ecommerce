import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import MasterLayout from './layouts/admin/MasterLayout';
//import Home from './components/front/Home';
import Login from './components/front/Auth/Login';
import Register from './components/front/Auth/Register';
import axios from 'axios';

import PublicRoute from './PublicRoute';

axios.defaults.baseURL="http://localhost:8000/"
axios.defaults.headers.post['Accept']='application/json';
axios.defaults.headers.post['Content-Type']='application/json';
axios.defaults.withCredentials=true;

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* */}
        
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login} />

          <Route path="/admin" name="Admin" render={(props)=><MasterLayout {...props} /> }/>
          <PublicRoute path="/" name="Home"/>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
