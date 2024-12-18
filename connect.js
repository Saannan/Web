const express = require('express');
const { createCanvas } = require('@napi-rs/canvas');

const app = express();
const PORT = 3000;

// Route utama
app.get("/a", async (req, res) => {
  const { text } = req.query; // Teks input dari query

  // Ukuran canvas
  const width = 300; // Lebar sesuai contoh
  const height = 300; // Tinggi sesuai contoh

  // Buat canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Background putih
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);

  // Tambahkan blur halus
  ctx.filter = "blur(0.3px)";

  // Font dan style teks
  ctx.fillStyle = "black";
  ctx.font = "bold 70px Arial"; // Font tebal dan besar
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  // Pisahkan teks menjadi baris jika ada spasi
  const lines = text.split(" ");
  let y = 20; // Posisi awal teks secara vertikal

  // Gambar tiap baris teks
  lines.forEach((line) => {
    ctx.fillText(line, 20, y);
    y += 90; // Jarak antar baris
  });

  // Kirim gambar sebagai response
  res.setHeader("Content-Type", "image/png");
  const buffer = await canvas.encode("png");
  res.send(buffer);
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});