import React from 'react';
import Avatar from '../Avatar/Avatar';
import List from '@material-ui/core/List';
import IconList from './List/List';
import classes from './Lists.module.css'
import Cookie from 'js-cookie'

const listItems = [
    {
        label: "Home",
        icon: "HomeIcon",
        link: "/home"
    }, {
        label: "Back Exam Pay",
        icon: "AssignmentIcon",
        link: "/backExam-Pay"
    }, {
        label: "Previous Receipt",
        icon: "ReceiptIcon",
        link: "/previous-receipt"
    }, {
        label: "Notices",
        icon: "Notices",
        link: "/notices"
    }, {
        label: "Logout",
        icon: "ExitToAppIcon",
        link: "/logout"
    }
]

const Lists = (props) => {    
    return(
    <div style={{margin: "4%"}} >
    {props.children}
    <Avatar />
    <div className={classes.Name}>
    <h3>Welcome</h3>
    <h3>{Cookie.get('name').replace("%20", " ")}</h3>
    </div>
    
    
        <List >
         <IconList/>
            {listItems.map(list => {
                return (<IconList key={list.label} name={list.label} icon={list.icon} link={list.link}/>)
            })} 
        </List>
    </div>
)
}

export default Lists;