const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const PORT = 3000;
app.use(express.static(path.join(__dirname)));

function Enc(type) {
  return encodeURIComponent(type)
}

const fetchJson = async (url, options = {}) => {
    try {
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}

app.get("/api/ai/openai", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const response = await fetchJson(`https://deliriussapi-oficial.vercel.app/ia/chatgpt?q=${Enc(q)}`);
    res.status(200).json({
    status: true,
    result: response.data
    })
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

app.get("/api/ai/luminai", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const response = await fetchJson(`https://api.siputzx.my.id/api/ai/llama?prompt=You%20name%20is%LuminAI&message=${Enc(q)}`);
    res.status(200).json({
    status: true,
    result: response.data
    })
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

app.get("/api/ai/llama", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const response = await fetchJson(`https://api.siputzx.my.id/api/ai/luminai?content=${Enc(q)}`);
    res.status(200).json({
    status: true,
    result: response.data
    })
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

app.get("/api/src/google", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const response = await fetchJson(`https://www.googleapis.com/customsearch/v1?q=${Enc(q)}&key=AIzaSyAajE2Y-Kgl8bjPyFvHQ-PgRUSMWgBEsSk&cx=e5c2be9c3f94c4bbb`);
    const items = response.items;
    res.status(200).json({
    status: true,
    data: items.map(item => ({
    title: item.title,
    desc: item.snippet,
    link: item.link,
    })),
    })
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

app.get("/api/src/gimage", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const response = await fetchJson(`https://btch.us.kg/gimage?query=${Enc(q)}`, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'image/png');
    res.send(response);
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

app.get("/api/src/playstore", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const response = await fetchJson(`https://api.vreden.my.id/api/playstore?query=${Enc(q)}`);
    res.status(200).json({
    status: true,
    data: response.result,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

app.get("/api/src/appstore", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const response = await fetchJson(`https://deliriussapi-oficial.vercel.app/search/appstore?q=${Enc(q)}`);
    res.status(200).json({
    status: true,
    data: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

/*
 * © Sanjaya
 * Vioo AI
 */