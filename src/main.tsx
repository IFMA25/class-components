import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <BrowserRouter basename="/class-components/">
      <App />
    </BrowserRouter>
  );
}
