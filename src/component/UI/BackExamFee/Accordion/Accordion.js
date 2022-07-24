import React from 'react';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const CustomAccordion = (props) => {

    const useStyles = makeStyles((theme) => ({
        root: {
        },
        color: {
          backgroundColor: 'lightgreen',
        },
        heading: {
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between'
        }
      }));

      const classes = useStyles();

      return(
          <Card className={classes.root} variant="outlined">
            <Box border={2} borderLeft={0} borderRight={0}>
              <CardContent>
              <div className={classes.heading}> 
                <Typography variant="h6" gutterBottom>
                   {props.heading}
                </Typography> 
                <Typography variant="h6" gutterBottom>
                ₹ {props.price || 0}
                </Typography> 
              </div>
                   <Box>
                    <Accordion className={classes.color}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >  
                      <Typography className={classes.heading}>Select Subjects from drop-down</Typography>
                      </AccordionSummary>   
                      <AccordionDetails>
                        <Typography variant="h5" gutterBottom>
                           {props.children}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                   </Box> 
              </CardContent>        
            </Box>  
          </Card>
      )
}

export default CustomAccordion;
