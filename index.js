const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const PORT = 3000;
app.use(express.static(path.join(__dirname)));

function Enc(type) {
return encodeURIComponent(type)
}

app.get("/api/ai/openai", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Text is required" });
  }

  try {
    const response = await axios.get(`https://deliriussapi-oficial.vercel.app/ia/chatgpt?q=${Enc(q)}`);
    res.status(200).json({
    status: true,
    result: response.data.data
    })
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

app.get("/api/ai/luminai", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Text is required" });
  }

  try {
    const response = await axios.get(`https://api.siputzx.my.id/api/ai/llama?prompt=You%20name%20is%LuminAI&message=${Enc(q)}`);
    res.status(200).json({
    status: true,
    result: response.data.data
    })
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed" })
  }
})

app.get("/api/ai/llama", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Text is required" });
  }

  try {
    const response = await axios.get(`https://api.siputzx.my.id/api/ai/luminai?content=${Enc(q)}`);
    res.status(200).json({
    status: true,
    result: response.data.data
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
    const response = await axios.get(`https://www.googleapis.com/customsearch/v1?q=${Enc(q)}&key=AIzaSyAajE2Y-Kgl8bjPyFvHQ-PgRUSMWgBEsSk&cx=e5c2be9c3f94c4bbb`);
    const items = response.data.items;
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

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});