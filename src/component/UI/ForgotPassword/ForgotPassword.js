import React from 'react';
import {FormControl} from '@material-ui/core'; 
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CSS_Classes from './ForgotPassword.module.css'
import TextField from '@material-ui/core/TextField';
import PaperDesign from '../../UI/Paper/Paper'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '60%',
    },
    margin: {
      margin: theme.spacing(1),
      width:'100%',
    },
    width:{
        width:'100%'
    }
  }));

const ForgotPassword = (props) => {
    const classes = useStyles();

    return (
     
        <div className={`${classes.root}, ${CSS_Classes.Min}`}>
        <PaperDesign extraStyles={{zIndex: 2, padding: '8%' }}>
          <form >
            <FormControl className={classes.margin}>
              <Typography variant="h5" style={{fontWeight: 'bold'}}>Change Account Password</Typography>
              <Grid container spacing={1} alignItems="flex-end">

                <Grid item className={classes.width}>
                  <TextField value={props.value} onChange={(event) => {props.inputHandler(event.target.value)}} id="input-with-icon-grid" fullWidth  label="Your RollNumber " />
                </Grid>
              </Grid>
            </FormControl>
          </form>
          <div style={{display:'flex', width:'100%', justifyContent:'center'}}>
          <Button variant="contained" onClick={props.submit} color="primary" style={{borderRadius: 4}}>Reset Password</Button>
          </div>  
          </PaperDesign>
          </div>
 
    )
}

export default ForgotPassword;