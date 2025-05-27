const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});