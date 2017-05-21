import {updateUser, loginFailure} from '../actions/UserActions'

class UserService{
  constructor(){
    this.isSubmitting = false
  }

  submitRegistration(attributes){
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
