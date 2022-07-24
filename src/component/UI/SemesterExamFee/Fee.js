import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';


  const SemesterFee = (props) => {

    const useStyles = makeStyles({
        root: {
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          
        },
        fee: {
            padding: '1% 1.6%', 
            display: 'flex',
            width:'100%',
            flexWrap:'wrap',
            justifyContent:'space-between'
        }
      });
    
      const classes = useStyles();

      return (
           <Box className={classes.root}>
            <CardContent classes={{root:classes.fee}}>
                    <Typography variant='h6'>
                        Semester {props.semester} Exam Fee       
                    </Typography>
                    <Typography variant="h6">
                        ₹ {props.semesterFee || 0}
                    </Typography>
            </CardContent>
           </Box>
      )
  }


  export default SemesterFee;