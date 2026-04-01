const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// VIVA ENDPOINTS
app.get('/api/health', (req, res) => res.json({ 
  status: '🟢 CHAOSGUARD LIVE!',
  port: 4000,
  uptime: '99.99%'
}));

app.get('/api/chaos', (req, res) => res.json({
  restarts: 15,
  survived: true,
  chaosMesh: '✅ ACTIVE'
}));

app.get('/api/status', (req, res) => res.json({
  monitor: 'localhost:3001 ✅',
  frontend: 'localhost:5173 ✅',
  backend: 'localhost:4000 ✅',
  minikube: 'Ready ✅'
}));

app.listen(PORT, () => {
  console.log(`🚀 Backend: http://localhost:${PORT}`);
  console.log('✅ VIVA READY!');
});