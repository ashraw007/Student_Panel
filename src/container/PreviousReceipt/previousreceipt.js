import React, { Component } from 'react';
import classes from './previousreceipt.module.css';
import PaperDesign from '../../component/UI/Paper/Paper';
import Receipt from '../../component/UI/Receipt/Receipts';
import Typography from '@material-ui/core/Typography';
import axios from '../../axios';
import Snackbar from '../../component/UI/snackbar/snackbar'


class PreviousReceipt extends Component {
    state = {
        receiptData: [],
        allowedSubjects: [],
        contentFailed: false,
        errorMessage: ''
    }
  
    componentDidMount = () => {

        if(this.state.receiptData.length === 0 ){
            axios.get("/api/student/fee/getAll", {withCredentials: true})
            .then(res => this.setState({receiptData: res.data.receipts, allowedSubjects: res.data.subjects}))
            .catch(err => {
                this.setState({contentFailed : true, errorMessage: err.errorMessage})
                setTimeout(()=>{
                    this.setState({contentFailed: false, errorMessage: '' })
                }, 3200)
            })
        }
    }

    render() {
        return (
            <div className={classes.Layout}>
                    <PaperDesign> 
                      <Typography variant="h2" align="center" gutterBottom>Receipts</Typography>
                      <Receipt receiptData={this.state.receiptData} allowedSubjects={this.state.allowedSubjects}/>
              </PaperDesign>
              {this.state.contentFailed === true ? <Snackbar message={this.state.errorMessage} type="warning" /> : null}
            </div>
        )
    }
  }

  export default PreviousReceipt;