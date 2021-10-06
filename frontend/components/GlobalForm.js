import React,{useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import FirstForm from './FirstForm';
import SecondForm from './SecondForm';
import ThirdForm from './ThirdForm';
import { FormProvider, useForm,useFormContext } from 'react-hook-form'
import axios from 'axios'
import {useRouter} from 'next/router'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Admin Details', 'Entreprise Details', 'Review your status'];

function getStepContent(step,formContent,option,setOption ) {
  switch (step) {
    case 0:
      return <FirstForm {...{formContent}}/>;
    case 1:
      return <SecondForm {...{formContent}}  option={option} setOption={setOption}/>;
    case 2:
      return <ThirdForm {...{formContent}}/>;
    default:
      throw new Error('Unknown step');
  }
}


export default function GlobalForm() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [compiledForm, setCompiledForm] = React.useState({
    one: {},
    two: {  },
    three: {},
    option:""
  })
  const [option,setOption]=useState("")
  
  const onSubmit=(values)=>{
    setCompiledForm((prev)=>{
      return {
        ...prev,
        option:option
      }
    })
  }
  const { watch, errors, reset, setValue, getValues,handleSubmit } = useFormContext()
  const form = watch()
  const router=useRouter()

  const handleNext = async (data) => {


    if (activeStep===steps.length - 1 ){
      const resp=await axios.post('http://localhost:4000/auth/superAdmin',compiledForm,{withCredentials:true})
      if (resp.data){
        localStorage.setItem("user",JSON.stringify(resp.data.message))
        router.push('/admins')
      }
    }
    let canContinue = true
    switch (activeStep) {
      case 0:
        setCompiledForm({ ...compiledForm, one: form})
        canContinue = true
        break
      case 1:
        setCompiledForm({ ...compiledForm, two: form })
        canContinue = true
        break
      case 2:
        setCompiledForm({ ...compiledForm, three: form })
        canContinue = false
        break
      default:
        return 'not a valid step'
    }
    if (canContinue) {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prevActiveStep => prevActiveStep - 1)
      switch (activeStep) {
        case 1:
          setCompiledForm({ ...compiledForm, two: form })
          break
        case 2:
          setCompiledForm({ ...compiledForm, three: form })
          break
        default:
          return 'not a valid step'
      }
    }
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Admin Signup
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <form onSubmit={handleSubmit(handleNext)}>
                {getStepContent(activeStep,compiledForm,option,setOption)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    type="submit"
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </div>
                    </form>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}