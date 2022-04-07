import React from 'react'
import Popover from '@material-ui/core/Popover';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import { CryptoState } from '../CryptoContext';
import Alert from '@material-ui/lab/Alert';




export default function Favorite({theCoin}) {
    const{user, watchlist, setAlert} = CryptoState()

    //console.log(user)

    const inWatchlist = watchlist.includes(theCoin?.id)
    //console.log(inWatchlist)
    

    const useStyles = makeStyles((theme) => ({
        popover: {
          pointerEvents: 'none',
        },
        paper: {
          padding: theme.spacing(1),
        },
        star:{
            fontSize:'2rem',
            '&:hover':{
                cursor: 'pointer',
                color:'gold',  
            },
            color:inWatchlist? 'gold': ''
        }
        
      }));


    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    

    const addToWatchlist = async ()=>{
        const coinRef= doc(db, 'watchlist', user.uid)

        try{
            await setDoc(coinRef,{
                coins:watchlist ? [...watchlist, theCoin?.id] : [theCoin?.id]
            },
            {
              marge:'true'
            })

            setAlert({
              open:true,
              severity:'success',
              message:'Saved to watchlist !',
            })
        }catch(error){
            console.log(error.message)
        }
    }

    const removeFromWatch = async() =>{

      const coinRef= doc(db, 'watchlist', user.uid)

        try{
            await setDoc(coinRef,{
                coins:watchlist.filter(list => list !== theCoin?.id)
            })

            setAlert({
              open:true,
              message:'Removed from watchlist', 
              severity:'info'
            })
        }catch(error){
            console.log(error.message)
        }
      
    }

    const handleWatchlist = () =>{
      if(user === null){
        setAlert({
          open:true,
          message:'Log in to save to watchlist', 
          severity:'info'
        })
        return
      }

      if(!inWatchlist){
        addToWatchlist()
      }else{
        removeFromWatch()
      }
    }

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div>
        <StarBorderIcon
                  aria-owns={open ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  className={classes.star}
                  onClick={handleWatchlist}
        />
        <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'right',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>
          {inWatchlist? 'Remove from WatchList' :'Add to Watchlist'}
        </Typography>
      </Popover>
    </div>
  )
}
