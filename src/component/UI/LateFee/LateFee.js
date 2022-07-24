import React, {Component} from 'react';
import moment from 'moment'
import Typography from '@material-ui/core/Typography';
import classes from './lateFee.module.css'


class LateFee extends Component{
    render(){
        let price = this.props.lateFee
        let desc = "No late Fees"
    
        const localMin = moment.utc(new Date(this.props.minLateFeeDate).getTime()).toDate()
        const localMax = moment.utc(new Date(this.props.maxLateFeeDate).getTime()).toDate()
    
        if(price === this.props.minLateFee){
            desc = `Last date to pay was ${moment(localMin).local().format('DD-MM-YYYY')}`
        }else if (price === this.props.maxLateFee ){
            desc = `Last date Exceeded, last date to pay was ${moment(localMax).local().format('DD-MM-YYYY')}`
        }
    
        return(
            <div className={classes.LateFee}>
                <Typography variant="h6">{desc}</Typography>
                <Typography variant="h6">₹{price}</Typography>
           </div>
        )
    }
}

export default LateFee