import React,{useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { useFieldArray, useForm, useFormContext } from 'react-hook-form'

function FirstForm({formContent}){


  const methods = useFormContext()

  const { register, errors, watch, reset, getValues, control,handleSubmit } = methods
  
  useEffect(() => {
    reset({ ...formContent.one }, { errors: true })
  }, [])
  

  return (
    
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="nom"
            inputRef={register}
            label="First name"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="prenom"
            inputRef={register}
            label="Last name"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="email"
            inputRef={register}
            label="Email"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            name="password"
            inputRef={register}
            label="Password"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="address"
            inputRef={register}
            label="Address line"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
        <TextField
            name="matricule"
            inputRef={register}
            label="Matricule fiscale"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="desc"
            inputRef={register}
            label="Description De l'activite"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="nomentreprise"
            inputRef={register}
            name="numEntreprise"
            label="Numero de telephone (Fix)"
            fullWidth
          />
        </Grid>
        
      </Grid>
      </React.Fragment>
    )

}


export default FirstForm