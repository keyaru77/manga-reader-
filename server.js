const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
const mangaRouter = require('./src/manga');
const chapterRouter = require('./src/chapter');

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/manga', mangaRouter);
app.use('/chapter', chapterRouter);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
