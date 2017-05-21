import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import UserStore from './stores/UserStore'
import Header from './components/Header'
import Home from './routes/Home'
import UserDetail from './routes/UserDetail'
import UserRegistration from './routes/UserRegistration'
import Login from './routes/Login'
import {logout} from './actions/UserActions'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {}
    this.checkLogin = this.checkLogin.bind(this)
  }

  componentWillMount(){
    UserStore.on('change', this.checkLogin)
  }

  componentWillUnmount(){
    UserStore.removeListener('change', this.checkLogin)
  }

  checkLogin(){
    this.setState({loggedIn: UserStore.isLoggedIn()})
  }

  handleLogout(){
    logout()
  }

  render() {
    return (
      <Router>
        <div>
          <Header 
            loggedIn={this.state.loggedIn} 
            logout={this.handleLogout}
          />
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
                  render={()=>(
                    this.state.loggedIn ? (
                      <Redirect to='/' />
                    ) : (
                      <UserRegistration />
                    )
                  )}
                />
                <Route
                  path="/user-detail"
                  render={()=>(
                    this.state.loggedIn ? (
                      <UserDetail />
                    ) : (
                      <Redirect to='/login' />
                    )
                  )}
                />
                <Route
                  path="/login"
                  render={()=>(
                    this.state.loggedIn ? (
                      <Redirect to="/" />
                    ) : (
                      <Login />
                    )
                  )}
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
