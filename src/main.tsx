import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'

/**
 * Mount the React application to the root element
 */
createRoot(document.getElementById("root")!).render(<App />);
