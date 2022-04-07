import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import CryptoContext from './CryptoContext'
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
 <CryptoContext>
   <BrowserRouter>
   
    <App />
   </BrowserRouter>
 
 </CryptoContext>,
  document.getElementById('root')
);



