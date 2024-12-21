const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

function Enc(type) {
  return encodeURIComponent(type)
}

// ===== AI

app.get("/api/openai", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const { ChatGPT } = require('./search/functions')
    const response = await ChatGPT(`${Enc(q)}`, "openai")
    res.status(200).json({
    status: true,
    result: response
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/luminai", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const response = await axios.get(`https://api.siputzx.my.id/api/ai/llama?prompt=You%20name%20is%LuminAI&message=${Enc(q)}`);
    res.status(200).json({
    status: true,
    result: response.data.data
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/llamav1", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const { ChatGPT } = require('./search/functions')
    const response = await ChatGPT(`${Enc(q)}`, "llama")
    res.status(200).json({
    status: true,
    result: response
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/llamav2", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const { veniceai } = require('./search/functions')
    const response = await veniceai(`${Enc(q)}`, "llama-3.2-3b-akash")
    res.status(200).json({
    status: true,
    result: response
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/gemini", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const response = await axios.get(`https://api.agatz.xyz/api/gemini?message=${Enc(q)}`)
    res.status(200).json({
    status: true,
    result: response.data.data.answer
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/blackbox", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const response = await axios.get(`https://btch.us.kg/blackbox?text=${Enc(q)}`)
    res.status(200).json({
    status: true,
    result: response.data.result
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/simi", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const response = await axios.get(`https://btch.us.kg/simi?text=${Enc(q)}`)
    res.status(200).json({
    status: true,
    result: response.data.result
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/gpt4o", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const prompt = "Your name is GPT-4o"
    const response = await axios.get(`https://deliriussapi-oficial.vercel.app/ia/gptprompt?text=${Enc(q)}&prompt=${Enc(prompt)}`)
    res.status(200).json({
    status: true,
    result: response.data.data
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/gpt4omini", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const prompt = "Your name is GPT-4o Mini"
    const response = await axios.get(`https://deliriussapi-oficial.vercel.app/ia/gptprompt?text=${Enc(q)}&prompt=${Enc(prompt)}`)
    res.status(200).json({
    status: true,
    result: response.data.data
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/turbov1", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const prompt = "Your name is GPT Turbo"
    const response = await axios.get(`https://deliriussapi-oficial.vercel.app/ia/gptprompt?text=${Enc(q)}&prompt=${Enc(prompt)}`)
    res.status(200).json({
    status: true,
    result: response.data.data
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/turbov2", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const prompt = "Your name is GPT Turbo Large"
    const response = await axios.get(`https://deliriussapi-oficial.vercel.app/ia/gptprompt?text=${Enc(q)}&prompt=${Enc(prompt)}`)
    res.status(200).json({
    status: true,
    result: response.data.data
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/mistralv1", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const { ChatGPT } = require('./search/functions')
    const response = await ChatGPT(`${Enc(q)}`, "mistral")
    res.status(200).json({
    status: true,
    result: response
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/mistralv2", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const { ChatGPT } = require('./search/functions')
    const response = await ChatGPT(`${Enc(q)}`, "mistral-large")
    res.status(200).json({
    status: true,
    result: response
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/feloai", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const { feloask } = require('./search/functions')
    const response = await feloask(`${Enc(q)}`)
    res.status(200).json({
    status: true,
    result: response
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/moshiai", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const response = await axios.get(`https://api.siputzx.my.id/api/ai/moshiai?input=${Enc(q)}`)
    res.status(200).json({
    status: true,
    result: response.data.data
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/meiliai", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({
      status: false,
      error: "Query is required"
    })
  }
  try {
    const { meiliai } = require('./search/functions')
    const rawResponse = await meiliai(`${Enc(q)}`)
    const formattedResponse = rawResponse.results.map(result => ({
      query: result.query,
      hits: result.hits.map(hit => ({
        id: hit.id,
        title: hit.title || "Unknown Title",
        description: hit.description || "No description available",
        highlights: hit._formatted || {}
      })),
      totalHits: result.nbHits
    }))
    res.status(200).json({
      status: true,
      result: formattedResponse
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/islamai", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const { islamai } = require('./search/functions')
    const response = await islamai(`${Enc(q)}`)
    res.status(200).json({
    status: true,
    result: response
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/veniceai", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const { veniceai } = require('./search/functions')
    const response = await veniceai(`${Enc(q)}`, "llama-3.3-70b")
    res.status(200).json({
    status: true,
    result: response
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/cai", async (req, res) => {
  const { q, model } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  } else if (!model) {
    return res.status(400).json({ status: false, error: "Model is required\n\nList:\n- Sakura\n- Feng Xin\n- Mr. Beast\n- Lexi\n- Laura\n- Yuki\n- Luffy\n- Killua\n- Furina\n- Hanabi\n- Doraemon\n- Hari\n- Denki Kaminari\n- Anya Forger\n- Gojo Satoru\n- Mamo Ayase\n- Ken Takakura" });
  }
  try {
    const { cai } = require('./search/functions')
    const response = await cai(`${Enc(q)}`, model)
    res.status(200).json({
    status: true,
    result: response
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/createcai", async (req, res) => {
  const { model, prompt, q } = req.query;
  if (!model) {
    return res.status(400).json({ status: false, error: "Model is required" });
  } else if (!prompt) {
    return res.status(400).json({ status: false, error: "Prompt is required" });
  } else if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const { ccai } = require('./search/functions')
    const response = await ccai(`${Enc(model)}`, `${Enc(prompt)}`, `${Enc(q)}`)
    res.status(200).json({
    status: true,
    result: response
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

// ===== SEARCH

app.get("/api/google", async (req, res) => {
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
    }))
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/gimage", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const response = await axios.get(`https://btch.us.kg/gimage?query=${Enc(q)}`, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/playstore", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const response = await axios.get(`https://api.vreden.my.id/api/playstore?query=${Enc(q)}`);
    res.status(200).json({
    status: true,
    data: response.data.result,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/appstore", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const response = await axios.get(`https://deliriussapi-oficial.vercel.app/search/appstore?q=${Enc(q)}`);
    res.status(200).json({
    status: true,
    data: response.data,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/yts", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const response = await axios.get(`https://deliriussapi-oficial.vercel.app/search/ytsearch?q=${Enc(q)}`);
    res.status(200).json({
    status: true,
    data: response.data.data,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/spotifys", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const { spotifys } = require('./search/functions')
    const response = await spotifys(`${Enc(q)}`)
    res.status(200).json({
    status: true,
    data: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/bingsrc", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const { bingS } = require('./search/functions')
    const response = await bingS(`${Enc(q)}`)
    res.status(200).json({
    status: true,
    data: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/bingimg", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const { bingI } = require('./search/functions')
    const response = await bingI(`${Enc(q)}`)
    res.status(200).json({
    status: true,
    data: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/bingvd", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const { bingV } = require('./search/functions')
    const response = await bingV(`${Enc(q)}`)
    res.status(200).json({
    status: true,
    data: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/pinterest", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const response = await axios.get(`https://deliriussapi-oficial.vercel.app/search/pinterest?text=${Enc(q)}`);
    res.status(200).json({
    status: true,
    data: response.data.result,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

// ===== DOWNLOADER

app.get("/api/ytdl", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    const { ytdl } = require('./search/functions')
    const vid = await ytdl(url, 3, 2);
    const aud = await ytdl(url, 4, 1);
    res.status(200).json({
    status: true,
    data: {
    video: vid,
    audio: aud,
    }})
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/fbdl", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    const response = await axios.get(`https://api.vreden.my.id/api/fbdl?url=${url}`);
    res.status(200).json({
    status: true,
    data: response.data.data,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/igdl", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    const response = await axios.get(`https://api.vreden.my.id/api/igdownload?url=${url}`);
    res.status(200).json({
    status: true,
    data: response.data.result,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/ttdl", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    const response = await axios.get(`https://api.vreden.my.id/api/tiktok?url=${url}`);
    res.status(200).json({
    status: true,
    data: response.data.result,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/mfdl", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    const response = await axios.get(`https://deliriussapi-oficial.vercel.app/download/mediafire?url=${url}`);
    res.status(200).json({
    status: true,
    data: response.data.data,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/spotify", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    const response = await axios.get(`https://deliriussapi-oficial.vercel.app/download/spotifydl?url=${url}`)
    res.status(200).json({
    status: true,
    data: response.data.data,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

// ===== MAKER

app.get("/api/bratv1", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const response = await axios.get(`https://api.siputzx.my.id/api/m/brat?text=${Enc(q)}`, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/bratv2", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const { bratv2 } = require('./search/functions')
    const bratImage = await bratv2(`${Enc(q)}`)
    const base64Image = bratImage.split(',')[1]
    const imageBuffer = Buffer.from(base64Image, 'base64')
    res.setHeader('Content-Type', 'image/png')
    res.send(imageBuffer)
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
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
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/blurimg", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    const response = await axios.get(`https://api.siputzx.my.id/api/m/blur?url=${url}`, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/beautiful", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    const response = await axios.get(`https://api.siputzx.my.id/api/m/beautiful?url=${url}`, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/facepalm", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    const response = await axios.get(`https://api.siputzx.my.id/api/m/facepalm?url=${url}`, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

// ===== TOOLS

app.get("/api/tinyurl", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    const response = await axios.get(`https://api.vreden.my.id/api/tinyurl?url=${url}`);
    res.status(200).json({
    status: true,
    data: response.data.result,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get('/api/remini', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    const { remini } = require('./search/functions')
    const resu = await remini(url, 'enhance');
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(resu);
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
});

app.get("/api/reminiv2", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const imgs = Buffer.from(response.data);
    const { reminiv2 } = require('./search/functions')
    const resu = await reminiv2(imgs, 'enhance');
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(resu);
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/recolor", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    const { remini } = require('./search/functions')
    const resu = await remini(url, 'recolor');
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(resu);
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
});

app.get("/api/dehaze", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    const { dehaze } = require('./search/functions')
    const resultImage = await dehaze(url);
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(resultImage);
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/ssweb", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    const response = await axios.get(`https://api.screenshotmachine.com/?key=f4fd50&url=${url}&device=tablet&dimension=480x800&format=png&cacheLimit=0&delay=200`, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
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
    res.status(500).json({ status: false, error: error.message })
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
    res.status(500).json({ status: false, error: error.message })
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
    res.status(500).json({ status: false, error: error.message })
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
    res.status(500).json({ status: false, error: error.message })
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
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/audio2txt", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }
  try {
    const { transcribe } = require('./search/functions')
    const response = await transcribe(`${url}`)
    res.status(200).json({
    status: true,
    result: response.text,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

/*
 * © Sanjaya
 * Vioo AI
 */