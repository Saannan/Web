const express = require("express")
const axios = require("axios")
const app = express()
const PORT = 3000

function Enc(type) {
  return encodeURIComponent(type)
}

function Dec(type) {
  return decodeURIComponent(type)
}

// ===== AI

app.get("/api/openai", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
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
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const response = await axios.get(`https://api.siputzx.my.id/api/ai/llama?prompt=You%20name%20is%LuminAI&message=${Enc(q)}`)
    res.status(200).json({
    status: true,
    result: response.data.data
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/llamav1", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
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
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
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
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const { gemini } = require('./search/functions')
    const response = await gemini(`${Enc(q)}`)
    res.status(200).json({
    status: true,
    result: response
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/blackbox", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const { blackbox } = require('./search/functions')
    const response = await blackbox(`${Enc(q)}`)
    res.status(200).json({
    status: true,
    result: response.result
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/claude", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const prompt = 'Your name is Claude-AI and use Indonesian as your primary language.'
    const response= await axios.get(`https://api.siputzx.my.id/api/ai/llama?prompt=${Enc(prompt)}&message=${Enc(q)}`)
    res.status(200).json({
    status: true,
    result: response.data.data
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/simi", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const response = await axios.get(`https://api.agatz.xyz/api/simsimi?message=${Enc(q)}`)
    res.status(200).json({
    status: true,
    result: response.data.data
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/gpt4o", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const prompt = "Your name is GPT-4o"
    const response = await axios.get(`https://api.siputzx.my.id/api/ai/llama?prompt=${Enc(prompt)}&message=${Enc(q)}`)
    res.status(200).json({
    status: true,
    result: response.data.data
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/gpt4omini", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const prompt = "Your name is GPT-4o Mini"
    const response = await axios.get(`https://api.siputzx.my.id/api/ai/llama?prompt=${Enc(prompt)}&message=${Enc(q)}`)
    res.status(200).json({
    status: true,
    result: response.data.data
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/turbov1", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const prompt = "Your name is GPT Turbo"
    const response = await axios.get(`https://api.siputzx.my.id/api/ai/llama?prompt=${Enc(prompt)}&message=${Enc(q)}`)
    res.status(200).json({
    status: true,
    result: response.data.data
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/turbov2", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const prompt = "Your name is GPT Turbo Large"
    const response = await axios.get(`https://api.siputzx.my.id/api/ai/llama?prompt=${Enc(prompt)}&message=${Enc(q)}`)
    res.status(200).json({
    status: true,
    result: response.data.data
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/mistralv1", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
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
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
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
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
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
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
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
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const { meiliai } = require('./search/functions')
    const response = await meiliai(`${Enc(q)}`)
    res.status(200).json({
    status: true,
    result: response.results
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/islamai", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const { islamai } = require('./search/functions')
    const response = await islamai(`${Enc(q)}`)
    res.status(200).json({
    status: true,
    result: response.result
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/veniceai", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
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

app.get("/api/txt2imgv1", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const response = await axios.get(`https://fastrestapis.fasturl.cloud/aiimage/multimix?prompt=${Enc(q)}&model=dalle`, { responseType: 'arraybuffer' })
    res.setHeader('Content-Type', 'image/png')
    res.send(response.data)
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/txt2imgv2", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const response = await axios.get(`https://fastrestapis.fasturl.cloud/aiimage/multimix?prompt=${Enc(q)}&model=haiper_v2`, { responseType: 'arraybuffer' })
    res.setHeader('Content-Type', 'image/png')
    res.send(response.data)
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/txt2imgv3", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const { text2img } = require('./search/functions')
    const resimg = await text2img(q)
    const imageUrl = resimg.results[0]
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
    res.setHeader("Content-Type", "image/png")
    res.send(response.data)
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/aibaby", async (req, res) => {
  const { ayah, ibu, gender } = req.query
  if (!ayah || !ibu) {
    return res.status(400).json({ status: false, error: "(URL) Bapak and Emak is required" })
  }
  try {
    const { cbaby } = require('./search/functions')
    const imageUrl = await cbaby(ayah, ibu, gender || 'girl')
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
    res.setHeader('Content-Type', 'image/jpeg')
    res.send(response.data)
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/dystopia", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const response = await axios.get(`https://fastrestapis.fasturl.cloud/aiimage/flux/style?prompt=${Enc(q)}&style=AI%20Dystopia`, { responseType: 'arraybuffer' })
    res.setHeader('Content-Type', 'image/png')
    res.send(response.data)
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

// ===== SEARCH

app.get("/api/googlev1", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const response = await axios.get(`https://www.googleapis.com/customsearch/v1?q=${Enc(q)}&key=AIzaSyAajE2Y-Kgl8bjPyFvHQ-PgRUSMWgBEsSk&cx=e5c2be9c3f94c4bbb`)
    const items = response.data.items
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

app.get("/api/googlev2", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const { google } = require('./search/functions')
    const response = await google(`${Enc(q)}`)
    res.status(200).json({
    status: true,
    data: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/gimage", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const response = await axios.get(`https://api.siputzx.my.id/api/images?query=${Enc(q)}`)
    res.status(200).json({
    status: true,
    data: response.data.data,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/playstore", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/playstore?query=${Enc(q)}`)
    res.status(200).json({
    status: true,
    data: response.data.result,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/appstore", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const response = await axios.get(`https://deliriussapi-oficial.vercel.app/search/appstore?q=${Enc(q)}`)
    res.status(200).json({
    status: true,
    data: response.data,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/apkpure", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const { apkpure } = require('./search/functions')
    const response = await apkpure(`${Enc(q)}`)
    res.status(200).json({
    status: true,
    data: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/yts", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const { ytsearch } = require('./search/functions')
    const videos = await ytsearch(`${Dec(q)}`)
    res.status(200).json({
      status: true,
      data: videos
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/spotifys", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
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
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
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
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
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
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
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
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const { pinterest } = require('./search/functions')
    const response = await pinterest(`${Enc(q)}`)
    res.status(200).json({
    status: true,
    data: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/lirik", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const { srcLyrics } = require('./search/functions')
    const response = await srcLyrics(`${Enc(q)}`)
    res.status(200).json({
    status: true,
    data: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/sfilesrc", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const { sfilesrc } = require('./search/functions')
    const response = await sfilesrc(`${Enc(q)}`)
    res.status(200).json({
    status: true,
    data: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/gsmarena", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const response = await axios.get(`https://api.agatz.xyz/api/gsmarenas?message=${Enc(q)}`)
    res.status(200).json({
    status: true,
    data: response.data.data.data,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

// ===== DOWNLOADER

app.get("/api/ytdl", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const { ytdl } = require('./search/functions')
    const response = await ytdl(url)
    res.status(200).json({
    status: true,
    data: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/ytdlv2", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const { ytdlv2 } = require('./search/functions')
    const response = await ytdlv2(url, '360')
    res.status(200).json({
    status: true,
    data: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/ytmp4", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const { Ytmp4 } = require('./search/functions')
    const response = await Ytmp4(url)
    res.status(200).json({
    status: true,
    data: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/ytmp3", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const { Ytmp3 } = require('./search/functions')
    const response = await Ytmp3(url)
    res.status(200).json({
    status: true,
    data: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/fbdl", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/fbdl?url=${url}`)
    res.status(200).json({
    status: true,
    data: response.data.data,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/igdl", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/igdownload?url=${url}`)
    res.status(200).json({
    status: true,
    data: response.data.result.response.data,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/igdlv2", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const { igfbdl } = require('./search/functions')
    const response = await igfbdl(url)
    res.status(200).json({
    status: true,
    data: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/ttdl", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/tiktok?url=${url}`)
    res.status(200).json({
    status: true,
    data: response.data.result,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/ttdlv2", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const { tiktokdl } = require('./search/functions')
    const response = await tiktokdl(url)
    res.status(200).json({
    status: true,
    data: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/spotify", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const { spotifydl } = require('./search/functions')
    const response = await spotifydl(url)
    res.status(200).json({
    status: true,
    data: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/videy", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const response = await axios.get(`https://api.agatz.xyz/api/videydl?url=${url}`)
    res.status(200).json({
    status: true,
    data: response.data.data,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/twitter", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const response = await axios.get(`https://api.agatz.xyz/api/twitter?url=${url}`)
    res.status(200).json({
    status: true,
    data: response.data.data,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/terabox", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const { terabox } = require('./search/functions')
    const response = await terabox(url)
    res.status(200).json({
    status: true,
    data: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/threads", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const { threads } = require('./search/functions')
    const response = await threads(url)
    res.status(200).json({
    status: true,
    data: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/capcut", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const response = await axios.get(`https://fastrestapis.fasturl.cloud/downup/capcutdown?url=${url}`)
    res.status(200).json({
    status: true,
    data: response.data.result,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/mfdl", async (req, res) => {
  const { url } = req.query
  if (!url) return res.status(400).json({ status: false, error: "URL is required" })
  try {
    const response = await axios.get(`https://fastrestapis.fasturl.cloud/downup/mediafiredown?url=${url}`)
    const { cookie, creator, ...rest } = response.data
    res.status(200).json({
      status: true,
      data: rest,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/gdrive", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const response = await axios.get(`https://api.siputzx.my.id/api/d/gdrive?url=${url}`)
    res.status(200).json({
    status: true,
    data: response.data.data,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/getlirik", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const { getLyrics } = require('./search/functions')
    const response = await getLyrics(url)
    res.status(200).json({
    status: true,
    data: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/pastebin", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const { pastebin } = require('./search/functions')
    const response = await pastebin(url)
    res.status(200).json({
    status: true,
    data: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/sfiledl", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const { sfiledl} = require('./search/functions')
    const response = await sfiledl(url)
    res.status(200).json({
    status: true,
    data: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

// ===== MAKER

app.get("/api/bratv1", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const response = await axios.get(`https://brat.caliphdev.com/api/brat?text=${Enc(q)}`, { responseType: 'arraybuffer' })
    res.setHeader('Content-Type', 'image/png')
    res.send(response.data)
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
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const response = await axios.get(`https://dummyimage.com/600x400/000/fff&text=${Enc(q)}`, { responseType: 'arraybuffer' })
    res.setHeader('Content-Type', 'image/png')
    res.send(response.data)
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/blurimg", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const response = await axios.get(`https://api.siputzx.my.id/api/m/blur?url=${url}`, { responseType: 'arraybuffer' })
    res.setHeader('Content-Type', 'image/png')
    res.send(response.data)
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/beautiful", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const response = await axios.get(`https://api.siputzx.my.id/api/m/beautiful?url=${url}`, { responseType: 'arraybuffer' })
    res.setHeader('Content-Type', 'image/png')
    res.send(response.data)
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/facepalm", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const response = await axios.get(`https://api.siputzx.my.id/api/m/facepalm?url=${url}`, { responseType: 'arraybuffer' })
    res.setHeader('Content-Type', 'image/png')
    res.send(response.data)
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

// ===== TOOLS

app.get("/api/tinyurl", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/tinyurl?url=${url}`)
    res.status(200).json({
    status: true,
    data: response.data.result,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get('/api/remini', async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const { remini } = require('./search/functions')
    const resu = await remini(url, 'enhance')
    res.setHeader('Content-Type', 'image/jpeg')
    res.send(resu)
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/reminiv2", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imgs = Buffer.from(response.data)
    const { reminiv2 } = require('./search/functions')
    const resu = await reminiv2(imgs, 'enhance')
    res.setHeader('Content-Type', 'image/jpeg')
    res.send(resu)
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/recolor", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const { remini } = require('./search/functions')
    const resu = await remini(url, 'recolor')
    res.setHeader('Content-Type', 'image/jpeg')
    res.send(resu)
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/dehaze", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const { dehaze } = require('./search/functions')
    const resultImage = await dehaze(url)
    res.setHeader('Content-Type', 'image/jpeg')
    res.send(resultImage)
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/ssweb", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const response = await axios.get(`https://api.screenshotmachine.com/?key=f4fd50&url=${Enc(url)}&device=phone&dimension=480x800&format=jpg&cacheLimit=0&delay=200`, { responseType: 'arraybuffer' })
    res.setHeader('Content-Type', 'image/png')
    res.send(response.data)
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/iplookup", async (req, res) => {
  const { domain } = req.query
  if (!domain) {
    return res.status(400).json({ status: false, error: "Domain is required" })
  }
  try {
    const response = await axios.get(`https://fastrestapis.fasturl.cloud/tool/iplookup?query=${domain}`)
    res.status(200).json({
    status: true,
    data: response.data.result,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/checkip", async (req, res) => {
  const { ip } = req.query
  if (!ip) {
    return res.status(400).json({ status: false, error: "IP is required" })
  }
  try {
    const response = await axios.get(`https://fastrestapis.fasturl.cloud/tool/whoip?ip=${ip}`)
    res.status(200).json({
    status: true,
    data: response.data.result,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/cekipfull", async (req, res) => {
  const { ip } = req.query
  if (!ip) {
    return res.status(400).json({ status: false, error: "IP is required" })
  }
  try {
    const { cekip } = require('./search/functions')
    const response = await cekip(ip)
    res.status(200).json({
    status: true,
    data: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

// ===== CONVERT

app.get("/api/tobase64", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const response = Buffer.from(q).toString('base64')
    res.status(200).json({
    status: true,
    result: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/toutf8", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const response = Buffer.from(q, 'base64').toString('utf-8')
    res.status(200).json({
    status: true,
    result: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/tohex", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const response = Buffer.from(q).toString('hex')
    res.status(200).json({
    status: true,
    result: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/ghraw", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    if (!url.includes('github.com')) {
      res.status(400).json({ status: false, error: "Requires Github Raw URL" })}
    const rawUrl = url.replace('github.com', 'raw.githubusercontent.com').replace(/\/blob\/[^\/]+/, '').replace('/master', '').replace('/main', '')
    res.status(200).json({
    status: true,
    result: rawUrl,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/ghori", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    if (!url.includes('raw.githubusercontent.com')) {
      res.status(400).json({ status: false, error: "Requires Github Ori URL" })}
    const ghUrl = url.replace('raw.githubusercontent.com', 'github.com').replace(/\/([^\/]+)$/, '/blob/$1').replace('/master', '/blob/master').replace('/main', '/blob/main')
    res.status(200).json({
    status: true,
    result: ghUrl,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/audio2txt", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const { transcribe } = require('./search/functions')
    const response = await transcribe(url)
    res.status(200).json({
    status: true,
    result: response.text,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/tovurl", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const { shortUrlv1 } = require('./search/functions')
    const response = await shortUrlv1(url)
    res.status(200).json({
    status: true,
    result: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/toisgd", async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" })
  }
  try {
    const { shortUrlv2 } = require('./search/functions')
    const response = await shortUrlv2(url)
    res.status(200).json({
    status: true,
    result: response,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

// ===== Stalker

app.get("/api/github-userv1", async (req, res) => {
  const { username } = req.query
  if (!username) {
    return res.status(400).json({ status: false, error: "User is required" })
  }
  try {
    const response = await axios.get(`https://api.siputzx.my.id/api/stalk/github?user=${username}`)
    res.status(200).json({
    status: true,
    data: response.data.data,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/github-userv2", async (req, res) => {
  const { username } = req.query
  if (!username) {
    return res.status(400).json({ status: false, error: "Username is required" })
  }
  try {
    const response = await axios.get(`https://api.agatz.xyz/api/ghtstalk?name=${username}`)
    res.status(200).json({
    status: true,
    data: response.data.data,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/npm-stalk", async (req, res) => {
  const { pkgname } = req.query
  if (!pkgname) {
    return res.status(400).json({ status: false, error: "Pkgname is required" })
  }
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/npmstalk?query=${pkgname}`)
    res.status(200).json({
    status: true,
    data: response.data.result,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/tt-stalk", async (req, res) => {
  const { username } = req.query
  if (!username) {
    return res.status(400).json({ status: false, error: "Username is required" })
  }
  try {
    const response = await axios.get(`https://api.siputzx.my.id/api/stalk/tiktok?username=${username}`)
    res.status(200).json({
    status: true,
    data: response.data.data,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/yt-stalk", async (req, res) => {
  const { username } = req.query
  if (!username) {
    return res.status(400).json({ status: false, error: "Username is required" })
  }
  try {
    const response = await axios.get(`https://api.tioo.eu.org/download/youtubestalk?text=${username}`)
    res.status(200).json({
    status: true,
    data: response.data.result,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/ig-stalk", async (req, res) => {
  const { username } = req.query
  if (!username) {
    return res.status(400).json({ status: false, error: "Username is required" })
  }
  try {
    const response = await axios.get(`https://api.tioo.eu.org/download/igstalkfull?username=${username}`)
    res.status(200).json({
    status: true,
    data: response.data.result,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/ff-stalk", async (req, res) => {
  const { id } = req.query
  if (!id) {
    return res.status(400).json({ status: false, error: "Id is required" })
  }
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/ffstalk?id=${id}`)
    res.status(200).json({
    status: true,
    data: response.data.result,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/ml-stalk", async (req, res) => {
  const { id, zoneid } = req.query
  if (!id || !zoneid) {
    return res.status(400).json({ status: false, error: "Id and zoneid are required" })
  }
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/mlstalk?id=${id}&zoneid=${zoneid}`)
    res.status(200).json({
    status: true,
    data: response.data.result,
    })
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

// EPHOTO

app.get("/api/glitchtext", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const { ephoto } = require('./search/functions')
    const imageUrl = await ephoto('glitchtext', `${Enc(q)}`)
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
    res.setHeader('Content-Type', 'image/jpeg')
    res.send(response.data)
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/writetext", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const { ephoto } = require('./search/functions')
    const imageUrl = await ephoto('writetext', `${Enc(q)}`)
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
    res.setHeader('Content-Type', 'image/jpeg')
    res.send(response.data)
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/advancedglow", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const { ephoto } = require('./search/functions')
    const imageUrl = await ephoto('advancedglow', `${Enc(q)}`)
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
    res.setHeader('Content-Type', 'image/jpeg')
    res.send(response.data)
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/logomaker", async (req, res) => {
  const { q } = req.query
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" })
  }
  try {
    const { ephoto } = require('./search/functions')
    const imageUrl = await ephoto('logomaker', `${Enc(q)}`)
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
    res.setHeader('Content-Type', 'image/jpeg')
    res.send(response.data)
  } catch (error) {
    res.status(500).json({ status: false, error: error.message })
  }
})

app.get("/api/pixelglitch", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const { ephoto } = require('./search/functions')
    const imageUrl = await ephoto('pixelglitch', `${Enc(q)}`);
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
});

app.get("/api/neonglitch", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const { ephoto } = require('./search/functions')
    const imageUrl = await ephoto('neonglitch', `${Enc(q)}`);
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
});

app.get("/api/flagtext", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const { ephoto } = require('./search/functions')
    const imageUrl = await ephoto('flagtext', `${Enc(q)}`);
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
});

app.get("/api/flag3dtext", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const { ephoto } = require('./search/functions')
    const imageUrl = await ephoto('flag3dtext', `${Enc(q)}`);
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
});

app.get("/api/deletingtext", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const { ephoto } = require('./search/functions')
    const imageUrl = await ephoto('deletingtext', `${Enc(q)}`);
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
});

app.get("/api/sandsummer", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const { ephoto } = require('./search/functions')
    const imageUrl = await ephoto('sandsummer', `${Enc(q)}`);
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
});

app.get("/api/makingneon", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const { ephoto } = require('./search/functions')
    const imageUrl = await ephoto('makingneon', `${Enc(q)}`);
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
});

app.get("/api/royaltext", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ status: false, error: "Query is required" });
  }
  try {
    const { ephoto } = require('./search/functions')
    const imageUrl = await ephoto('royaltext', `${Enc(q)}`);
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})

/*
 * © Sanjaya
 * Vioo AI
 */