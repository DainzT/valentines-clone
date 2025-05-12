import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ToDoListPage from './pages/ToDoListPage'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToDoListPage />
  </StrictMode>,
)