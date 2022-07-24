import React from 'react';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    Center:{
        display:'flex',
        width:'100%',
        justifyContent:'center'
    }
  }));

export const ButtonSizes = (props) => {
  const classes = useStyles();
  return (
      <div className={classes.Center}>
        <Button variant="contained" size="large" color="primary" className={classes.margin} 
        onClick={props.Submit}>
          login
        </Button>
      </div>
  )
}