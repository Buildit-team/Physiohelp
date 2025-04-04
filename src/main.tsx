import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './context/CartCaontex.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <CartProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </CartProvider>


)
