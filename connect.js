const express = require('express');
const { createCanvas } = require('@napi-rs/canvas');

const app = express();
const PORT = 3000;

// Fungsi untuk wrap teks otomatis
function wrapText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + " ";
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && i > 0) {
      context.fillText(line, x, y);
      line = words[i] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}

app.get("/a", async (req, res) => {
  const { text } = req.query; // Input teks dari query

  // Ukuran canvas
  const width = 500; // Lebar canvas
  const height = 500; // Tinggi canvas

  // Buat canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Background putih
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);

  // Tambahkan blur/buram tipis
  ctx.filter = "blur(0.8px)";

  // Font mirip WhatsApp
  ctx.fillStyle = "black";
  ctx.font = "normal 20px sans-serif"; // Font biasa, ukuran menyesuaikan
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  // Tulis teks dengan wrapping otomatis
  const x = 20; // Margin kiri
  const y = 20; // Posisi awal vertikal
  const lineHeight = 30; // Jarak antar baris
  const maxWidth = width - 40; // Lebar maksimal teks

  wrapText(ctx, text, x, y, maxWidth, lineHeight);

  // Kirim gambar sebagai response
  res.setHeader("Content-Type", "image/png");
  const buffer = await canvas.encode("png");
  res.send(buffer);
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});