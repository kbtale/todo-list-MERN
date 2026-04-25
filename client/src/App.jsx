import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import OraclePage from './pages/OraclePage'
import AddTaskPage from './pages/AddTaskPage'
import DashboardPage from './pages/DashboardPage'
import { AuthProvider } from './context/AuthContext'

function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/oracle" element={<OraclePage/>} />
          <Route path="/dashboard" element={<DashboardPage/>} />
          <Route path="/tasks" element={<h1>Tasks</h1>} />
          <Route path="/add-task" element={<AddTaskPage/>} />
          <Route path="/task/:id" element={<h1>Update Task</h1>} />
          <Route path="/profile" element={<h1>User Profile</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App