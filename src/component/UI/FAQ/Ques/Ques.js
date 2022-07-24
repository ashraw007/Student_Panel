import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      margin: "1% 0%",
      backgroundColor: "#D0D0D0"
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    Que: {
      fontSize: 25,
      fontFamily: "Inconsolata",
      fontWeight:600

    },
    Ans: {
        fontSize: 20,
        fontFamily: "Inconsolata",
        fontWeight:400
  
      },
    pos: {
      marginBottom: 12,
    },
  });


  const QuesAndAns = (props) => {
      
    const classes = useStyles();

        const Q = `Q. ${props.que}`
        const A = `A. ${props.ans}`
      return (
        <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.Que} gutterBottom>
            {Q}
          </Typography>
          <Typography className={classes.Ans} component="h2">
            {A}
          </Typography>
          </CardContent>
          </Card>
      )
  }


export default QuesAndAns