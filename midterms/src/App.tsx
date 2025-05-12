import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ToDoListPage from './pages/ToDoListPage'
import './index.css'
import { Header } from './components/layout/Header'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="flex-col">
      <Header
        title="My To-Do List"
        description="Manage your daily tasks"
        variant="gradient"
      />
      <ToDoListPage />
    </div>
  </StrictMode>,
)