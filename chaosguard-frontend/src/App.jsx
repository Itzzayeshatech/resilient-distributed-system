import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [backendStatus, setBackendStatus] = useState('Checking...')
  const [chaosData, setChaosData] = useState(null)

  // Test Backend API on load
  useEffect(() => {
    fetch('http://localhost:4000/api/health')
      .then(res => res.json())
      .then(data => {
        setBackendStatus(data.status)
        setChaosData({
          backend: `${data.status} on port ${data.port}`,
          timestamp: data.timestamp || new Date().toLocaleTimeString()
        })
      })
      .catch(() => setBackendStatus('Backend Offline'))
  }, [])

  const testChaosAPI = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/health')
      const data = await res.json()
      alert(`✅ CHAOSGUARD BACKEND LIVE!\nStatus: ${data.status}\nPort: ${data.port}`)
    } catch {
      alert('❌ Backend not responding')
    }
  }

  return (
    <div className="App">
      <h1>🚀 ChaosGuard SAAS</h1>
      
      {/* Backend Status */}
      <div className="status-card">
        <h2>Backend Status</h2>
        <div className={`status ${backendStatus === 'LIVE!' ? 'live' : 'offline'}`}>
          {backendStatus}
        </div>
        {chaosData && (
          <pre>{JSON.stringify(chaosData, null, 2)}</pre>
        )}
      </div>

      {/* Test Backend Button */}
      <button onClick={testChaosAPI} className="chaos-btn">
        🔍 Test Backend API (localhost:4000)
      </button>

      {/* Vite Counter (Keep Original) */}
      <div className="card">
        <h2>Vite + React</h2>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

      {/* VIVA Footer */}
      <footer>
        <p>✅ 5-Terminal Stack LIVE!</p>
        <p>Backend:4000 | Frontend:5173 | Minikube Ready</p>
      </footer>
    </div>
  )
}

export default App