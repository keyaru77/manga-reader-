const express = require('express');
const axios = require('axios');

const router = express.Router();
const BASE_URL = 'https://manga-reader-mauve.vercel.app';

router.get('/:endpoint', async (req, res) => {
  const { endpoint } = req.params;
  try {
    const response = await axios.get(`https://asuanjg.vercel.app/manga/${endpoint}`);
    let data = response.data;

    // Replace base URL in the data
    const replaceBaseUrl = (url) => url.replace('https://komikcast.cx', BASE_URL);

    data.firstChapter.link = replaceBaseUrl(data.firstChapter.link);
    data.lastChapter.link = replaceBaseUrl(data.lastChapter.link);

    data.chapters = data.chapters.map(chapter => ({
      ...chapter,
      chapterLink: replaceBaseUrl(chapter.chapterLink),
      downloadLink: replaceBaseUrl(chapter.downloadLink)
    }));

    data.relatedManga = data.relatedManga.map(manga => ({
      ...manga,
      href: replaceBaseUrl(manga.href)
    }));

    res.render('manga', { data });
  } catch (error) {
    res.status(500).send('Error fetching manga data');
  }
});

module.exports = router;
