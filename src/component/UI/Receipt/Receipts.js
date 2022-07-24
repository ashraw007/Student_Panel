import React from 'react';
import Receipt from './Receipt/Receipt'
import classes from './Receipts.module.css';

class  Receipts extends React.Component{

      render() {
        return (
          <div className={classes.root}>
          {this.props.receiptData.map(receipt =>
            <Receipt key={receipt.receiptID} {...receipt} subjects={this.props.allowedSubjects}/>
          )}
          </div>
        )  
    }
  }


export default Receipts;