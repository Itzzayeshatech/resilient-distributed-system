// app.js - ENTERPRISE CHAOS ENGINEERING FYP
// MNC-LEVEL PRODUCTION CODE

const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let requestCount = 0;
let errorCount = 0;
let chaosMode = false;

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    traceId: uuidv4(),
    requests: requestCount,
    errors: errorCount,
    chaosActive: chaosMode
  });
});

app.get('/chaos', async (req, res) => {
  requestCount++;
  
  try {
    if (chaosMode && Math.random() < 0.3) {
      throw new Error('💥 Chaos: Pod Failure');
    }
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    res.json({
      message: '✅ Chaos Experiment SUCCESS',
      traceId: uuidv4(),
      requests: requestCount,
      chaosStatus: chaosMode ? '🔥 ACTIVE' : '✅ OFF'
    });
  } catch (error) {
    errorCount++;
    res.status(500).json({ error: error.message });
  }
});

app.post('/chaos/activate', (req, res) => {
  chaosMode = true;
  console.log('🔥 CHAOS MODE ACTIVATED!');
  res.json({ status: 'Chaos ON - 30% failure rate' });
});

app.get('/', (req, res) => {
  res.send(
    <h1>ChaosGuard Enterprise</h1>
    <p>Requests:  | Errors: </p>
    <button onclick="fetch('/chaos/activate',{method:'POST'}).then(()=>location.reload())">
      🔥 Activate Chaos
    </button>
    <a href="/chaos">🚀 Run Experiment</a>
  );
});

app.listen(PORT, () => {
  console.log('🚀 ChaosGuard LIVE: http://localhost:' + PORT);
});
