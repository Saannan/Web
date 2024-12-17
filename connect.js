const express = require('express');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Fungsi menggambar teks pada template
async function drawTextOnTemplate(templatePath, name, text, align) {
  const image = await loadImage(templatePath);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  ctx.font = '20px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = align;

  const nameX = align === 'right' ? 600 : 100;
  ctx.fillText(name, nameX, 50);

  const startX = align === 'right' ? 650 : 120;
  const startY = 150;
  const lineHeight = 35;

  const words = text.split(' ');
  let line = '';
  let y = startY;

  words.forEach((word) => {
    const testLine = line + word + ' ';
    const testWidth = ctx.measureText(testLine).width;
    if (testWidth > 400) {
      ctx.fillText(line, startX, y);
      line = word + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  });

  ctx.fillText(line, startX, y);

  return canvas.toBuffer('image/png');
}

// Endpoint nuliskanan
app.get('/nuliskanan', async (req, res) => {
  const { name, text } = req.query;
  if (!name || !text) {
    return res.status(400).json({ message: 'Parameter "name" dan "text" harus disertakan!' });
  }

  const templatePath = path.join(__dirname, 'image/template_kanan.jpg');
  try {
    const buffer = await drawTextOnTemplate(templatePath, name, text, 'right');
    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error dalam memproses gambar');
  }
});

// Endpoint nuliskiri
app.get('/nuliskiri', async (req, res) => {
  const { name, text } = req.query;
  if (!name || !text) {
    return res.status(400).json({ message: 'Parameter "name" dan "text" harus disertakan!' });
  }

  const templatePath = path.join(__dirname, 'image/template_kiri.jpg');
  try {
    const buffer = await drawTextOnTemplate(templatePath, name, text, 'left');
    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error dalam memproses gambar');
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});