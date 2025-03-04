import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import EmployeeManagementSystemPage from './pages/EmployeeManagementSystemPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EmployeeManagementSystemPage />
  </StrictMode>,
)
