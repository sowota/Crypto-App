import {Routes, Route} from 'react-router-dom'
import {BrowserRouter} from 'react-router-dom'
import './App.css';
import Coin from './pages/Coin';
import Header from './components/Header';
import Home from './pages/Home';
import {makeStyles} from '@material-ui/core'

import AllCoins from './pages/AllCoins';
import Alerts from './components/Alerts';

function App() {

  const useStyles =makeStyles(()=>({
    App:{
     backgroundColor: '#14161a',
      color:'white',
      minHeight:'100vh',
    }
  }))

 
 
  const classes = useStyles()

  return (
  
      <div className={classes.App}>
        <Header/>
      
          <Routes>
            <Route path='/' element={<Home />}  />
            <Route path="/cointable" element={<AllCoins />}  />
            <Route path="/coins/:id" element={<Coin />}/>
          </Routes>
          <Alerts/>
          {/* <Routes>
            <Route path="/cointable" element={<AllCoins />}  />
          </Routes>
          <Routes>
            <Route path="/coins/:id" element={<Coin />}/>
          </Routes> */}
      </div>
  
  )
}

export default App;
