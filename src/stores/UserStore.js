import {EventEmitter} from 'events'
import Dispatcher from '../Dispatcher'

class UserStore extends EventEmitter{
  constructor(){
    super()
    this.fields = {}
  }

  getFields(){
    return this.fields
  }

  updateUser(attributes){
    this.fields = attributes
    this.emit('change')
  }

  clearUser(){
    this.fields = {}
    this.emit('change')
  }

  isLoggedIn(){
    return this.fields.authToken != null
  }

  handleActions(action){
    switch(action.type){
      case("UPDATE_USER"):{
        this.updateUser(action.attributes)
        break
      }

      case("LOGOUT"):{
        this.clearUser()
        break
      }
      default:{}
    }
  }
}

const store = new UserStore()
Dispatcher.register(store.handleActions.bind(store))
window.store = store
export default store
