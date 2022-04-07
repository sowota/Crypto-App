import React from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { createTheme,ThemeProvider, Typography } from '@material-ui/core';

import GoogleButton from 'react-google-button'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {auth} from "../firebase.config"


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(6),
    borderRadius:'5px'
  },
  indicator: {
    backgroundColor:'gold',
  }
}));

export default function AuthModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const darkTheme = createTheme({
    palette:{
        primary: {
            main:'#fff'
        },
        type:'dark'
    },
   
})

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //GoogleAuth
  const provider = new GoogleAuthProvider();

  const signInWithGoogle= ()=>{
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    }).catch((error) => {
        console.error(error.message)
    })
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Button 
      variant='contained' 
      onClick={handleOpen}
      style={{width:85, height:40, backgroundColor: 'gold', fontWeight: 'bold'}}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography variant="h5" style={{color: 'white', textAlign: 'center', marginBottom:'2rem'}}>
              Sign in
            </Typography>
                <GoogleButton onClick={signInWithGoogle}>
                </GoogleButton>
          </div>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
}