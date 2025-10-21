import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root');
console.log('Root element:', root);

if (root) {
  const reactRoot = createRoot(root);
  console.log('React root created');
  
  reactRoot.render(
    <StrictMode>
      <div style={{padding: '20px'}}>
        <h1>Testing React Mount</h1>
        <App />
      </div>
    </StrictMode>
  );
  console.log('Render called');
} else {
  console.error('Root element not found');
}
