import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import MenuIcon  from '@material-ui/icons/Menu';
import { AccountCircle } from '@material-ui/icons';
import Avatar from '../Avatar/Avatar';

const MenuAppbar = (props) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2)
        },
        appBarSettings: {
            height: '12vh',
            justifyContent: 'space-between'
        },
        appBarIconSettings: {
            fontSize: '7vh',
            color: 'black'
        },
        appBarColor: {
            background: 'white'
        },
        ProfileImage:{
            borderRadius: '50%',
            width:"40%",
            right:"2%"
        },
        fixImage:{
            display:'flex',
            justifyContent:'flex-end'
        }
    }
    ));

    const classes = useStyles();

    const profileDefault = (
        <IconButton>
        <AccountCircle className={classes.appBarIconSettings}/>
        </IconButton>
    )

    const profileImage = localStorage.getItem("image") !== "null" ?
    <Avatar />   
    :
    profileDefault

    return (
        <div className={classes.root} >
            <AppBar className={classes.appBarColor} position="static" >
               <Toolbar className={classes.appBarSettings}>
                   <IconButton onClick={props.drawerOpenhandler} edge="start" className={classes.menuButton} aria-label="Burger Menu">
                       <MenuIcon className={classes.appBarIconSettings}/>
                   </IconButton>
                   <div className={classes.fixImage}>
                        {profileImage}
                   </div>
               </Toolbar>
            </AppBar>
        </div>
    )

}

export default MenuAppbar;