import React from 'react';
import {BrowserRouter as Router,Redirect,Route,Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import MasterLayout from './layouts/admin/MasterLayout';
import Home from './components/front/Home';
import Login from './components/front/Auth/Login';
import Register from './components/front/Auth/Register';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login} />
          <Route path="/admin" name="Admin" render={(props)=><MasterLayout {...props} /> }/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
