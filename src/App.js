import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import Header from './components/Header'
import Home from './routes/Home'
import UserDetail from './routes/UserDetail'
import UserRegistration from './routes/UserRegistration'
import Login from './routes/Login'
import UserStore from './stores/UserStore'
import {logout} from './actions/UserActions'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {}
    this.updateLoginStatus = this.updateLoginStatus.bind(this)
  }

  componentWillMount(){
    UserStore.on('change', this.updateLoginStatus)
  }

  componentWillUnmount(){
    UserStore.removeListener('change', this.updateLoginStatus)
  }

  updateLoginStatus(){
    this.setState({isLoggedIn: UserStore.isLoggedIn()})
  }

  handleLogout(){
    logout()
  }

  render() {
    return (
      <Router>
        <div>
          <Header 
            isLoggedIn={this.state.isLoggedIn}
            handleLogout={this.handleLogout}
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
                    this.state.isLoggedIn ? (
                      <Redirect to='/' />
                    ) : (
                      <UserRegistration />
                    )
                  )}
                />
                <Route
                  path="/user-detail"
                  component={UserDetail}
                />
                <Route
                  path="/login"
                  render={()=>(
                    this.state.isLoggedIn ? (
                      <Redirect to='/' />
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
