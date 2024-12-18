const express = require('express');
const { createCanvas } = require('canvas');
const app = express();

// Fungsi untuk menggambar halaman
function drawPage(text, isLeftPage) {
  const width = 800;  // Lebar kanvas
  const height = 600; // Tinggi kanvas
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

app.get('/left', (req, res) => {
  const { text } = req.query
  const image = drawPage(text, true);
  res.setHeader('Content-Type', 'image/png');
  res.send(image);
});

app.get('/right', (req, res) => {
  const { text } = req.query
  const image = drawPage(text, false);
  res.setHeader('Content-Type', 'image/png');
  res.send(image);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});