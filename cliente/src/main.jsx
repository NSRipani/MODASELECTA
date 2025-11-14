import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserContextProvider } from './context/userContext.jsx'
import { CarroProvider } from './context/cartContext.jsx'
import { BrowserRouter } from 'react-router-dom';
import { OrderProvider } from './context/orderContext.jsx'
import { ProdProvider } from './context/prodContext.jsx'
import { ContactProvider } from './context/contactContext.jsx'
import { SubscriptionProvider } from './context/subscripContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <CarroProvider>
          <OrderProvider>
            <ProdProvider>
              <ContactProvider>
                <SubscriptionProvider>
                  <App />
                </SubscriptionProvider>
              </ContactProvider>
            </ProdProvider>
          </OrderProvider>
        </CarroProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
