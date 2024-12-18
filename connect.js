const express = require('express');
const { createCanvas } = require('canvas');

const app = express();
const PORT = 3000;

// Fungsi untuk menggambar teks mirip buku
async function drawTextOnCanvas(text, align) {
  const width = 800; // Lebar canvas
  const height = 600; // Tinggi canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background mirip halaman buku
  ctx.fillStyle = '#fdf5e6'; // Warna kertas
  ctx.fillRect(0, 0, width, height);

  // Properti teks
  ctx.font = '20px "Times New Roman"';
  ctx.fillStyle = 'black';
  ctx.textAlign = align;

  // Area teks
  const startX = align === 'right' ? 600 : 50; // Margin kanan/kiri
  const startY = 100; // Posisi awal teks
  const maxWidth = 500; // Lebar area teks
  const lineHeight = 30; // Jarak antar baris

  // Membagi teks menjadi baris-baris
  const words = text.split(' ');
  let line = '';
  let y = startY;

  words.forEach((word) => {
    const testLine = line + word + ' ';
    const testWidth = ctx.measureText(testLine).width;
    if (testWidth > maxWidth) {
      ctx.fillText(line, startX, y);
      line = word + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  });

  // Gambar baris terakhir
  ctx.fillText(line, startX, y);

  // Kembalikan buffer gambar
  return canvas.toBuffer('image/png');
}

// Endpoint untuk menulis teks dengan rata kanan
app.get('/nuliskanan', async (req, res) => {
  const { text } = req.query;
  if (!text) {
    return res.status(400).json({ message: 'Parameter "text" harus disertakan!' });
  }

  try {
    const buffer = await drawTextOnCanvas(text, 'right');
    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error memproses gambar');
  }
});

// Endpoint untuk menulis teks dengan rata kiri
app.get('/nuliskiri', async (req, res) => {
  const { text } = req.query;
  if (!text) {
    return res.status(400).json({ message: 'Parameter "text" harus disertakan!' });
  }

  try {
    const buffer = await drawTextOnCanvas(text, 'left');
    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error memproses gambar');
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});