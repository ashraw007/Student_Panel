import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from '../../../axios'
import Snackbar from '../snackbar/snackbar'
import Logo from '../../../Assets/gtbpilogo.png'

const PayButton = (props) => {

    let [contentError, setContent] = React.useState(false);
    let [contentMessage, setMessage] = React.useState('')
    
    let [paymentSuccess, setSuccessBool] = React.useState(false);
    let [paymentSuccessMessage, setSuccessMessage] = React.useState('');

    const setSuccess = (message) => {
        setSuccessBool(paymentSuccess = true)
        setSuccessMessage(paymentSuccessMessage = message)
        setTimeout(()=>{
            setContent(paymentSuccess = false)
            setMessage(paymentSuccessMessage = '')
        }, 3000)
    }

    const setError = (message) => {
        setContent(contentError = true)
        setMessage(contentMessage = message)
        setTimeout(()=>{
            setContent(contentError = false)
            setMessage(contentMessage = '')
        }, 10000)
    }
    
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            setError("Razorpay SDK failed to load. Are you online?")
            return;
        }

        const data ={}
        if(props.semester){
            data.semester = props.semester
        }
        if(props.selectedSubjects){
            data.subjects = props.selectedSubjects
        }
        //  creating a new order
        const result = await axios.post("/api/student/fee/pay",data,{withCredentials: true}).then().catch(err => {
            setError(err.errorMessage)
        });

        if (!result) {
            setError("Server error. Are you online?")
            return;
        }

        // Getting the order details back
        const { amount, orderID, currency, notes } = result.data.savedReceipt;
        if(orderID === undefined){
            setError("Payment cant be proceded further ! Please dont make any transaction and contact collage ASAP ! any payment maid after this alert, collage would not be responsible ")
            return 
        }
        const prefill = result.data.student

        const desc = `From ${prefill.name},${prefill.rollNumber} For ${orderID} `
         
        const options = {
            key: "rzp_test_KOeC3sklK4ToCl", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: prefill.name,
            description: desc ,
            image: { Logo },
            order_id: orderID,
            handler: async function (response) {
                const data = {
                    order_id:response.razorpay_order_id,
                    success: {
                        razorpay_signature: response.razorpay_signature,
                        razorpay_payment_id: response.razorpay_payment_id
                    }

                };

                await axios.post("/api/student/fee/validate", data,
                { withCredentials: true}).then(response => {
                        if(response.data.isSuccess){
                            setSuccess("Payment went successfull !")
                        }
                }).catch(
                    err => {
                        setError(err.errorMessage)
                    }
                );

            },
                prefill:{
                    name: prefill.name,
                    email: prefill.email,
                    contact: prefill.phoneNumber
                },
                theme: {
                    color: "#11b7a2",
                },    
                notes:notes,
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

        paymentObject.on('payment.failed', async function (response){
            const data = {
                order_id: response.error.metadata.order_id,
                error: {
                    code: response.error.code,
                    decription:response.error.description,
                    source:response.error.source,
                    reason:response.error.reason,
                    payment_id:response.error.metadata.payment_id
                }
            };

            await axios.post("/api/student/fee/validate", data,
            { withCredentials: true}).then(response => {
                if(response.data.isSuccess){
                    setSuccess("Payment Failed !")
                }
                }).catch(
                    err => {
                        setError(err.errorMessage)
                    }
                );;

        })
    }

    const useStyles = makeStyles({
        root: {
            width: '100%',
            // maxWidth: 1400,
        },
        padding:{
            display:'flex',
            justifyContent:'space-between',
            padding: '1% 1.6%'
        }
    })

    const classes = useStyles();

    return (
       <Card className={classes.root}>
          <CardContent className={classes.padding}>
             <Typography variant="h6" gutterBottom>
                 To Be Paid
             </Typography>
             <Typography variant="h6" gutterBottom>
             ₹ {props.normalFee + props.backFee + props.lateFee}
         </Typography>
          </CardContent>  
          <CardActions style={{justifyContent: 'center'}}>
          <Button style={{backgroundColor: "#475BE3", borderRadius: 8, padding: "1% 3%", color:"white", margin:"1% 0% 2% 0%"}} variant="contained" onClick={displayRazorpay}>
            <Typography variant="h5">Pay Now</Typography>
          </Button>
          </CardActions> 
          {contentError === true ? <Snackbar message={contentMessage} type="error" time={10000}/> : null}
          {paymentSuccess === true ? <Snackbar message={paymentSuccessMessage} type="success" /> : null}      
       </Card>
    )
}

export default PayButton;