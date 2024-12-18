const express = require('express');
const { createCanvas } = require('canvas');

const app = express();
const PORT = 3000;

// Fungsi menggambar teks seperti halaman buku
function drawTextOnCanvas(text, align = 'left') {
  const width = 800; // Lebar canvas
  const height = 600; // Tinggi canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background mirip halaman buku
  ctx.fillStyle = '#fdf5e6'; // Warna kertas
  ctx.fillRect(0, 0, width, height);

  // Properti teks
  ctx.font = '20px Times New Roman';
  ctx.fillStyle = 'black';
  ctx.textAlign = align;

  // Posisi teks
  const marginX = align === 'right' ? 600 : 50; // Margin teks kanan/kiri
  const startY = 100; // Posisi awal teks
  const maxWidth = 700; // Lebar area teks (agar tidak melewati batas)
  const lineHeight = 30; // Jarak antar baris

  // Membagi teks menjadi baris
  const words = text.split(' ');
  let line = '';
  let y = startY;

  words.forEach((word) => {
    const testLine = line + word + ' ';
    const testWidth = ctx.measureText(testLine).width;
    if (testWidth > maxWidth) {
      ctx.fillText(line, marginX, y);
      line = word + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  });

  // Menulis baris terakhir
  ctx.fillText(line, marginX, y);

  return canvas.toBuffer('image/png');
}

// Endpoint rata kanan
app.get('/nuliskanan', (req, res) => {
  const { text } = req.query;
  if (!text) {
    return res.status(400).json({ message: 'Parameter "text" harus disertakan!' });
  }

  try {
    const buffer = drawTextOnCanvas(text, 'right');
    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (err) {
    console.error('Error memproses gambar:', err);
    res.status(500).send('Error memproses gambar');
  }
});

// Endpoint rata kiri
app.get('/nuliskiri', (req, res) => {
  const { text } = req.query;
  if (!text) {
    return res.status(400).json({ message: 'Parameter "text" harus disertakan!' });
  }

  try {
    const buffer = drawTextOnCanvas(text, 'left');
    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (err) {
    console.error('Error memproses gambar:', err);
    res.status(500).send('Error memproses gambar');
  }
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});