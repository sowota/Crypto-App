import { Container, createTheme, InputAdornment, TextField, ThemeProvider, Typography } from '@material-ui/core'
import axios from 'axios'
import React,{useState, useEffect} from 'react'
import {get100Coins} from '../api/endpoints'
import { CryptoState } from '../CryptoContext'
import { makeStyles } from '@material-ui/styles'
import Coin from './../pages/Coin';
import CoinTable from './CoinTable'
import CloseIcon from '@material-ui/icons/Close';





export default function CoinList() {
  
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
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding:'1.5rem 0',
            flexWrap: 'wrap',
            gap:'1rem',
            [darkTheme.breakpoints.down('sm')]:{
                justifyContent: 'center',
            }
        }
    }))
    const classes = useStyles()

    const {currency, coins, isLoading, getCoinList} = CryptoState()

    
    const [searchInput, setSearchInput] = useState('')
    const [filteredSearch, setFilteredSearch] = useState([])

//     console.log(coins)
//     console.log(searchInput)

//    console.log(filteredSearch)
//    console.log()

    
       

     useEffect(() => {
        const filteredResults = coins?.filter(coin => coin.name.toLowerCase().includes(searchInput.toLowerCase()) || coin.id.toLowerCase().includes(searchInput.toLocaleLowerCase()))
        setFilteredSearch(filteredResults)
     },[searchInput])


    useEffect(() => {
        getCoinList()
    },[currency])

   

  return (
    <div>
        <ThemeProvider theme={darkTheme}>
            <Container>
                <div className={classes.container}>
                    <Typography variant="h5">
                        CryptoCurrency Price
                    </Typography>
                    <TextField
                        id="outlined-basic"
                        label="Search"
                        variant="outlined"
                        autoComplete='on'
                        onChange={e=>setSearchInput(e.target.value)}
                        style={{width:'35%', minWidth:'280px'}}
                       
                    />
                
                </div>
                <CoinTable isLoading={isLoading} coins={coins} searchInput={searchInput} filteredSearch={filteredSearch}  />

            </Container>
        </ThemeProvider>





    </div>
  )
}
