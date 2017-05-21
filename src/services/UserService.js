import {updateUser, loginFailure, registrationFailure} from '../actions/UserActions'

class UserService{
  constructor(){
    this.isSubmitting = false
    this.baseUrl = 'http://localhost:4000'
  }

  submitRegistration(attributes){
    if(this.isSubmitting === false){
      this.isSubmitting = true
      const params = {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
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
      })
    }
  }  

  submitLogin(attributes){
    if(this.isSubmitting === false){
      this.isSubmitting = true
      //Stubbed
      setTimeout(()=>{
        updateUser({
          firstName: 'Bob',
          lastName: 'Bobber',
          email: 'bob@bobber.com',
          authToken: '111-222-333-444'
        })
        this.isSubmitting = false
      }, 1000)
    }
  } 

  submitBadLogin(){
    if(this.isSubmitting === false){
      this.isSubmitting = true
      //Stubbed
      setTimeout(()=>{
        loginFailure("Invalid credentials")
        this.isSubmitting = false
      }, 1000)
    }
  } 
}

const service = new UserService()
export default service 
