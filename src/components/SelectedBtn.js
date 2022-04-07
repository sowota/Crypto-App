import React from 'react'
import { makeStyles } from '@material-ui/core'



export default function SelectedBtn({selected, children, onClick}) {

    const useStyles = makeStyles(()=>({
        btn:{
            cursor: 'pointer',
            padding: '.5rem .7rem',
            borderRadius: '5px',
            backgroundColor: selected? 'gold' : '',
            color: selected? 'black': 'white',
            "&:hover":{
                backgroundColor:'rgb(51, 51, 51)'
            },
        }
    }))

    const classes = useStyles()


  return (
    <div className={classes.btn} onClick={onClick}>
        {children}
    </div>
  )
}
