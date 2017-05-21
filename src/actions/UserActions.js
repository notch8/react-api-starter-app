import Dispatcher from '../Dispatcher'

export function updateRegistration(attribute, value){
  Dispatcher.dispatch({
    type: 'UPDATE_REGISTRATION',
    attribute: attribute,
    value: value
  })
}
export function submitRegistration(userAttributes){
  Dispatcher.dispatch({
    type: 'REGISTRATION_SUBMIT'
  })
}

export function registrationFail(errors){
  Dispatcher.dispatch({
    type: 'REGISTRATION_FAILED',
    errors: errors
  })
}

export function updateLogin(attribute, value){
  Dispatcher.dispatch({
    type: 'UPDATE_LOGIN',
    attribute: attribute,
    value: value
  })
}

export function submitLogin(loginAttributes){
  Dispatcher.dispatch({
    type: 'LOGIN_SUBMIT'
  })
}

export function loginFail(){
  Dispatcher.dispatch({
    type: 'LOGIN_FAILED'
  })
}

export function logout(){
  Dispatcher.dispatch({
    type: 'LOGOUT'
  })
}

export function updateUser(attributes){
  Dispatcher.dispatch({
    type: 'UPDATE_USER',
    attributes: attributes
  })
}
