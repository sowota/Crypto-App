import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { CircularProgress } from '@material-ui/core'

const useStyles = makeStyles(()=>({
    loader:{
        width: '100%',
        height:'20rem',
        display:'grid',
        placeItems:'center'
    }
}))


export default function Loader() {

    const classes = useStyles()
  return (
    <div className={classes.loader}>
            <CircularProgress style={{color: 'gold'}} size={80}/>
    </div>
  )
}
