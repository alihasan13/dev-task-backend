const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3001;

mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/api/data', (req, res) => {
  // Implement your logic to fetch data from MongoDB
  res.json({ message: 'Data from the server' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
