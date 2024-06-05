const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/manga/:endpoint', async (req, res) => {
  const { endpoint } = req.params;
  try {
    const response = await axios.get(`https://asuanjg.vercel.app/manga/${endpoint}`);
    const data = response.data;
    res.render('manga', { data });
  } catch (error) {
    res.status(500).send('Error fetching manga data');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
