import classes from './FourOFour.module.css';
import { Button, Typography } from '@material-ui/core';
import React from 'react';
import {Redirect} from 'react-router-dom'


class FourOFour extends React.Component{
    state={
        clicked: false
    }

    clicked = () => {
        this.setState({clicked: true})
    }
    
    render(){
        let redirected = this.state.clicked === true ? <Redirect to="/" /> : null
        return(
            <div className={classes.F0F}>
            {redirected}
            <Typography variant="h3" align="center">Oops, You are here ! Doesnt seem a valid page !🤔</Typography>
           <Button className={classes.Button} onClick={this.clicked}><h4>Lets go to some that works ! click me😀 </h4> </Button>
           </div>
        )
    }
}


export default FourOFour