import {EventEmitter} from 'events'
import Dispatcher from '../Dispatcher'
import UserService from '../services/UserService'

class LoginStore extends EventEmitter{
  constructor(){
    super()
    this.fields = {
      email:'',
      password:''
    }
    this.errors = {}
  }

  getFields(){
    return this.fields
  }

  getErrors(){
    return this.errors
    
  }

  validate(){
    this.errors = {}
    this.validatePresence('password')
    this.validatePresence('email')
  }

  validatePresence(fieldName){
    if(this.fields[fieldName] === ''){
      this.addError(fieldName, 'is Required')
    }
  }

  addError(fieldName, message){
    this.errors[fieldName] = message
  }

  updateLogin(attribute, value){
    this.fields[attribute] = value
    this.emit('change')
  }

  submitLogin(){
    this.validate()
    if(Object.keys(this.errors).length === 0){
      UserService.submitLogin(this.fields)
    }

    this.emit('change')
  }

  handleFailure(message){
    this.addError("general", message)
    this.emit('change')
  }

  clearFields(){
    this.errors = {}
    this.fields = {}
    this.emit('change')
  }

  handleActions(action){
    switch(action.type){
      case("UPDATE_LOGIN"):{
        this.updateLogin(action.attribute, action.value)
        break
      }

      case("LOGIN_SUBMIT"):{
        this.submitLogin()
        break
      }

      case("LOGIN_FAILURE"):{
        this.handleFailure(action.message)
        break
      }

      case("UPDATE_USER"):{
        this.clearFields()
        break
      }

      default:{}
    }
  }
}

const store = new LoginStore()
Dispatcher.register(store.handleActions.bind(store))
export default store
