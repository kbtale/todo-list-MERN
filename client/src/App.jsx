import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import OraclePage from './pages/OraclePage'
import AddTaskPage from './pages/AddTaskPage'
import DashboardPage from './pages/DashboardPage'
import Navbar from './components/Navbar'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/oracle" element={<OraclePage/>} />
            <Route path="/dashboard" element={<DashboardPage/>} />
            <Route path="/add-task" element={<AddTaskPage/>} />
            <Route path="/tasks" element={<h1>Tasks</h1>} />
            <Route path="/task/:id" element={<h1>Update Task</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App