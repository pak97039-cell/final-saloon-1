import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { SalonProvider } from './context/SalonContext.tsx';
import { ToastProvider } from './components/ui/Toast.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <SalonProvider>
    <ToastProvider>
      <App />
    </ToastProvider>
  </SalonProvider>
);
