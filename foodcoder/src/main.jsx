import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { StoreContextProvider } from './context/StoreContext.jsx';


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <StoreContextProvider>
                <App />
        </StoreContextProvider>
    </BrowserRouter>
)


