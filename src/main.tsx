import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider
      attribute={'class'}
      defaultTheme={'dark'}
      enableSystem={false}
    >
      <App />
      <Toaster position="top-center" richColors />
    </ThemeProvider>
  </StrictMode>
);
