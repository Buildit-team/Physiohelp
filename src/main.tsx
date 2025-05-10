import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './context/CartCaontex.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AdminProvider } from './context/adminContext.tsx'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <AdminProvider>
        <App />
      </AdminProvider>
    </CartProvider>
  </QueryClientProvider>


)
