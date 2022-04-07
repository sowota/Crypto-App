import { Container, createTheme, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import wallpaper from '../img/wallpaper.jpg'
import CarouselSlider from './CarouselSlider'

const darkTheme = createTheme({
    palette:{
        primary: {
            main:'#fff'
        },
        type:'dark'
    },
  
})

const useStyles = makeStyles(()=>({
    banner: {
        backgroundImage:`url(${wallpaper})`,
        backgroundPosition: 'center', 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
        height: 500,
    },
    bannerContent: {
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        paddingTop:25,
        justifyContent: 'space-around',
        rowGap:'2.5rem'
    },
    title:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop:'2.5rem'

    }
}))

export default function Banner() {

    const classes = useStyles()

    
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.title}>
                <Typography variant="h3" style={{fontWeight: 'bold', marginBottom: '15px', textAlign:'center'}} >
                    Crypto Trends 
                </Typography>
                <Typography variant="subtitle2" style={{color: 'darkGray'}} >
                    Stay on top of the crypto trends 
                </Typography>
            </div>
        <CarouselSlider/>
        </Container>

    </div>
  )
}
