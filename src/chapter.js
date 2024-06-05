const express = require('express');
const axios = require('axios');

const router = express.Router();
const BASE_URL = 'https://newbaseurl.com';

router.get('/:endpoint', async (req, res) => {
  const { endpoint } = req.params;
  try {
    const response = await axios.get(`https://asuanjg.vercel.app/chapter/${endpoint}`);
    let data = response.data;

    // Replace base URL in the data
    const replaceBaseUrl = (url) => url.replace('https://komikcast.cx', BASE_URL);

    data.prevChapterLink = replaceBaseUrl(data.prevChapterLink);
    data.nextChapterLink = replaceBaseUrl(data.nextChapterLink);
    data.downloadLink = replaceBaseUrl(data.downloadLink);
    data.allChaptersLink = replaceBaseUrl(data.allChaptersLink);

    res.render('chapter', { data });
  } catch (error) {
    res.status(500).send('Error fetching chapter data');
  }
});

module.exports = router;
