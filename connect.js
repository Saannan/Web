const express = require('express');
const cors = require('cors');
const { createCanvas, loadImage } = require('@napi-rs/canvas');
const app = express();
app.use(cors());

const templatePath = './template.png'; // Path template gambar buku tulis

async function drawPage(text, isLeftPage, templateUrl) {
  const width = 800;
  const height = 600;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Muat gambar template
  const templateImage = await loadImage(templateUrl);

  // Gambar template sebagai latar belakang
  ctx.drawImage(templateImage, 0, 0, width, height);

  // Penyesuaian margin agar teks mengikuti garis
  const marginX = isLeftPage ? 80 : 700; // Margin untuk kiri atau kanan
  const marginY = 100; // Awal garis vertikal
  const lineHeight = 30; // Jarak antar garis horizontal

  // Tulis judul halaman
  ctx.fillStyle = '#000';
  ctx.font = 'bold 24px Arial';  // Menggunakan font default Arial
  ctx.textAlign = 'center';
  ctx.fillText(isLeftPage ? 'Halaman Kiri' : 'Halaman Kanan', width / 2, 50);

  // Tulis teks isi per baris menggunakan font default
  ctx.font = '16px Arial';  // Menggunakan font default Arial
  ctx.textAlign = 'left';
  const lines = text.split('\n');
  lines.forEach((line, index) => {
    ctx.fillText(line, marginX, marginY + index * lineHeight);
  });

  // Tulis nomor halaman
  ctx.textAlign = 'center';
  ctx.fillText(isLeftPage ? '2' : '1', width / 2, height - 50);

  return canvas.toBuffer('image/png');
}

app.get('/left', async (req, res) => {
  const text = req.query.text || 'Teks default';
  const image = await drawPage(text, true, 'https://pomf2.lain.la/f/h8qkr780.jpg');
  res.setHeader('Content-Type', 'image/png');
  res.send(image);
});

app.get('/right', async (req, res) => {
  const text = req.query.text || 'Teks default';
  const image = await drawPage(text, false, 'https://pomf2.lain.la/f/klj33vp2.jpg');
  res.setHeader('Content-Type', 'image/png');
  res.send(image);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});