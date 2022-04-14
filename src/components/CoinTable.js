import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, createTheme, ThemeProvider } from '@material-ui/core'
import React,{useState} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import {CryptoState} from '../CryptoContext'
import { makeStyles } from '@material-ui/styles';
import {Pagination} from '@material-ui/lab'
import {useNavigate } from 'react-router-dom';



const useStyles = makeStyles(()=>({
    tableRow: {
        cursor: 'pointer',
        "&:hover": {
            backgroundColor: '#131111'
        },
      
    },

    tableCell:{ 
      display: 'flex',
      alignItems: 'center',
      gap:'1rem',
      minWidth:'200px'
     

    },
    pagination:{
        "&.MuiPaginationItem-page":{
            backgroundColor:'gold',
        }
    },
    pWrapper:{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        padding:'2rem'
        
    },
    loader:{
        width: '100%',
        height:'10rem',
        display:'grid',
        placeItems:'center'
    },
    tableWrapper:{
         width: '100%',
        overflowX: 'scroll'
    },
    table: {
        //minWidth: '768px',
        //overflowX: 'scroll'
    }

}))




export default function CoinTable({isLoading, coins, searchInput, filteredSearch}) {

    //console.log(filteredSearch)
   


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

    const navigate = useNavigate()

    const classes = useStyles()

    const[page, setPage] =useState(1)
    // console.log(coins)
    // console.log(filteredSearch)
 
    const{symbol} = CryptoState()


    const numberWithCommas = x =>{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }
  return (
    <ThemeProvider theme={darkTheme}>
        <TableContainer className={classes.tableWrapper}>
            {isLoading ? 
            <div className={classes.loader}>
                <CircularProgress style={{color: 'gold'}}/>
            </div>
            :     
            <Table className={classes.table}>
                <TableHead style={{backgroundColor:'gold', }}>
                    {['Rank', 'Coin', 'Market Cap.', 'Price', 'Change(24h)'].map((head, i) =>(
                        <TableCell
                        style={{color:'black', fontWeight:'bold', fontSize:'1.3rem',  }}
                        key={i}
                        align='left' 
                        >
                            {head}
                        </TableCell>
                    ))}
                </TableHead>
                <TableBody>
                        {filteredSearch?.length > 0 ?  
                            filteredSearch.slice((page - 1)* 20, (page -1) * 20 + 20).map(coin => (
                                <TableRow 
                                key={coin.id} 
                                className={classes.tableRow}
                                onClick={()=>navigate(`/coins/${coin.id}`)}
                                >
                                    <TableCell
                                        component='th'
                                        scope='row'
                                        style={{fontSize:'1rem',}}
                                        align='left' 
                                    >{coin.market_cap_rank}
                                    </TableCell>
                                    <TableCell 
                                        align='left' 
                                        className={classes.tableCell}
                                    >
                                        
                                            <img src={coin.image} style={{width:'1.5rem'}} alt={coin.name}/>
                                            {coin.name}
                                        
                                    </TableCell>
                                    <TableCell  style={{fontSize:'1rem', minWidth:'145px'}} align='left'  >
                                        {symbol} {numberWithCommas(coin.market_cap).toString().slice(0,-6) + ' M'}
                                    </TableCell>
                                    <TableCell   style={{fontSize:'1rem', minWidth:'170px'}} align='left' >
                                        {symbol} {numberWithCommas(coin.current_price)}
                                    </TableCell>
                                
                                    <TableCell style={{color:coin.price_change_percentage_24h >=0 ? 'rgb(14, 203, 129' : 'red', fontWeight:'bold', fontSize:'1rem'}} align='left' >
                                    {coin.price_change_percentage_24h.toFixed(2) >=0 && '+'}{coin.price_change_percentage_24h.toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            ))

                        : 
    // No filer
                        coins.slice((page - 1)* 20, (page -1) * 20 + 20).map(coin =>  (
                            
                            <TableRow 
                                key={coin.id} 
                                className={classes.tableRow}
                                onClick={()=>navigate(`/coins/${coin.id}`)}
                            >
                                <TableCell 
                                    component="th" 
                                    scope="row" 
                                    style={{fontSize:'1rem', }} 
                                    align='left' 
                                >
                                    {coin.market_cap_rank}
                                </TableCell>

                                <TableCell 
                                    align='left' 
                                    style={{fontSize:'1rem',}}
                                    className={classes.tableCell}
                                >
                                    
                                
                                            <img src={coin.image} style={{width:'1.7rem'}} alt={coin.name}/>
                                            {coin.name}
                                    
                                </TableCell>
                                <TableCell  style={{fontSize:'1rem', minWidth:'145px', }} align='left' >
                                    {symbol} {numberWithCommas(coin.market_cap).toString().slice(0,-6) + ' M'}
                                </TableCell>
                                <TableCell  style={{fontSize:'1rem', minWidth:'170px'}} align='left' >
                                    {symbol} {numberWithCommas(coin.current_price)}
                                </TableCell>
                            
                                <TableCell style={{color:coin.price_change_percentage_24h >=0 ? 'rgb(14, 203, 129' : 'red', fontWeight:'bold', fontSize:'1rem'}}
                                align='left' 
                                >
                                {coin.price_change_percentage_24h.toFixed(2) >=0 && '+'}{coin.price_change_percentage_24h.toFixed(2)}
                                </TableCell>
                            
                            
                            </TableRow>
                        ))}
                </TableBody>
            
            </Table>
        
            }

        </TableContainer>
        <Pagination 
            className={classes.pWrapper}
            count={filteredSearch.length > 0? (filteredSearch.length/20).toFixed(0) : (coins.length/20).toFixed(0) }
            onChange={(e,value) => {setPage(value); window.scroll(0, 450)}}
            style={{li:classes.pagination}}
            
        />

    </ThemeProvider>
  )
}
