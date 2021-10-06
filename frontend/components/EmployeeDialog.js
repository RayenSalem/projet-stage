import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useForm } from 'react-hook-form';
import axios from 'axios'

export default function EmployeeDialog({handleClickOpen,handleClose,open,setRows,user}) {

    const {handleSubmit,register}=useForm()
    const onSubmit=async (data)=>{
        const res=await axios.post(`http://localhost:4000/admins/employees/${user.belongsTo}`,data)
        if (res){
        setRows((rows)=>[...rows,res.data.message])
        handleClose()
        }
    }
  return (
    <div>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Form Modal</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>

        <DialogContent style={{width:'600px'}}>
          <DialogContentText>
           Submit your data
          </DialogContentText>
          <TextField
            autoFocus
            inputRef={register}
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
          />

            <TextField
            autoFocus
            inputRef={register}
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
          />
           <TextField
            autoFocus
            inputRef={register}
            margin="dense"
            name="nom"
            label="First Name"
            fullWidth
          />

            <TextField
            autoFocus
            margin="dense"
            name="prenom"
            inputRef={register}
            label="Last Name"
            fullWidth
          />


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button  color="primary" type="submit">
            Submit
          </Button>
        </DialogActions>
        </form>

      </Dialog>
    </div>
  );
}