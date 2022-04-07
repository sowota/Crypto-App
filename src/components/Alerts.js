import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { CryptoState } from '../CryptoContext';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Alerts() {
  const classes = useStyles();
  const {alert, setAlert} = CryptoState()

  const handleClick = () => {
    setAlert({open:true});
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({open:false});
  };

  return (
    <div className={classes.root}>
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert 
          onClose={handleClose} 
          severity={alert.severity}
          variant="filled"
        >
          {alert.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}