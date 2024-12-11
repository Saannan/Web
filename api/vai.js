const axios = require('axios');
const express = require('express');

// Membuat instance Express
const app = express();

app.get('/api/ai/vai', async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, message: 'Fill in the query!' });
  }

  try {
    const prompt = 'Nama kamu Vioo yang diciptakan oleh Sanjaya dengan ke pintaran yang sangat menakjubkan.';
    const response = await axios.get(`https://api.siputzx.my.id/api/ai/yanzgpt?query=${encodeURIComponent(q)}&prompt=${encodeURIComponent(prompt)}&modelType=yanzgpt-revolution-25b-v3.0`);

    if (response.data?.choices?.[0]?.message?.content) {
      return res.json({
        status: true,
        creator: 'Sanjaya',
        result: response.data.choices[0].message.content,
      });
    } else {
      return res.status(500).json({ status: false, message: 'No valid response from AI' });
    }
  } catch (error) {
    return res.status(500).json({ status: false, message: 'Error from AI' });
  }
});

module.exports = app;