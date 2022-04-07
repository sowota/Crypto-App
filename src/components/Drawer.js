import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Avatar from '@material-ui/core/Avatar';
import {Typography, createTheme} from '@material-ui/core'
import { auth } from '../firebase.config';
import { signOut } from 'firebase/auth';
import { CryptoState } from '../CryptoContext';
import { Link } from 'react-router-dom';

const darkTheme = createTheme({
  palette:{
      primary: {
          main:'#fff'
      },
      type:'dark'
  },
  breakpoints:{
      values:{
          xs: 375,
          sm: 425,
          md: 768,
          lg: 1280,
          xl: 1920,
      }
  }
})

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  container:{
      width:300,
      [darkTheme.breakpoints.up('sm')]:{
        width:350,
      },
      
      padding:25,
      height:'100%',
      display: 'flex',
      flexDirection: 'column',
    
  },
  profile: {
      flex:1,
      display: 'flex',
      flexDirection:'column',
      alignItems: 'center',
      gap:'1.2rem',
      height:'92%' 
  },
  pic:{
      width:'5rem',
      height:'5rem',
      cursor:'pointer',
      backgroundColor:'gold',
      objectFit:'contain' 
    },
  logOut:{
      border:'1px solid',
      marginTop:'3rem',
      '&:hover':{
          backgroundColor:'gold',
          color:'black',
      }
  },
    favorites:{
        border:'1px solid',
        width:'100%',
        height:'100%',
        borderRadius:'5px',
        display:'flex',
        flexDirection:'column',
        overflowY:'scroll',
        "&::-webkit-scrollbar-track":{
          backgroundColor:'transparaent',
        },
        "&::-webkit-scrollbar-thumb":{
          backgroundColor:'white',
        }
    },

    
    watchingCoins:{
      marginTop:'1rem',
      display:'flex',
      flexDirection:'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap:'1rem', 


    }
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const{user, watchlist, coins} =CryptoState()
  //console.log(watchlist)
   //console.log(coins)

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{backgroundColor:'#000000'}}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List >
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const logOut = () => {
    signOut(auth);
    toggleDrawer()
  }

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar onClick={toggleDrawer(anchor, true)} style={{cursor: 'pointer'}}  src={user?.photoURL} >
          </Avatar>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} >
              <div className={classes.container}>
                  <div className={classes.profile}>
                      <Avatar
                            className={classes.pic}
                            src={user?.photoURL}       
                      >
                      </Avatar>
                      <Typography variant="body1">
                          {user?.email}
                      </Typography>
                      <Typography variant='h6' style={{justifySelf: 'center', alignSelf: 'center',paddingTop: '1rem'}}>
                                WatchList
                      </Typography>
                      <div className={classes.favorites}>
                            
                            <div className={classes.watchingCoins}>
                             
                              {coins.map(coin => {
                                if(watchlist.includes(coin.id))
                                  return (
                                    <Link 
                                      to={`/coins/${coin.id}`} 
                                      key={coin.id} 
                                      onClick={toggleDrawer(anchor, false)}
                                    >
                                      <Typography variant='body1'>
                                        {coin.name}
                                      </Typography>
                                    </Link>
                                   )
                              
                              })}
                   
                                
                            </div>
                      </div>
                  </div>
                  <Button
                    variant='outlined'
                    className={classes.logOut}
                    onClick={logOut}
                    size='medium'
                  >
                      Log Out
                  </Button>
              </div>

          
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
