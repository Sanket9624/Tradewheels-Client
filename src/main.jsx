import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Navbar from './components/Navbar/Navbar.jsx'
import Divider from './components/Divider/Divider.jsx'
import Footer from './components/Footer/Footer.jsx'
import { CartProvider } from 'react-use-cart';

ReactDOM.createRoot(document.getElementById('root')).render(
  <><CartProvider>
    <Navbar/>
    <App />
  </CartProvider>
  </>
)
