import React from 'react'
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import classes from './Receipt.module.css'
import Modal from '@material-ui/core/Modal';
import ChangeSubject from './ChangeSubject/ChangeSubject'
import moment from 'moment'
import axios from '../../../../axios'
import Snackbar from '../../snackbar/snackbar'

class Receipt extends React.Component{
    state = {
        modalState: false,
        error: false
   }  

   openModal = () => {
        this.setState({modalState: true})
    }

    closeModal = () =>{
        this.setState({modalState: false})
    }

    download = (e) => {
        axios.post('/api/student/fee/generate',{receiptID: this.props.receiptID} ,{withCredentials: true, responseType: 'blob'})
        .then(res =>  {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'receipt.pdf');
            document.body.appendChild(link);
            link.click();
        }).catch(err => {
            this.setState({error: true, errorMessage :'Cant generate receipt PDF !'})
            setTimeout(() => {
                this.setState({error: false, errorMessage : ''})
            },3200);
        })
    }

   render(){

        let date = moment.utc(new Date(this.props.date).getTime()).toDate()
        date = moment(date).local().format('DD-MM-YYYY') 

        let semester = ""
        const backExams = []
        const backExamNames = []
        this.props.notes.forEach(note => {
            if(note.includes("for Semester :")){
                if(this.props.notes.length > 1){
                    semester= ` ${note} and Back Exams`
                }else{
                    semester = `${note}`
                }
            }else{
                if(note.includes("for back semester :") && this.props.notes.length === 1){
                    semester = "For back exam only"
                    const semAndSubjects = note.split("and")
                    let subjects = semAndSubjects[1].split(",")
                    subjects.forEach(subject => {
                        backExamNames.push(subject.replace('subjects : ', ''))
                    } )
                    subjects = subjects.map(sub => <Typography>{sub}</Typography>)
                    const typo = (
                        <div>
                        <Typography>{semAndSubjects[0]}</Typography>
                        {subjects}
                        </div>
                        )
                        backExams.push(typo)
                }else if(note.includes("for back semester :")){
                    const semAndSubjects = note.split("and")
                    let subjects = semAndSubjects[1].split(",")
                    subjects = subjects.map(sub => <Typography>{sub}</Typography>)
                    const typo = (
                        <div>
                        <Typography>{semAndSubjects[0]}</Typography>
                        {subjects}
                        </div>
                        )
                        backExamNames.push(semAndSubjects[1].replace('subjects : ', ''))
                        backExams.push(typo)
                }
            }
        })

        const body = (
            <ChangeSubject receipt={this.props.receiptID} close={this.closeModal} backExams={backExamNames} availableSubjects={this.props.subjects}/>
        )
    
       return(
        <Accordion>
        <Box className={classes.boxColor} marginTop="20px">
         <AccordionSummary
         expandIcon={<ExpandMoreIcon />}
         aria-controls="panel1c-content"
         id="panel1c-header"
          classes={{
              content: classes.display
          }}
         >
         <div className={classes.row}>
          <Typography className={classes.heading}>For Semester: {this.props.semester}</Typography>
          <Typography className={classes.heading}>ID: {this.props.receiptID}</Typography>
          <Typography className={classes.heading}>Dated: {date}</Typography>
          </div>
         </AccordionSummary>
        </Box>
        
        <Box className={classes.boxExpanded}>
        <AccordionDetails style={{display:'flex', flexDirection: 'column', flexWrap:'wrap'}}>
        <div className={classes.lowerColumn}>
        <div className={classes.padded}>   
            <Typography >{semester}</Typography>
           <Typography>amount: Rs. {this.props.amount / 100} </Typography>
           <Typography>Valid: {this.props.isValid === true ? "Yes" : "No" }</Typography>
        </div>
        <div className={classes.padded}>  
           <Typography>Selected Back Exams:</Typography>
           {backExams}
        </div>
        </div>
        <br/>

        <div className={classes.Buttons}>   

        <Button id={this.props.receiptID}  style={{boderRadius: 10, margin:'10px'}} variant="contained" color="secondary" onClick={(e) => {this.download(e)}}>
        DOWNLOAD RECEIPT
        </Button>   
        <Button  style={{boderRadius: 10, margin:'10px'}} variant="contained" color="secondary" onClick={this.openModal} >
            CHANGE SUBJECT
            </Button> 
        </div>
        
        
        </AccordionDetails>
        </Box>

        <Modal
            open={this.state.modalState}
            onClose={this.closeModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
        {this.state.error === true ? <Snackbar message={this.state.errorMessage} type="error" /> : null}
        </Accordion>
        
       )
   }
 
}


export default Receipt