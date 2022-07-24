import React, {Component} from 'react';
import classes from './notices.module.css';
import PaperDesign from '../../component/UI/Paper/Paper';
import axios from '../../axios'
import Accordion from '../../component/UI/Accordion/Accordion'
import { Typography } from '@material-ui/core';
import Snackbar from '../../component/UI/snackbar/snackbar'

class Notices extends Component {

    state={
        notices: [],
        contentFailed : false,
        errorMessage: ''
    }

    componentDidMount(){
        if(this.state.notices.length === 0){
            axios.get('/api/student/get/notices', {withCredentials: true})
            .then(res => {this.setState({notices: res.data.notices})})
            .catch(err => {
                this.setState({contentFailed : true, errorMessage: err.errorMessage})
                setTimeout(()=>{
                    this.setState({contentFailed: false, errorMessage: '' })
                }, 3200)
            })
        }
      
    }

    render () {
        return (
            <div  className={classes.Layout}>
                <PaperDesign extraStyles={{padding: '1%'}}>
                <Typography align="center" variant="h2">Notices</Typography>
                <div className={classes.Notices}>
                {this.state.notices.map((notice,index)=> {
                    const title = notice.title === '' ? 'Empty Notice' : notice.title 
                    const desc = notice.desc === '' ? 'Empty Description' : notice.desc
                    return(<div key={index} className={classes.Accordion}>
                    <Accordion panel={index} heading={title} description={desc}/>
                    </div>)
                    })}
                </div>
                </PaperDesign>
                {this.state.contentFailed === true ? <Snackbar message={this.state.errorMessage} type="warning" /> : null}
            </div>
        )
    }
}

export default Notices