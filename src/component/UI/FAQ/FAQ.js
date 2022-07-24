import { Typography } from '@material-ui/core';
import React from 'react';
import classes from './FAQ.module.css'
import QuesAndAns from './Ques/Ques'
import ques from './FAQData'

const FAQ = (props) => (
    <React.Fragment>
    <Typography variant="h2" align="center" style={{fontFamily: "'Roboto', sans-serif", fontWeight: 800}}>FAQ !</Typography>
    <Typography variant="h6" align="center">Use ctrl+f / Find</Typography>
    <div className={classes.FAQ}>
     { ques.map((que,index) =>  <QuesAndAns key={index} que={que.que} ans={que.ans}/>) }
    </div>
    </React.Fragment>
)

export default FAQ