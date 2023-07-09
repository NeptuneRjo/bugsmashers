import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Dashboard from './views/Dashboard';

function App() {
    const navigate = useNavigate()

    useEffect(() => {
        navigate("/dashboard")
    }, [])

  return (
      <div className="app">
          <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
    </div>
  )
}

export default App;
