import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import MyContextProvider from './Context/Context'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CLIENT_ID } from './data.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
     <MyContextProvider basename='/satyams-utube'>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
      </GoogleOAuthProvider>;
     </MyContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
