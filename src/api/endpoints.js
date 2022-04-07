// Coin data

export const getCoins = (currency) =>{
    return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=15&page=1&sparkline=false&price_change_percentage=24h`
}
export const get100Coins = (currency) =>{
    return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`
}

export const getSingleCoin = (id) =>{
    return `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false`
}

export const getChart = (id, days, currency) =>{
   return `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
}


// News

export const news = ()=>{
    return 'https://newsapi.org/v2/everything?q=crypto&pageSize=100&page=1&sortBy=publishedAt&language=en&apiKey=process.env.NEWS_API_KEY'
}

export const moreNews = (num)=>{
    return `https://newsapi.org/v2/everything?q=crypto&pageSize=100&page=${num}&sortBy=publishedAt&language=en&apiKey=process.env.NEWS_API_KEY`
}

export const bitcoin = ()=> {
    return 'https://newsapi.org/v2/everything?q=bitcoin&pageSize=100&sortBy=publishedAt&language=en&apiKey=process.env.NEWS_API_KEY'
}

export const ethereum = () => {
    return 'https://newsapi.org/v2/everything?q=ethereum&pageSize=100&sortBy=publishedAt&language=en&apiKey=process.env.NEWS_API_KEY'
}




