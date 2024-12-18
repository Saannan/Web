const express = require('express');
const cors = require('cors');
const { createCanvas, registerFont } = require('@napi-rs/canvas');
const app = express();
app.use(cors());

// Daftarkan font tulisan tangan (gantilah 'Handwriting.ttf' dengan file font kamu)
registerFont('./dpdork.ttf', { family: 'Handwriting' });

async function drawPage(text, isLeftPage) {
  const width = 800;
  const height = 600;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Gambar latar belakang halaman buku (warna putih)
  ctx.fillStyle = '#FFF';
  ctx.fillRect(0, 0, width, height);

  // Gambar garis vertikal untuk pembatas kolom buku tulis
  const marginX = 80; // Margin kiri
  const lineSpacing = 30; // Jarak antar garis

  // Gambar garis vertikal kiri dan kanan
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(marginX, 50); // Garis kiri
  ctx.lineTo(marginX, height - 50); // Garis kiri hingga bawah
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(width - 80, 50); // Garis kanan
  ctx.lineTo(width - 80, height - 50); // Garis kanan hingga bawah
  ctx.stroke();

  // Gambar garis horizontal (garis buku tulis)
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 1;
  for (let i = 0; i < 20; i++) {
    ctx.beginPath();
    ctx.moveTo(marginX, 100 + i * lineSpacing); // Mulai dari margin kiri dan tinggi 100px
    ctx.lineTo(width - 80, 100 + i * lineSpacing); // Hingga margin kanan
    ctx.stroke();
  }

  // Tulis judul halaman
  ctx.fillStyle = '#000';
  ctx.font = 'bold 24px Handwriting';  // Gunakan font handwriting
  ctx.textAlign = 'center';
  ctx.fillText(isLeftPage ? 'Halaman Kiri' : 'Halaman Kanan', width / 2, 50);

  // Tulis teks isi per baris menggunakan font handwriting
  ctx.font = '16px Handwriting';  // Gunakan font handwriting
  ctx.textAlign = 'left';
  const lines = text.split('\n');
  let currentY = 100 + lineSpacing; // Posisi awal teks (setelah judul)

  lines.forEach((line, index) => {
    if (currentY < height - 50) {
      ctx.fillText(line, marginX + 5, currentY);  // Sedikit geser ke kanan agar teks tidak menyentuh margin
      currentY += lineSpacing;
    }
  });

  // Tulis nomor halaman
  ctx.textAlign = 'center';
  ctx.fillText(isLeftPage ? '2' : '1', width / 2, height - 50);

  return canvas.toBuffer('image/png');
}

app.get('/left', async (req, res) => {
  const text = req.query.text || 'Teks default';
  const image = await drawPage(text, true);
  res.setHeader('Content-Type', 'image/png');
  res.send(image);
});

app.get('/right', async (req, res) => {
  const text = req.query.text || 'Teks default';
  const image = await drawPage(text, false);
  res.setHeader('Content-Type', 'image/png');
  res.send(image);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});