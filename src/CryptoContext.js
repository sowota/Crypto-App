import axios from 'axios'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect } from 'react'
import {createContext, useContext, useState} from 'react'
import {get100Coins} from './api/endpoints'
import { auth, db } from './firebase.config'

const Crypto = createContext()

export default function CryptoContext({children}) {

    const [currency, setCurrency] = useState('USD')
    const [symbol, setSymbol] = useState('$')
    const[coins, setCoins] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [watchlist, setWatchlist] = React.useState([]);
    const [alert, setAlert] = useState({
        open:false,
        severity:'',
        message:''

    })

    useEffect(() => {
        if(user){
            const coinRef = doc(db, 'watchlist', user?.uid)

            let unsubscribe = onSnapshot(coinRef, coin=>{
                if(coin.exists()){
                    //console.log(coin.data().coins)
                    setWatchlist(coin.data().coins)
                }else{
                    console.log('no item in watchlist')
                }
            })

            return ()=>{
                unsubscribe()
            }
        }
    }, [user])


    useEffect(() => {
        onAuthStateChanged(auth, user =>{
            if(user) setUser(user)
            else setUser(null)
        })
    }, [])

    const getCoinList = async() =>{
        setIsLoading(true)
        const {data} = await axios.get(get100Coins(currency))

        setCoins(data)
        setIsLoading(false)
    }

    useEffect(()=>{
        if(currency === 'USD'){
            setSymbol('$')
        }else if (currency === 'JPY'){
            setSymbol('¥')
        }else{
            setSymbol('€')
        }
    }, [currency])

  return (
    <Crypto.Provider 
        value={{currency, symbol, setCurrency, setSymbol, coins, isLoading, setIsLoading, setCoins, getCoinList, user, watchlist, alert, setAlert}}
    >
        {children}
    </Crypto.Provider>
  )
}

export const CryptoState = ()=>{
    return useContext(Crypto)
}
