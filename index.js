const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const PORT = 3000;
app.use(express.static(path.join(__dirname)));

const { remini, reminiv2, recolor, dehaze } = require('./src/functions')

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

// ===== AI

app.get("/api/openai", async (req, res) => {
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

app.get("/api/luminai", async (req, res) => {
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

app.get("/api/llama", async (req, res) => {
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

app.get("/api/blackbox", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const response = await fetchJson(`https://btch.us.kg/blackbox?text=${Enc(q)}`)
    res.status(200).json({
    status: true,
    result: response.result
    })
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

app.get("/api/simi", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const response = await fetchJson(`https://btch.us.kg/simi?text=${Enc(q)}`)
    res.status(200).json({
    status: true,
    result: response.result
    })
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

// ===== SEARCH

app.get("/api/google", async (req, res) => {
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

app.get("/api/gimage", async (req, res) => {
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

app.get("/api/playstore", async (req, res) => {
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

app.get("/api/appstore", async (req, res) => {
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

app.get("/api/yts", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const response = await fetchJson(`https://deliriussapi-oficial.vercel.app/search/ytsearch?q=${Enc(q)}`);
    res.status(200).json({
    status: true,
    data: response.data,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

// ===== DOWNLOADER

app.get("/api/ytdl", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    const res = await fetchJson(`https://api.siputzx.my.id/api/d/ytmp4?url=${Enc(url)}`);
    const ress = await fetchJson(`https://api.siputzx.my.id/api/d/ytmp3?url=${Enc(url)}`);
    res.status(200).json({
    status: true,
    data: {
      title: res.data.title,
      video: res.data.dl,
      audio: ress.data.dl,
    },})
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

app.get("/api/fbdl", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    const response = await fetchJson(`https://api.vreden.my.id/api/fbdl?url=${Enc(url)}`);
    res.status(200).json({
    status: true,
    data: response.data,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

app.get("/api/igdl", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    const response = await fetchJson(`https://api.vreden.my.id/api/igdownload?url=${Enc(url)}`);
    res.status(200).json({
    status: true,
    data: response.result,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

app.get("/api/ttdl", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    const response = await fetchJson(`https://api.vreden.my.id/api/tiktok?url=${Enc(url)}`);
    res.status(200).json({
    status: true,
    data: response.result,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

app.get("/api/mfdl", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    const response = await fetchJson(`https://api.vreden.my.id/api/mediafiredl?url=${Enc(url)}`);
    res.status(200).json({
    status: true,
    data: response.result,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

// ===== MAKER

app.get("/api/brat", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const response = await axios.get(
`https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(text)}`, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

app.get("/api/txtimage", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const response = await axios.get(`https://dummyimage.com/600x400/000/fff&text=${Enc(q)}`, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

// ===== TOOLS

app.get("/api/remini", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    const Buffr = Buffer.from(res.data);
    const hdImg = await remini(Buffr);
    const hdImage = await axios.get(hdImg, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'image/png');
    res.send(hdImage.data);
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

app.get("/api/reminiv2", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    const imgs = Buffer.from(res.data);
    const resu = await reminiv2(imgs, 'enhance');
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(resu);
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

app.get("/api/recolor", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    const res = await recolor(url);
    const resu = await axios.get(res,{ responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(resu.data);
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

app.get("/api/dehaze", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    const resultImage = await dehaze(url);
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(resultImage);
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

app.get("/api/ssweb", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    const response = await axios.get(`https://api.vreden.my.id/api/ssweb?url=${Enc(url)}&type=phone`, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

// ===== CONVERT

app.get("/api/tobase64", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const response = Buffer.from(q).toString('base64');
    res.status(200).json({
    status: true,
    result: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

app.get("/api/toutf8", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const response = Buffer.from(q, 'base64').toString('utf-8');
    res.status(200).json({
    status: true,
    result: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

app.get("/api/tohex", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const response = Buffer.from(q).toString('hex');
    res.status(200).json({
    status: true,
    result: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

app.get("/api/ghraw", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    if (!url.includes('github.com')) {
      res.status(400).json({ status: false, error: "Requires Github Raw URL" })}
    const rawUrl = url.replace('github.com', 'raw.githubusercontent.com').replace(/\/blob\/[^\/]+/, '').replace('/master', '').replace('/main', '');
    res.status(200).json({
    status: true,
    result: rawUrl,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

app.get("/api/ghori", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    if (!url.includes('raw.githubusercontent.com')) {
      res.status(400).json({ status: false, error: "Requires Github Ori URL" })}
    const ghUrl = url.replace('raw.githubusercontent.com', 'github.com').replace(/\/([^\/]+)$/, '/blob/$1').replace('/master', '/blob/master').replace('/main', '/blob/main');
    res.status(200).json({
    status: true,
    result: ghUrl,
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