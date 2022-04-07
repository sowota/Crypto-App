import { AppBar, Container, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import {makeStyles} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'
import AuthModal from './AuthModal'
import TemporaryDrawer from './Drawer';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';
import Home from './../pages/Home';


export default function Header() {

    const{currency, setCurrency, user} = CryptoState()
    // console.log(currency)

    // console.log(user)

    const darkTheme = createTheme({
        palette:{
            primary:{
                main:'#fff'
            },
            type:'dark',
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

    const useStyles = makeStyles((darkTheme)=>({
        title:{
            flex:2,
            color:'gold',
            cursor:'pointer',
            fontWeight:'bold',
            
        },
        toolbar:{
            display:'flex',
            justifyContent: 'space-between',
        },
        headerRight:{
            display:'flex',
            gap:'1.5rem',
            alignItems: 'center',
        },

        navItem:{
            color:'white',
            "&:hover":{
                color:'gold',
            },
        },

    
      
        tablet:{
            display:'none',
            gap:'1.5rem',
            alignItems: 'center',
            [darkTheme.breakpoints.up('sm')]: {
                display:'flex'
            },
        },

        mobile:{
            [darkTheme.breakpoints.up('sm')]: {
                display:'none'
            },
        },
      

    }))

    const classes = useStyles()


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

  return (
      <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position='static'>
            <Container>
                <Toolbar className={classes.toolbar}>
                    <Link to='/'>
                        <Typography variant='h5' className={classes.title}>CryptoCoins</Typography>
                    </Link>
                    

                    <div className={classes.headerRight}>
                        <nav className={classes.mobile}>
                            <Button 
                                aria-controls="fade-menu" 
                                aria-haspopup="true" 
                                onClick={handleClick}
                            >
                                <MenuRoundedIcon/>
                            </Button>

                            <Menu
                                id="fade-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                TransitionComponent={Fade}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Link  to='/'>
                                        Home
                                    </Link>
                                    
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Link to='/cointable'>
                                        Crypto Prices
                                    </Link>
                                </MenuItem>

                                <Select
                                    variant="outlined"
                                    style={{width: 100, height:40, marginLeft:15, marginBottom:'.5rem', marginTop:'.5rem'}}
                                    value={currency}
                                    onChange={e=>setCurrency(e.target.value)}
                                >
                                    <MenuItem value={'USD'}>USD</MenuItem>
                                    <MenuItem value={'JPY'}>JPY</MenuItem>
                                    <MenuItem  value={'EUR'}>EUR</MenuItem>
                                </Select>

                                <MenuItem>
                                    {user ? <TemporaryDrawer /> : <AuthModal/>}
                                </MenuItem>
                               
                            </Menu>
                        </nav>
                        <nav className={classes.tablet}>
                            <Link to='/'>
                                <Typography variant='h6' className={classes.navItem} >
                                    Home
                                </Typography>
                            </Link>
                            <Link to='/cointable'>
                                <Typography variant='h6' className={classes.navItem} >
                                    Crypto Prices
                                </Typography>
                            </Link>

                            <Select
                            variant="outlined"
                            style={{width: 100, height:40, marginLeft:15}}
                            value={currency}
                            onChange={e=>setCurrency(e.target.value)}
                            className={classes.currency}
                        >
                                <MenuItem value={'USD'}>USD</MenuItem>
                                <MenuItem value={'JPY'}>JPY</MenuItem>
                                <MenuItem  value={'EUR'}>EUR</MenuItem>
                            </Select>
                            <div className={classes.user}>
                                {user ? <TemporaryDrawer /> : <AuthModal/>}
                            </div>
                        </nav>
                        
                      
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
      </ThemeProvider>
  )
}
