import React, { Component } from 'react';
import axios from '../../axios'
import classes from './ResetPassword.module.css'
import ResetPasswordUI from '../../component/UI/ResetPassword/ResetPassword'
import {Redirect} from 'react-router-dom'
import Snackbar from '../../component/UI/snackbar/snackbar'

   class ResetPassword extends Component {
       state = {
           password: '',
           token: null,
           error: false,
           type: '',
           errorMessage: '',
           comfirmPassword: null,
       }

       handlePasswordChange = (value) => {
           this.setState({password: value })
       }

       handleConfirmPasswordChange = (value) => {
        this.setState({comfirmPassword: value })
        }

       componentDidMount(){
           if(!this.state.token){
            this.setState({token:this.props.match.params.id})
           }
       }

       updatePassword = (event) => {
           if(this.state.password.length < 7 || this.state.password === null){
                this.setState({error: true, errorMessage: 'Password Cannot be smaller than 7 characters', type: 'warning'})
                setTimeout(()=>{
                    this.setState({error: false, errorMessage: '', type: '' })
                }, 3200)
                return 0;
           }


           if(this.state.password !== this.state.comfirmPassword){
            this.setState({error: true, errorMessage: "Passwords didn't match", type: 'warning'})
            setTimeout(()=>{
                this.setState({error: false, errorMessage: '', type: '' })
            }, 3200)
            return 0;
            }

            axios.patch('/api/student/auth/resetpwd/' + encodeURI(this.state.token), {password: this.state.password})
            .then(res => {
                this.setState({error: true, errorMessage: 'Password Changed !', type: 'success'})
                setTimeout(()=>{
                    this.setState({error: false, errorMessage: '', type: '' })
                }, 3200)
            })
            .catch(err=> {
                this.setState({error: true, errorMessage: err.errorMessage, type: 'error'})
                setTimeout(()=>{
                    this.setState({error: false, errorMessage: '', type: '' })
                }, 3200)
            })
       }

   render(){
       return (
        <div className={classes.Container}>
        <div className={classes.Background}></div>  
        <div className={classes.Layout}>
        {this.state.changed === true ? <Redirect to="/"/> : null}
        <ResetPasswordUI
        submit= {this.updatePassword}
        pwd={this.state.password}
        confirmPwd={this.state.comfirmPassword}
        handlePwdChange={this.handlePasswordChange}
        handleConfirmPwdChange={this.handleConfirmPasswordChange}
        />
        </div>
        {this.state.error === true ? <Snackbar message = { this.state.errorMessage} type={this.state.type}/> : null }    
        </div>
        )
   }
}

export default ResetPassword