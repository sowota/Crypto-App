import React, { useEffect, useState } from 'react';
import { Container, createTheme, Grid, Paper } from '@material-ui/core'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import alt from '../img/altForNoPic.jpg'
import {bitcoin, ethereum} from '../api/endpoints'
import axios from 'axios';
import {bit} from '../constant/bitcoin'
import {ethe} from '../constant/ethe'

//Tab function
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// Styles
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
    backgroundColor: 'transparent',
    padding:'8rem 24px'
  },
  paper2:{
    display:'flex',
    flexDirection: 'column',
    backgroundColor:'transparent',
    border:'3px solid #242424',
    color:'#FFFFFF',
    borderRadius: '5px',
    [darkTheme.breakpoints.up('md')]: {
        flexDirection: 'row'
    },
    
    "&:hover":{
            filter:'brightness(.8)',
    }

   
 },
    content2:{
        display:'flex',
        flexDirection: 'column',
        padding:".7rem 1.3rem",
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
        maxHeight:'92px',
        lineClamp: "3",
        textOverflow: "ellipsis",
        boxOrient: "vertical",
        display:'box',
        overflow: "hidden",
        
    },
    image2: {
        width:'100%', 
        //maxHeight:'250px',
        overflow:'hidden',
        borderTopLeftRadius:'5px', 
        borderTopRightRadius:'5px',
        [darkTheme.breakpoints.up('md')]: {
            width:'35%',
            height:'150px',
          
            borderTopRightRadius:'0',
            borderBottomLeftRadius:'5px'
          },

    },

    tab:{
        "& .MuiTabs-flexContainer":{
            backgroundColor:'#242424',
            color:'gold',
            fontWeight:'bold',
          },
          "& .MuiTab-wrapper":{
             fontWeight:'bold',
          },
          "& .MuiTabs-indicator":{
              backgroundColor:'gold',
              height:'4px'
          }
        

    }
 
}));






export default function NewsTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  
  const[bitData, setBitData] = useState([])
  
  const [etheData, setEtheData] = useState([])
  
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


//API fetch 

    // const bitcoinData = async () =>{
    //     const {data} = await axios.get(bitcoin())
    //     setBitData(data.articles)
    // }

    // const ethereumData = async () =>{
    //     const {data} = await axios.get(ethereum())
    //     setEtheData(data.articles)
    // }

    // useEffect(() => {
    //     bitcoinData()
    //     ethereumData()
    // },[])

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-us', {year:'numeric', month:'short', day:'numeric'})
    }


    const getMultiRandomNews = (arr, num) =>{
      const shuffled = [...arr].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, num)
  }

  return (
    <Container className={classes.root}>
      <AppBar position="static">
        <Tabs 
            value={value} 
            onChange={handleChange} 
            aria-label="tabs"
            wrapped='true'
            className={classes.tab}

        >
          <Tab label="Bitcoin" {...a11yProps(0)} />
          <Tab label="Ethereum" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
{/*Bitcoin tab  */}
      <TabPanel value={value} index={0}>
          <Grid container spacing={3}>
            {getMultiRandomNews(bit, 6).map((coin, i) => (
             <Grid item xs={12} md={6} lg={4} key={i}  >
             <a href={coin?.url} target="_blank" 
             rel="noopener noreferrer">
                 <Paper className={classes.paper2} variant="outlined">
                 
                     <div className={classes.image2}>
                         <img 
                            src={coin?.urlToImage || alt}
                            loading='lazy'
                            style={{width: '100%', height:'100%', maxHeight: '400px',   objectFit:'cover',}} alt='coin'
                         />
                     </div>
                     <div className={classes.content2}>
                         <Typography variant='body1'className={classes.smallTitle}>
                             {coin?.title}
                         </Typography>
                         <Typography variant='body2' className={classes.date}>
                             {formatDate(coin?.publishedAt)}
                         </Typography>
                     </div>
                 </Paper>
             </a>
            </Grid>
            ))}
          </Grid>
      </TabPanel>
{/*Ethereum tab  */}      
      <TabPanel value={value} index={1}>
          <Grid container spacing={3}>
            {getMultiRandomNews(ethe, 6).map((coin, i) =>(
                <Grid item xs={12} md={6} lg={4} key={i}  >
                <a href={coin?.url} target="_blank" 
                rel="noopener noreferrer">
                    <Paper className={classes.paper2} variant="outlined"  >
                    
                        <div className={classes.image2}>
                            <img 
                              src={coin?.urlToImage || alt}
                              loading='lazy' 
                              style={{width: '100%', height:'100%', maxHeight: '400px',   objectFit:'cover',}} alt='coin'
                            />
                        </div>
                        <div className={classes.content2}>
                            <Typography variant='body1'className={classes.smallTitle}>
                                {coin?.title}
                            </Typography>
                            <Typography variant='body2' className={classes.date}>
                                {formatDate(coin?.publishedAt)}
                            </Typography>
                        </div>
                    </Paper>
                </a>
                </Grid>
            ))}

          </Grid>
      </TabPanel>

    </Container>
  );
}

