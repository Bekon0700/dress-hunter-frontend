import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import AuthProvider from './context/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const queryClient = new QueryClient()

const stripePromise = loadStripe(import.meta.env.VITE_stripe_pk);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </Elements>
  </React.StrictMode>
)
