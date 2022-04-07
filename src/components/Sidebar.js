import { Button, CardActions, createTheme, Typography } from '@material-ui/core'
import React from 'react'
import { CryptoState } from '../CryptoContext'
import { makeStyles } from '@material-ui/styles'
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import LinkIcon from '@material-ui/icons/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
import RedditIcon from '@material-ui/icons/Reddit';
import {ThemeProvider} from '@material-ui/core'


const useStyles = makeStyles(()=>({
    sidebar: {
        paddingLeft:'3rem',
        marginBottom:'5rem',
        [darkTheme.breakpoints.down('md')]:{
          padding:'0'
        }
        
    },
    border:{
        margin:'1.8rem 0'
    },
    link:{
        display:'flex',
        width:'100%',
        flexDirection:'column',
        gap:'.5rem',
        alignItems:'start',
        [darkTheme.breakpoints.down('md')]:{
            flexDirection:'row',
            flexWrap:'wrap'
        }
    },
    data:{
        display:'flex',
        flexDirection:'column',
        gap:'.5rem',
        [darkTheme.breakpoints.down('md')]:{
            flexDirection:'row',
            alignItems: 'center',
            gap:'2.5rem'
        }
        
        
    }
}))

const darkTheme = createTheme({
    palette:{
        primary: {
            main:'#fff'
        },
        type:'dark',
        breakpoints:{
            values:{
                xs: 375,
                sm: 425,
                md: 768,
                lg: 1280,
                xl: 1920,
            }
        }
    }
})

export default function Sidebar({theCoin}) {

    const classes = useStyles()
    const {symbol, currency} = CryptoState()
    //console.log(currency)

    const numberWithCommas = x =>{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }
    // Num formatter 
      function nFormatter(num) {
        if (num >= 1000000000) {
           return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
        }
        if (num >= 1000000) {
           return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
           return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
    }

    function yenFormatter(num) {
        if (num >= 1000000000) {
           return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + '億';
        }
        if (num >= 1000000) {
           return (num / 1000000).toFixed(1).replace(/\.0$/, '') + '百';
        }
        if (num >= 1000) {
           return (num / 1000).toFixed(1).replace(/\.0$/, '') + '千';
        }
        return num;
    }







  return (
      <ThemeProvider theme={darkTheme}>
            <div className={classes.sidebar}>
                <div className={classes.data} >
                    <div >
                        <Typography>
                            Market Cap
                        </Typography>
                    </div>
                    <div >
                        <Typography variant='h4'>
                            {symbol} {currency === 'USD' || currency === 'EUR'? nFormatter(theCoin?.market_data?.market_cap[currency.toLowerCase()]): currency === 'JPY' ? yenFormatter(theCoin?.market_data?.market_cap[currency.toLowerCase()]): numberWithCommas(theCoin?.market_data?.market_cap[currency.toLowerCase()])  }
                        </Typography>
                    </div>
                </div>
                <div className={classes.data} >
                    <Typography>
                        Volume
                    </Typography>
                    <Typography variant='h4'>
                        {symbol} {currency === 'USD' || currency === 'EUR'? nFormatter(theCoin?.market_data?.total_volume[currency.toLowerCase()]): currency === 'JPY' ? yenFormatter(theCoin?.market_data?.total_volume[currency.toLowerCase()]) : numberWithCommas(theCoin?.market_data?.total_volume[currency.toLowerCase()]) }
                    </Typography>
                </div>
                <hr className={classes.border} />
                <div className={classes.link}>
                    <Button size="big"  onClick={() => window.open(theCoin.links?.homepage[0], '_blank')} style={{color: 'white', }}
                    
                    >
                        <OpenInNewIcon style={{marginRight:'1.5rem'}}/>
                        Home Page
                    </Button>
                    <Button size="small" onClick={() => window.open(theCoin?.links?.blockchain_site[0], '_blank')} style={{color: 'white', }}>
                        <LinkIcon style={{marginRight:'1.5rem'}} />
                        blockchain
                    </Button>
                    <Button size="small" onClick={() => window.open(theCoin?.links?.repos_url?.github[0], '_blank')} style={{color: 'white'}}>
                        <GitHubIcon style={{marginRight:'1.5rem'}} />
                        github
                    </Button>
                    <Button size="small" onClick={() => window.open(theCoin?.links?.subreddit_url, '_blank')} style={{color: 'white'}}>
                        <RedditIcon style={{marginRight:'1.5rem'}} />
                        reddit
                    </Button>
            </div>
            </div>
      </ThemeProvider>
  )
}
