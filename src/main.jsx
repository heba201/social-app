import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import AuthContextProvider from './context/AuthContext.jsx';
import UserContextProvider from './context/UserContext.jsx';
import NotificationsContextProvider from './context/NotificationsContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <NotificationsContextProvider>
<UserContextProvider>
 <AuthContextProvider>
  <App />
 </AuthContextProvider>
  </UserContextProvider>
  </NotificationsContextProvider>
  </StrictMode>,
)
