// typescript
// src/main.tsx
// Application entry point

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './renderer/App';

// Import global styles (includes variables and reset)
import './renderer/styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);