import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {getCoins} from '../api/endpoints'
import { CryptoState } from '../CryptoContext'
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import { makeStyles } from '@material-ui/styles';
import '../App.css'
import { Link } from 'react-router-dom';


const useStyles = makeStyles(()=>({
  img:{
    width:'80%',
    height:'80%',
    objectFit:'cover'
  },
  container:{
    height:'auto',
    width:'120px',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    textTransform:'uppercase',
    rowGap:'.8rem'
  },
  wrapper:{
    flexGrow:1,
    marginBottom:'2.5rem'
  },
  symbol: {
    color:'white',


  },
  details: {
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
  }

}))


export default function CarouselSlider() {

  const classes = useStyles()

    const {currency, symbol} = CryptoState()
    const[trendingCoins, setTrendingCoins] = useState([])

    //console.log(trendingCoins)


    const getTrendingCoings = async() => {
        const {data} = await axios.get(getCoins(currency))
        setTrendingCoins(data)
    }

    useEffect(()=>{
        getTrendingCoings()
    }, [currency])


    const responsive = {
      0:{
        items:2
      },
      512:{
        items:3
      },
      650:{
        items:4
      },
      950:{
        items:6
      }
    }
    
    const numberWithCommas = x =>{
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    



  return (
    <div className={classes.wrapper}>
      <AliceCarousel mouseTracking infinite autoPlayInterval={2000} animationDuration={1500} disableDotsControls responsive={responsive} autoPlay >
        {trendingCoins.map(coin => (
          <Link className={classes.container} to={`/coins/${coin.id}`} key={coin.id}>
              <img src={coin.image} className={classes.img} alt={coin.id}/>
              <div className={classes.details}>
                <p className={classes.symbol}>{coin.symbol}</p>
                <p style={{color:coin.price_change_percentage_24h >=0 ? 'rgb(14, 203, 129' : 'red', fontWeight:'bold'}}>{coin.price_change_percentage_24h >=0 && '+'}{coin.price_change_percentage_24h}</p>
                <p>{symbol} {numberWithCommas(coin.current_price.toFixed(2))}</p>
              </div>
          </Link>
        ))}
      </AliceCarousel>
    </div>
  )
}
