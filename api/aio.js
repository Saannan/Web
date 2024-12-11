const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

const dwrun = {
    dl: async (link) => {
        try {
            const { data: api } = await axios.get('https://downloader.run');
            const token = cheerio.load(api)('#token').val();
            const { data } = await axios.post('https://downloader.run/wp-json/aio-dl/video-data/', new URLSearchParams({ url: link, token }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': 'Postify/1.0.0'
                }
            });
            return data;
        } catch (error) {
            return { error: error.response?.data || error.message };
        }
    }
};

app.get('/api/dl/aio', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, message: 'URL is required!' });
  } else if (url === 'list') {
    return res.status(400).json({ status: false, message: 'Visit: https://retatube.com' });
  }

  try {
    const results = await dwrun.dl(url);
    res.json({ status: true, creator: 'Sanjaya', results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = app;