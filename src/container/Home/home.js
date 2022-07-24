import React, {Component} from 'react';
import PaperDesign from '../../component/UI/Paper/Paper';
import Fee from '../../component/UI/SemesterExamFee/Fee';
import BackFee from '../../component/UI/BackExamFee/BackExam';
import PayButton from '../../component/UI/PayButton/PayButton';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import LateFee from '../../component/UI/LateFee/LateFee'
import axios from '../../axios';
import SnackBar from '../../component/UI/snackbar/snackbar'




class HomeLogin extends Component {
  
    state = {
        student: {},
        subjects: {},
        fees: {},
        contentFailed: false,
        selectedSubjects: [],
        examFee: 0,
        backExamFee: 0,
        lateFee: 0,
        errorMessage: ''
    }
    componentDidUpdate(){
        if(this.props.isBack === true){
            if(this.state.examFee > 0){
                this.setState({examFee: 0})
            }
        }else{
            if(this.state.examFee === 0){
                if(this.state.student.hasPaid === true){
                    return 0
                }
                this.setState({examFee: this.state.fees.normalFee})
            }
        }
    }

    componentDidMount(){
        const isStudent =  this.state.student && Object.keys(this.state.student).length === 0 && this.state.student.constructor === Object
        const isSubjects =  this.state.subjects && Object.keys(this.state.subjects).length === 0 && this.state.subjects.constructor === Object
        const isFee =   this.state.fees && Object.keys(this.state.fees).length === 0 && this.state.fees.constructor === Object   
        if(isStudent && isSubjects && isFee){
                axios.get('/api/student/get/',{withCredentials: true})
                .then(res=> {
                        res.data.subjects.forEach((sub,index) => {
                        let array = []
                        sub.subjects.forEach((subject)=>{
                          array.push({checked: false, name: subject})
                        })
                        res.data.subjects[index].subjects = array
                        })
                        let price = res.data.student.hasPaid === true ? 0 : res.data.fees.normalFee
           
                        if(this.props.isBack){
                            price = 0
                        }
                        //Checking for late fee
                        const now = Date.now()
                        const maxLateDate = new Date(res.data.fees.maxLateFeeDate).getTime()
                        const minLateDate = new Date(res.data.fees.minLateFeeDate).getTime()
                        const isLate = now >= maxLateDate? res.data.fees.maxLateFee : now >= minLateDate ? res.data.fees.minLateFee : 0
                        this.setState({student: res.data.student, subjects: res.data.subjects, fees: res.data.fees, examFee: price, lateFee: isLate})
                    })
                .catch(err => {
                    this.setState({contentFailed: true, errorMessage: err.errorMessage})
                    setTimeout(()=>{
                        this.setState({contentFailed: false, errorMessage: ''})
                    }, 3200)
                })  
            }
    }

    handleSubjectChange = (event, id) => {
        id = parseInt(id)
        const Subject = this.state.subjects.find((key) => key.semester === id);
        const sub = { ...Subject, subjects: [...Subject.subjects] };
        sub.subjects.forEach((subject) => {
            if (subject.name === event.target.name) {
                subject.checked = event.target.checked;
            }
        });
        let price = 0;
        this.state.subjects.forEach((keys) => {
            let checked = 0;
            keys.subjects.forEach((key) => {
                if (key.checked === true) {
                    checked = checked + 1;
                }
            });
            if (checked > 3) {
                price = price + this.state.fees.maxPerSemesterFee;
            } else {
                price = price + checked * this.state.fees.backExamFee ;
            }
        });

        let Ssubjects = { ...this.state.subjects };
        let updatedSu = [];
        for (const property in Ssubjects) {
            if (Ssubjects[property].semester === sub.semester) {
                Ssubjects[property] = sub;
                updatedSu.push(Ssubjects[property]);
            } else {
                updatedSu.push(Ssubjects[property]);
            }
        }

        let selectedBackExams = []

         updatedSu.forEach((subjects,index) => {
            const selectedSubjects = subjects.subjects.map(sub => {if(sub.checked === true){
                return sub.name
            }}).filter(subject => subject )
            if(selectedSubjects.length > 0){
                    const obj = {}
                    obj.semester = updatedSu[index].semester
                    obj.subjects = selectedSubjects
                    selectedBackExams.push(obj)
                }
            }
        )

        this.setState({ backExamFee: price, selectedSubjects: selectedBackExams });
    };




    render() {
        let title = this.props.isBack === true ? "Pay Back Exam" : "Pay Semester Fee" 
        let isSemester = this.props.isBack ? null : this.state.student.hasPaid === true ? null : <Fee semester={this.state.student.currentSemester} semesterFee={this.state.fees.normalFee}/>
        let semester = this.props.isBack ? null : this.state.student.currentSemester

        return (
            <PaperDesign> 
                <Typography align="center" variant="h4" >{title}</Typography>
                    {isSemester}
                    <BackFee subjects= {this.state.subjects || []} handleChange={this.handleSubjectChange} price={this.state.backExamFee}/>
                    <Box border={2} borderTop={0} borderRight={0} borderLeft={0} >
                    <LateFee 
                    minLateFeeDate={this.state.fees.minLateFeeDate}
                    maxLateFeeDate={this.state.fees.maxLateFeeDate}
                    minLateFee={this.state.fees.minLateFee}
                    maxLateFee={this.state.fees.maxLateFee}
                    lateFee={this.state.lateFee}
                    />
                    </Box>
                <PayButton
                    normalFee={this.state.examFee || 0}
                    backFee={this.state.backExamFee || 0}
                    lateFee={this.state.lateFee || 0}
                    semester={semester}
                    selectedSubjects={this.state.selectedSubjects}
                />
                {this.state.contentFailed ? <SnackBar message={this.state.errorMessage} type="warning" /> : null}  
            </PaperDesign> 
        )
    }
}

export default HomeLogin;