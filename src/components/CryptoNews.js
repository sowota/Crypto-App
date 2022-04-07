import { Container, createTheme, Grid, Paper, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {news} from '../api/endpoints'
import { makeStyles } from '@material-ui/styles';
import alt from '../img/altForNoPic.jpg'
import { CryptoState } from '../CryptoContext';
import {mainNews} from '../constant/mainNews'

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

const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        display:'flex',
        flexDirection: 'column',
        gap:'.7rem' ,
        backgroundColor:'#242424',
        color:'#FFFFFF',
        borderRadius: '5px',
        height: '100%',
        "&:hover":{
            filter:'brightness(.8)',
        },
        

    },
    paper2:{
        display:'flex',
        flexDirection: 'column',
        backgroundColor:'#242424',
        color:'#FFFFFF',
        borderRadius: '5px',
        [darkTheme.breakpoints.up('md')]: {
            flexDirection: 'row'
          },
        "&:hover":{
            filter:'brightness(.9)',
        }
       
    },
    mainContent: {
        padding:'1rem 1.8rem',
        display:'flex',
        flexDirection: 'column',
        gap:'.8rem' ,
    },

    content2:{
        display:'flex',
        flexDirection: 'column',
        padding:".7rem 1.8rem",
        gap:'.8rem' ,
        [darkTheme.breakpoints.up('md')]: {
            width:'65%'
        }

       
    },
    date:{
        color:'#bfbfbf',
    },
    title: {
        fontWeight:'bold',
    },
    smallTitle: {
        fontWeight:'bold',
        maxHeight:'72px',
        lineClamp: "3",
        textOverflow: "ellipsis",
        boxOrient: "vertical",
        display:'box',
        overflow: "hidden",

    },
    image:{
        width:'100%', 
        maxHeight:'400px',
        borderTopLeftRadius:'5px', 
        borderTopRightRadius:'5px'
    },
    image2: {
        width:'100%', 
        //maxHeight:'250px',
        overflow:'hidden',
        borderTopLeftRadius:'5px', 
        borderTopRightRadius:'5px',
        [darkTheme.breakpoints.up('md')]: {
            width:'35%',
            height:'140px',
          
            borderTopRightRadius:'0',
            borderBottomLeftRadius:'5px'
          },

    },
    newsContainer:{
        //width: '100%',
       // maxWidth: '60%',
        marginRight: '1rem'
    },
    secContainer:{
        //width: '100%',
        //maxWidth:'40%'
    }
  }));


export default function CryptoNews() {
    const{getCoinList} = CryptoState()
    const [latestNews, setLatestNews, currency] = useState([])
    //console.log(mainNews);

    const [num, setNum] = useState(5)

    const classes = useStyles()

    // const getAllNews = async()=>{
    //      const {data} = await axios.get(news())
    //      console.log(data)
         
    //      const allNews = data.articles
    //      setLatestNews(allNews)

    // }

    // useEffect(() => {
    //     getAllNews()
        
    // }, [])

    useEffect(() => {
        getCoinList()
    }, [currency])

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-us', {year:'numeric', month:'short', day:'numeric'})
    }

    // Get random multiple news
    const getMultiRandomNews = (arr, num) =>{
        const shuffled = [...arr].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, num)
    }



  return (
    <Container>
        <Typography variant="h3" style={{margin:'4rem 0'}}>Latest News</Typography>

        <Grid container spacing={6} wrap='wrap' direction='row'>
{/*Main-left  */}
            {getMultiRandomNews(mainNews, 1).map((news, i) =>(
                <Grid item xs={12} key={i} md={6} >
                    <a href={news?.url} target="_blank" rel="noopener noreferrer">
                        <Paper className={classes.paper}>
                        
                            <img 
                                src={news?.urlToImage } 
                                alt='news' 
                                className={classes.image} 
                                loading='lazy'  
                            />
                        
                            <div className={classes.mainContent}>
                                <Typography component='h3' variant='h5' className={classes.title}>
                                    {news?.title}
                                </Typography>
                                <Typography component='p'  variant='body1'>
                                    {news?.description}
                                </Typography>
                                <Typography variant='body2' className={classes.date}>
                                        {formatDate(news?.publishedAt)}
                                </Typography>
                            </div>
                        </Paper>
                    </a>
                </Grid>
            ))}
{/*Main-right  */}
           <Grid item container xs={12} md={6} spacing={3}>
                {getMultiRandomNews(mainNews, 5).map((news, i)=>(
                    <Grid item xs={12} md={12} key={i}  >
                        <a href={news?.url || alt} target="_blank" 
                        rel="noopener noreferrer">
                            <Paper className={classes.paper2}>
                            
                                <div className={classes.image2}>
                                    <img 
                                        src={news?.urlToImage || alt}
                                        loading='lazy'
                                        style={{width: '100%', height:'100%', maxHeight: '400px',   objectFit:'cover',}} alt='news'
                                    />
                                </div>
                                <div className={classes.content2}>
                                    <Typography variant='body1'className={classes.smallTitle}>
                                        {news?.title}
                                    </Typography>
                                    <Typography variant='body2' className={classes.date}>
                                        {formatDate(news?.publishedAt)}
                                    </Typography>
                                </div>
                            </Paper>
                        </a>
                    </Grid>
                ))}

           </Grid>
       
          
      </Grid>
    </Container>
  )
}
