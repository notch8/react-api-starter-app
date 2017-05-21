import {updateUser, loginFailure, registrationFailure} from '../actions/UserActions'

class UserService{
  constructor(){
    this.isSubmitting = false
    this.baseUrl = 'http://localhost:4000'
    this.headers = {
      'Content-Type': 'application/json'
    }

  }

  submitRegistration(attributes){
    if(this.isSubmitting === false){
      this.isSubmitting = true
      const params = {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(attributes)
      }
      fetch(`${this.baseUrl}/users`, params).then((response)=>{
        this.isSubmitting = false
        if(response.ok){
          response.json().then((attributes)=>{
            updateUser(attributes.user)
          })
        }else{
          response.json().then((error)=>{
            const mappedErrors = {}
            error.errors.forEach((error)=>{
              mappedErrors[error.path] = error.message
            })
            registrationFailure(error.message, mappedErrors)
          })
        }
      }).catch(()=>{
        this.isSubmitting = false
      })
    }
  }  

  submitLogin(attributes){
    if(this.isSubmitting === false){
      this.isSubmitting = true
      const params = {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(attributes)
      }
      fetch(`${this.baseUrl}/login`, params).then((response)=>{
        this.isSubmitting = false
        if(response.ok){
          response.json().then((attributes)=>{
            updateUser(attributes.user)
          })
        }else{
          response.json().then((error)=>{
            loginFailure(error.message)
          })
        }
      }).catch(()=>{
        this.isSubmitting = false
      })
    }
  } 
}

const service = new UserService()
export default service 
