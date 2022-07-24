import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PaperDesign from '../Paper/Paper'
import classes from './ResetPassword.module.css'

   const ResetPassword = (props) => {
    return(

        <div className={classes.Layout}>
        <PaperDesign extraStyles={{zIndex: 2, margin:'2%'}}>
        <div className={classes.Padded}>
                <h1>Enter new password !</h1>
                <TextField
                required
                className={classes.Padded}
                id="filled-required"
                type="password"
                label="New password here"
                defaultValue={props.pwd}
                onChange={(event)=>{props.handlePwdChange(event.target.value)}}
                variant="filled"
                />
                <TextField
                required
                id="filled-required"
                label="Confirm password !"
                type="password"
                className={classes.Padded}
                defaultValue={props.confirmPwd}
                onChange={(event)=>{props.handleConfirmPwdChange(event.target.value)}}
                variant="filled"
                />
                <Button onClick={props.submit} variant="contained" color="secondary">
                    Change password
                </Button>
                </div>
                </PaperDesign>
                </div>
          
    )
   }

export default ResetPassword