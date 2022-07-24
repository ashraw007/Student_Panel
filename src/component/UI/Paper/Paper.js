import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const PaperDesign = (props) => {

    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          width : props.isNotWidth ? null :"100%",
          minWidth: props.isNotWidth ? props.width :"100%",
          justifyContent:"center",
          '& > *': {
            margin: theme.spacing(1),
            width: '100%',
            height: '100%',
            ...props.extraStyles
          },
        },
      }));
      


    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={23}> 
                {props.children}
            </Paper>
        </div>
    );
}

export default PaperDesign;
