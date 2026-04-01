const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json());
app.get('/api/health', function(req, res) {
  res.json({status: 'LIVE!', port: 4000});
});
app.listen(PORT, function() {
  console.log('Backend: http://localhost:' + PORT);
});