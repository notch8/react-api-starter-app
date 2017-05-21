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

export function registrationFailure(message, errors){
  Dispatcher.dispatch({
    type: 'REGISTRATION_FAILURE',
    message: message,
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

export function updateUser(attributes){
  Dispatcher.dispatch({
    type: 'UPDATE_USER',
    attributes: attributes 
  })
}

export function loginFailure(message){
  Dispatcher.dispatch({
    type: 'LOGIN_FAILURE',
    message: message
  })
}

export function logout(){
  Dispatcher.dispatch({
    type: 'LOGOUT'
  })
}
