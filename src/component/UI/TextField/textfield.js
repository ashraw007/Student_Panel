import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField} from '@material-ui/core';
import {ButtonSizes} from '../Button/button'
import {NavLink} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        width: '30ch',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',

      },
    },
    Fields:{
        width:'100%',
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        '& > *':{
            margin:'2% 0%'
        } 
    }
  }));

  export const BasicTextFields = (props) => {
 
    const classes = useStyles();
  
    return (
      <form className={classes.root} autoComplete="off">
        <div className={classes.Fields}>   
      <TextField required={true} value={props.id} onChange={props.changeId} id="outlined-basic" type="text" label="Roll Number" variant="outlined" />
        <TextField required={true} value={props.password} onChange={props.changePassword} id="outlined-basic" type="password" label="Password" variant="outlined" />
          <NavLink to="/forgot-password" style={{justifyContent: "flex-start", color: "blue", textDecoration: "none"}}>Forgot Password !</NavLink>
        <ButtonSizes Submit={props.Submit}></ButtonSizes>
        </div>
     
      </form>
    );
  }