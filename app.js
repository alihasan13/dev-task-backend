// app.js

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (replace 'your_database_url' with your MongoDB connection string)
mongoose.connect('your_database_url', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a simple schema and model
const dataSchema = new mongoose.Schema({
  name: String,
  sectors: [String],
  agree: Boolean,
});

const Data = mongoose.model('Data', dataSchema);

app.use(express.json());

// Define routes
app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/data', async (req, res) => {
  const { name, sectors, agree } = req.body;

  if (!name || !sectors || sectors.length === 0 || agree === undefined) {
    return res.status(400).json({ message: 'Bad Request - Missing or invalid data' });
  }

  try {
    const newData = new Data({ name, sectors, agree });
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
