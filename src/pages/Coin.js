import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { getSingleCoin } from '../api/endpoints'
import { CryptoState } from '../CryptoContext'
import axios from 'axios'
import { Container, createTheme, Grid, makeStyles, Typography } from '@material-ui/core'
import Loader from '../components/Loader'
import Chart from '../components/Chart'
import CommentIcon from '@material-ui/icons/Comment';
import parse from 'html-react-parser';


import Sidebar from './../components/Sidebar';
import Favorite from './../components/Favorite';


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

const useStyles = makeStyles(()=>({
  coinName: {
    display: 'flex',
    gap:'1rem',
    marginBottom:'.4rem'
  }, 
  marketData:{
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  percentRed:{
    backgroundColor:'red',
    padding: '.3rem .6rem',
    borderRadius: '5px',
    
  },
  percentGreen:{
    backgroundColor:'green',
    padding: '.3rem .6rem',
    borderRadius: '5px'
  },
  rank:{
    backgroundColor: 'gold',
    padding:'.2rem .6rem',
    borderRadius: '5px',
    color:'black',
    marginRight:'.6rem',
  },
  category:{
    border: '1px solid white',
    padding:'.2rem .6rem',
    borderRadius: '5px',
    marginRight:'.6rem',
    color:'white',
    display: 'inline-block'
   
    

  },
  categoryWrapper:{
    display: 'flex',
    gap: '.6em',
    flexWrap: 'wrap',
    marginTop:'1rem'

  },
  wrapper:{    
    marginTop:'4rem',
   
  
  },
  wrapperContent:{
    display: 'flex',
    flexDirection: 'column',
    gap: '4rem',
    paddingRight: '2.5rem',
    //flexBasis: '78%'
  },
  description:{
    display: 'flex',
    gap: '1rem',
    marginTop: '1.8rem',
  
  },
  descBody:{
    maxHeight:'12rem',
    overflowY: 'scroll',
    borderRadius: '5px',
    padding:".5rem"

  }
  


}))

export default function Coin() {

  const classes = useStyles()

  const { id } = useParams()
  const [theCoin, setTheCoin] = useState()


  

  // console.log(theCoin?.categories)
  //console.log(theCoin)

  const filteredCat = theCoin?.categories?.filter(category => category)
//  console.log(filteredCat)

  const{currency, symbol} = CryptoState()
  

  const getCoinDetails = async() => {
    const {data} = await axios.get(getSingleCoin(id))
    setTheCoin(data)
  }

  useEffect(() => {
    getCoinDetails()
  }, [id])

  const numberWithCommas = x =>{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  
  if(!theCoin) return <Loader/>

  function nFormatter(num) {
    if (num >= 1000000000) {
       return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
       return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
       return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
}




  return (
   
      <Container >
        <Grid container className={classes.wrapper}>
          <Grid item xs={12} md={9} lg={9} className={classes.wrapperContent}> 
            <div >
              <div className={classes.coinName}>
                <img src={theCoin?.image?.thumb} alt={theCoin?.id} style={{width: '2rem',}}  />
                <Typography variant='h5'>
                    {theCoin?.name}
                </Typography>
              </div>
              <div className={classes.marketData}>
                <Typography variant='h2'>
                  {symbol}{numberWithCommas(theCoin?.market_data?.current_price[currency.toLowerCase()])}
                </Typography>
                
                <Typography 
                  variant='subtitle1' 
                  className={theCoin?.market_data?.price_change_percentage_24h_in_currency[currency.toLowerCase()] >= 0 ? classes.percentGreen : classes.percentRed} 
                >
                  {theCoin?.market_data?.price_change_percentage_24h_in_currency[currency.toLowerCase()] >= 0 && '+'} 
                  {theCoin?.market_data?.price_change_percentage_24h_in_currency[currency.toLowerCase()].toFixed(2) + '%'}
                </Typography>
                <Favorite theCoin={theCoin} />
                
              </div>
          {/* Category */}
              <div className={classes.categoryWrapper}>
                  <span className={classes.rank}>Rank {theCoin.coingecko_rank}</span>
                  {filteredCat.map(category =>(
                      <span className={classes.category} >
                         {category}
                      </span>
                  ))}
              
              </div>
              {/* Description */}
              {Object.values(theCoin?.description) !== '' && (
                <div className={classes.description}>
                    <CommentIcon style={{fontSize:'2.3rem'}}/>
                    <div className={classes.descBody}>
                      <Typography 
                        variant="body1">
                          {parse(theCoin?.description?.en)}
                      </Typography>
                    </div>
                </div>
              )}
              
            </div>
            <div className={classes.chart}>
              <Chart id={theCoin.id}/>
            </div>
      
          </Grid>
          <Grid item md={3} lg={3}>
             <Sidebar theCoin={theCoin}/>
          </Grid>
        </Grid>

      </Container>
   
  )
}
