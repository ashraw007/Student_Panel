import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import PaperDesign from '../../../Paper/Paper';
import CSSClasses from  './ChangeSubject.module.css'
import axios from '../../../../../axios'
import { Button } from '@material-ui/core';
import Snackbar from '../../../snackbar/snackbar'

const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 120,
      width:'100%'
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    to:{
        margin: '1% 0%'
    },
  }));
  

const ChangeSubject = (props) => {
    
    const classes = useStyles();
    const [subjectFrom, setFrom] = React.useState('');
    const [subjectTo, setTo] = React.useState('');

    const [decision, setDecision] = React.useState({showModal: false, message: '', type: ''})

    const showModalToggler = (message,type) => {
        setDecision({showModal: true, message: message, type: type})
        setTimeout(() => {
            setDecision({showModal: false, message: '', type: ''})
        }, 3200);
    }

    const handleChangeFrom = (event) => {
        setFrom(event.target.value);
      };

      const handleChangeTo = (event) => {
        setTo(event.target.value);
      };

      let availableSubjects = []
        props.availableSubjects.forEach(subjects => {
          subjects.subjects.map(subject =>  availableSubjects.push(subject))
      })

      const requestChange = () => {
          if(subjectFrom === "" || subjectTo === "") {
                return 0
        }
        axios.post('/api/student/request/', {
            receiptID: props.receipt,
            subjectFrom : subjectFrom,
            subjectTo: subjectTo
        },{withCredentials: true}).then(res => {
            if(res.data.isSuccess === true){
                showModalToggler("Request received !", "success")
            }
        }).catch(err => { showModalToggler( err.errorMessage, "error")})
      }


    return(
        <div className={CSSClasses.Modal}>
        <PaperDesign extraStyles={{padding: '2%'}}>
        <Typography variant="h3" align="center">Change Subjects</Typography>
        <div className={CSSClasses.Subjects}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Subject From</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    fullWidth={true}
                    required={true}
                    value={subjectFrom}
                    onChange={handleChangeFrom}
                    label="Subject From"
                    >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    {props.backExams.map(backExam => (<MenuItem key={backExam} value={backExam} >{backExam}</MenuItem>))}
                    </Select>
            </FormControl>
            <Typography variant="h6" align="center" className={classes.to}>TO</Typography>
            <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Subject To</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                fullWidth={true}
                value={subjectTo}
                required={true}
                onChange={handleChangeTo}
                label="Subject To"
                >
                <MenuItem value="">
                <em>None</em>
                </MenuItem>
                {availableSubjects.map(subject => <MenuItem key={subject}  value={subject} ><em>{subject}</em></MenuItem>)}
                </Select>
        </FormControl>
            </div>
            <div className={CSSClasses.Buttons}>
            <Button fullWidth className={CSSClasses.Button} onClick={requestChange}>Request Change</Button>
            <Button fullWidth className={CSSClasses.Button} onClick={props.close}>Close</Button>
            </div>
            </PaperDesign>
            {decision.showModal === true ? <Snackbar message={decision.message} type={decision.type} /> : null}
        </div>
    )
}
    

export default ChangeSubject