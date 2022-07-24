import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { makeStyles } from '@material-ui/core/styles';
import {NavLink} from 'react-router-dom';

   const IconList = (props) => {

    let Icon = null
        
    Icon = props.icon === "HomeIcon" ? <HomeIcon /> : props.icon === "AssignmentIcon" ? <AssignmentIcon /> : props.icon === "ReceiptIcon" ? <ReceiptIcon /> : props.icon === "ExitToAppIcon" ? <ExitToAppIcon /> : props.icon === "Notices" ? <EventNoteIcon/> : null

    const useStyles = makeStyles((theme) => ({
        Color: {
            color: "black",
        },
        Link: {
            textDecoration: 'none',
        }
      }));

    const classes = useStyles();


    return (
       <NavLink to={`${props.link}`} activeClassName={classes.Link} className={classes.Link}>
        <ListItem button>
        <ListItemIcon className={classes.Color}>
           {Icon}
        </ListItemIcon>
        <ListItemText className={classes.Color} primary={props.name} />
        </ListItem>
       </NavLink>
    )
   
   }

export default IconList;   