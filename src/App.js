import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './routes/Home'
import UserDetail from './routes/UserDetail'
import UserRegistration from './routes/UserRegistration'
import Login from './routes/Login'


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <div className='container'>
            <div className='row'>
              <div className='col-xs-6 col-xs-offset-3'>
                <Route 
                  exact 
                  path="/" 
                  component={Home}
                />
                <Route
                  path="/register"
                  component={UserRegistration} 
                />
                <Route
                  path="/user-detail"
                  component={UserDetail}
                />
                <Route
                  path="/login"
                  component={Login}
                />
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
