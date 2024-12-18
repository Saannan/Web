const express = require('express');
const cors = require('cors');
const { createCanvas, loadImage } = require('@napi-rs/canvas'); // Gunakan @napi-rs/canvas
const app = express();
app.use(cors());

// Fungsi untuk menggambar halaman dengan template
async function drawPage(text, isLeftPage, templateUrl) {
  const width = 800;
  const height = 600;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Muat gambar template
  const templateImage = await loadImage(templateUrl);

  // Gambar template sebagai latar belakang
  ctx.drawImage(templateImage, 0, 0, width, height);

  // Tambahkan margin untuk teks
  const margin = 50;

  // Tambahkan teks judul (Halaman Kiri atau Kanan)
  ctx.fillStyle = '#000';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(isLeftPage ? 'Halaman Kiri' : 'Halaman Kanan', width / 2, margin);

  // Tambahkan teks isi
  ctx.font = '16px Arial';
  ctx.textAlign = isLeftPage ? 'left' : 'right';
  const xPos = isLeftPage ? margin : width - margin;
  const lines = text.split('\n');
  lines.forEach((line, index) => {
    ctx.fillText(line, xPos, margin + 50 + index * 20);
  });

  // Tambahkan nomor halaman
  ctx.textAlign = 'center';
  ctx.fillText(isLeftPage ? '2' : '1', width / 2, height - margin);

  // Kembalikan buffer gambar
  return canvas.toBuffer('image/png');
}

// Endpoint untuk halaman kiri
app.get('/left', async (req, res) => {
  const text = req.query.text || 'Teks default';
  const templateUrl = 'https://pomf2.lain.la/f/h8qkr780.jpg'
  const image = await drawPage(text, true, templateUrl);
  res.setHeader('Content-Type', 'image/png');
  res.send(image);
});

// Endpoint untuk halaman kanan
app.get('/right', async (req, res) => {
  const text = req.query.text || 'Teks default';
  const templateUrl = 'https://pomf2.lain.la/f/klj33vp2.jpg'
  const image = await drawPage(text, false, templateUrl);
  res.setHeader('Content-Type', 'image/png');
  res.send(image);
});

// Jalankan server
module.exports = app;