import { Button, Container, createTheme, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { moreNews } from '../api/endpoints'
import alt from '../img/altForNoPic.jpg'
import {moreNew} from '../constant/moreNews'


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
    image2: {
        width:'100%', 
        maxHeight:'400px',
        overflow:'hidden',
        borderTopLeftRadius:'5px', 
        borderTopRightRadius:'5px',
        [darkTheme.breakpoints.up('md')]: {
            width:'35%',
            height:'280px',
            
            borderTopRightRadius:'0',
            borderBottomLeftRadius:'5px'
          },

    },
    content2:{
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding:"1rem 1.8rem",
        gap:'.8rem' ,
        [darkTheme.breakpoints.up('md')]: {
            width:'65%'
        }

       
    },
    date:{
        color:'#bfbfbf',
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
    logOut:{
       
        color:'black',
        border:'1px solid',
        marginTop:'3rem',
        backgroundColor:'gold',
        fontWeight:'bold',
       '&:hover':{
           backgroundColor:'transparent',
           color:'white',
           border:'2px solid gold'
       }
    },
    btnWrapper: {
        display: 'flex',
        justifyContent: 'center',
        paddingBottom:'4rem'
    },
    source:{
        border: '1px solid white',
        justifySelf: 'left',
        alignSelf:'flex-end',
        padding:'.3rem 1rem',
        borderRadius:'30px',
        color:'#bfbfbf',
        borderColor:'#bfbfbf'
        
    }


}))

export default function MoreNews() {

    const classes = useStyles();

    const [news, setNews] = useState([])
    const [pageNum, setPageNum] = useState(1)
    //console.log(news)

    const [numOfNews, setNumOfNews] = useState(5)

    const handleLoadMore = () => {
        //setPageNum(prevPage => prevPage + 1)
        setNumOfNews(prevPage => prevPage + 5)
    }
    

    // const getMoreNews = async() => {
    //     const {data} = await axios.get(moreNews(pageNum))
    //     const additionalNews = data.articles
    //     console.log(additionalNews)
    //     setNews(prevNews=> [...prevNews, ...additionalNews])
    // }

    // useEffect(() => {
    //     getMoreNews()
    // },[pageNum])

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-us', {year:'numeric', month:'short', day:'numeric'})
    }


  return (
    <Container >
        <Typography variant='h4' style={{marginBottom:'4rem'}} >
            More Latest News
        </Typography>

        <Grid container spacing={6} >
            {moreNew.slice(0, numOfNews).map((coin, i) =>(
                <Grid item xs={12} md={12} key={i}  >
                <a href={coin?.url} target="_blank" 
                rel="noopener noreferrer">
                    <Paper className={classes.paper2} variant="outlined"  >
                    
                        <div className={classes.image2}>
                            <img 
                              src={coin?.urlToImage || alt}
                              loading='lazy' 
                              style={{width: '100%', height:'100%', maxHeight: '600px', objectFit:'cover',}} alt='coin'
                            />
                        </div>
                        <div className={classes.content2}>
                            <Typography variant='h5'className={classes.smallTitle}>
                                {coin?.title}
                            </Typography>
                            <Typography variant='body1'>
                                {coin?.description}
                            </Typography>
                            <Typography variant='body2' className={classes.date}>
                                {formatDate(coin?.publishedAt)}
                            </Typography>
                            <Typography variant='body2' className={classes.source}>
                                {coin?.source.name}
                            </Typography>
                        </div>
                    </Paper>
                </a>
                </Grid>
            ))}

          </Grid>
        
        <div className={classes.btnWrapper}>
            <Button
                onClick={handleLoadMore}
                variant='outlined'
                className={classes.logOut}
            
                size='large'
            >
                Show More
            </Button>
        </div>

    </Container>
  )
}
