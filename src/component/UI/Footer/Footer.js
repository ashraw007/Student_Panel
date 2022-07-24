import React from 'react';
import classes from './Footer.module.css'
import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import {  NavLink } from 'react-router-dom';


const Footer = (props) => {
    let toggleFAQ =  <Typography variant="h6"  ><NavLink className={classes.Links} to="/FAQ">FAQ</NavLink></Typography>
    if(props.location.pathname === "/FAQ"){
        toggleFAQ =  <Typography variant="h6"  ><NavLink  className={classes.Links} to="/">Login</NavLink></Typography>
    }
    return(
    <BottomNavigation className={classes.Footer}>
        <div className={classes.FooterLayout}>
            <div className={classes.MadeBy}>
                <Typography align="center">Made by</Typography>
                <Typography align="center">  <a  className={`${classes.Links}, ${classes.Names}`} rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/ashish-rawat-2226a7197/">Ashish Singh Rawat </a> & <a className={`${classes.Links}, ${classes.Names}`} rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/garvitvij/">Garvit Vij</a></Typography>
                </div><div>
               {toggleFAQ}
                </div></div>
        </BottomNavigation>
        )
    }

export default Footer