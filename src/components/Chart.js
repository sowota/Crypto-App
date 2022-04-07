import React, {useState,useEffect} from 'react'
import { CryptoState } from '../CryptoContext'
import axios from 'axios'
import {getChart} from '../api/endpoints'
import { createTheme, ThemeProvider, Typography } from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import Loader from './Loader'
import {buttonData} from '../buttonData'
import SelectedBtn from './SelectedBtn';
import {Line} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );



export default function Chart({id,}) {


    const useStyles = makeStyles(()=>({
        chartContainer: {
            width: '100%',
            height: '100%',
            paddingBottom:'5rem'
        },
        btns:{
            display: 'flex',
            justifyContent: 'right',
            width: '100%',
            gap: '1rem',
        },
    
        
    }))

    const classes = useStyles()
 
    const[chart, setChart] = useState()
    const[days, setDays] = useState(7)
    //console.log(days)
    
    //console.log(id)

    //console.log(chart)

    const{currency} = CryptoState()

    const handleDays = (button) => {
        setDays(button.value)
        
    }

    const showChart = async()=>{

        const {data} = await axios.get(getChart(id, days, currency))
        setChart(data.prices)
    }

    useEffect(()=>{
        showChart()
    },[days, currency])

    const darkTheme = createTheme({
        palette:{
            primary: {
                main:'#fff'
            },
            type:'dark'
        }
    })


  return (
      <ThemeProvider theme={darkTheme}>
          { <div className={classes.chartContainer}>
              {!chart ? (
                  <Loader />
              )
              : 
              (
                  <>
                    <div className={classes.btns}>
                        {buttonData.map(button=>(
                            <SelectedBtn  
                            onClick={() =>setDays(button.value)} 
                            selected={button.value === days} key={button.type}
                            >
                                <Typography className={classes.btn} variant="subtitle1" >
                                    {button.type}
                                </Typography>
                            </SelectedBtn>
                        ))}
                    </div>
                    <Line 
                         data={{
                            labels: chart.map((coin) => {
                              let date = new Date(coin[0]);
                              let time =
                                date.getHours() > 12
                                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                  : `${date.getHours()}:${date.getMinutes()} AM`;
                              return days === 1 ? time : date.toLocaleDateString();
                            }),
            
                            datasets: [
                              {
                                data: chart.map((coin) => coin[1]),
                                label: `Price ( Past ${days} Days ) in ${currency}`,
                                borderColor: "#EEBC1D",
                              },
                            ],
                          }}
                          options={{
                              elements: {
                                  point: {
                                      radius:1
                                  }
                              }
                          }}
                    />            
                  </>
                 
              )
             

            }
          </div> }

      </ThemeProvider>
    
  )
}
