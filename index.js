const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname)));

// ChatGPT-4 API
app.get("/api/gpt4o", async (req, res) => {
  const { message } = req.query;
  if (!message) {
    return res.status(400).json({ status: false, error: "Message is required" });
  }

  try {
    const apiUrl = `https://api.agatz.xyz/api/gpt4o?message=${encodeURIComponent(message)}`;
    const response = await axios.get(apiUrl);
    res.status(200).json({ status: true, result: response.data.data.result });
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed to fetch ChatGPT-4 API" });
  }
});

// IP Lookup API
app.get("/api/iplookup", async (req, res) => {
  const { ip } = req.query;
  if (!ip) {
    return res.status(400).json({ status: false, error: "IP address is required" });
  }

  try {
    const apiUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=YOUR_API_KEY&ip=${encodeURIComponent(ip)}`;
    const response = await axios.get(apiUrl);
    res.status(200).json({ status: true, result: response.data });
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed to fetch IP Lookup API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});