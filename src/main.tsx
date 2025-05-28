import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/routes.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loader from './components/ui/Loader/Loader.tsx'

const queryClient = new QueryClient();



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<Loader width={100} height={100} position='absolute'/>}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      </QueryClientProvider>
    </Suspense>
  </StrictMode>,
)
