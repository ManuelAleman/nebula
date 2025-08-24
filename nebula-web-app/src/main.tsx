import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
const VITE_CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
createRoot(document.getElementById('root')!).render(
  <ClerkProvider publishableKey={VITE_CLERK_PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
)
