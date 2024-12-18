const express = require('express');
const cors = require('cors');
const { createCanvas } = require('@napi-rs/canvas'); // Ganti dengan 'canvas' jika tetap ingin menggunakannya

const app = express();
app.use(cors());

// Fungsi untuk menggambar halaman
function drawPage(text, isLeftPage) {
  const width = 800;
  const height = 600;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#FFF';
  ctx.fillRect(0, 0, width, height);

  const margin = 50;
  ctx.fillStyle = '#000';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(isLeftPage ? 'Halaman Kiri' : 'Halaman Kanan', width / 2, margin);

  ctx.font = '16px Arial';
  ctx.textAlign = isLeftPage ? 'left' : 'right';
  const xPos = isLeftPage ? margin : width - margin;
  const lines = text.split('\n');
  lines.forEach((line, index) => {
    ctx.fillText(line, xPos, margin + 50 + index * 20);
  });

  ctx.textAlign = 'center';
  ctx.fillText(isLeftPage ? '2' : '1', width / 2, height - margin);

  return canvas.toBuffer('image/png');
}

// Endpoint untuk halaman kiri
app.get('/left', (req, res) => {
  const text = req.query.text || 'Teks default';
  const image = drawPage(text, true);
  res.setHeader('Content-Type', 'image/png');
  res.send(image);
});

// Endpoint untuk halaman kanan
app.get('/right', (req, res) => {
  const text = req.query.text || 'Teks default';
  const image = drawPage(text, false);
  res.setHeader('Content-Type', 'image/png');
  res.send(image);
});

// Mulai server
module.exports = app;