import React from 'react'
import Banner from '../components/Banner'

import CryptoNews from '../components/CryptoNews'
import MoreNews from '../components/MoreNews'
import NewsTabs from '../components/NewsTabs'

export default function Home() {
  return (
    <div>
      <Banner />
      <CryptoNews/> 
      <NewsTabs/>
      <MoreNews/>

    </div>
  )
}
