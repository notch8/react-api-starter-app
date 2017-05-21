import {EventEmitter} from 'events'
import Dispatcher from '../Dispatcher'
import UserService from '../services/UserService'

class RegistrationStore extends EventEmitter{
  constructor(){
    super()
    this.fields = {
      firstName:'',
      lastName:'',
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
    this.validatePresence('firstName')
    this.validatePresence('lastName')
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

  updateField(attribute, value){
    this.fields[attribute] = value
    this.emit('change')
  }

  submitRegistration(){
    this.validate()
    if(Object.keys(this.errors).length === 0){
      UserService.submitRegistration(this.fields)
    }
    this.emit('change')
  }

  handleServerError(message, errors){
    this.errors = errors
    this.emit('change')
  }

  clearFields(){
    this.errors = {}
    this.fields = {}
    this.emit('change')
  }

  handleActions(action){
    switch(action.type){
      case("UPDATE_REGISTRATION"):{
        this.updateField(action.attribute, action.value)
        break
      }
      case("REGISTRATION_SUBMIT"):{
        this.submitRegistration()
        break
      }

      case("REGISTRATION_FAILURE"):{
        this.handleServerError(action.message, action.errors)
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

const store = new RegistrationStore()
Dispatcher.register(store.handleActions.bind(store))
export default store
