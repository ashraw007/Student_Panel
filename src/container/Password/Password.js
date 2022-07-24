import React, { Component } from 'react';
import ForgotPassword from '../../component/UI/ForgotPassword/ForgotPassword';
import classes from './Password.module.css';
import axios from '../../axios'
import Snackbar from '../../component/UI/snackbar/snackbar'

class Password extends Component {  

    state={
        rollNumber: '',
        showSnackbar : false,
        message : '',
        type: ''
    }

    rollNumberChangeHandler = (value) => {
        this.setState({rollNumber: value })
    }

    ResetPassword = ()=>{

        axios.post('/api/student/auth/resetpwd', { rollNumber: this.state.rollNumber})
        .then(res => {
            this.setState({showSnackbar: true, message: res.data.message, type: 'info' })
            setTimeout(()=>{
                this.setState({showSnackbar: false, message: '', type: '' })
            }, 3200)
        })
        .catch(err => {
            this.setState({showSnackbar: true, message: err.errorMessage, type: 'error' })
            setTimeout(()=>{
                this.setState({showSnackbar: false, message: '', type: '' })
            }, 3200)
        } )
    }

    render() {
        return(
            <div className={classes.Container}>
            <div className={classes.Background}></div>  
            <div className={classes.Layout}>
            <ForgotPassword 
                inputHandler={this.rollNumberChangeHandler} 
                value={this.state.rollNumber} 
                submit={this.ResetPassword}
                />
            {this.state.showSnackbar === true ? <Snackbar message={this.state.message} type={this.state.type}/> : null}
            </div>    
            </div>
        )
    }
}

export default Password