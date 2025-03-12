const express = require('express');
const path = require('path');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Debug route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Catch-all route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server with error handling
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try another port.`);
  } else {
    console.error('Server error:', err);
  }
});