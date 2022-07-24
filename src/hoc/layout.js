import React, {Component} from 'react';
import AppBar from '../component/UI/Appbar/Appbar';
import Drawer  from "../component/UI/Drawer/Drawer";
import classes from '../App.module.css'
import Home from '../container/Home/home';
import Logout from '../../src/container/Logout/logout';
import PreviousReceipt from '../../src/container/PreviousReceipt/previousreceipt';
import Notices from '../../src/container/Notices/notices';
import {Route, Switch} from 'react-router-dom';
import FourOFour from '../utils/404/FourOFour'
import PaperDesign from '../component/UI/Paper/Paper';



class Layout extends Component {
    state= {
      isDrawerOpen: false,
      imageChanged: false,
    }

    onDrawerOpenHandler = () => {
      this.setState({isDrawerOpen: true})
    }
  
    onDrawerCloseHandler = () => {
      this.setState({isDrawerOpen: false})
    }

    componentDidMount(){
        if(!localStorage.getItem("image") || localStorage.getItem("image") === "null"){
            const image = prompt("Enter Url for profile picture (optional)", "Some-Image-Url")
            if(image !== "Some-Image-Url"){
            localStorage.setItem("image",image)
            this.setState({imageChanged: true})
            }
        }
    }

    render(){
        const routes = (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/backExam-Pay" render={(props)=>
                    <Home isBack={true}/>} />
                <Route exact path="/previous-receipt" component={PreviousReceipt}/>
                <Route exact path="/notices" component={Notices} />     
                <Route exact path="/logout" component={Logout}/>
                <Route component={FourOFour} />
            </Switch>
        ) 

        return (
            <div className={classes.root}>
                <AppBar drawerOpenhandler={this.onDrawerOpenHandler} />   
                <Drawer DrawerOpen={this.state.isDrawerOpen} drawerCloseHandler={this.onDrawerCloseHandler}/>
                <PaperDesign extraStyles={{minHeight:'86vh', background: '#475be3'}} elevation={3}>
                {routes} 
                </PaperDesign>
            </div>
        );
    }
}

export default Layout;
