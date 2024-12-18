const express = require('express');
const nodeHtmlToImage = require('node-html-to-image');

const app = express();
const PORT = 3000;

async function generateTextImage(text, align) {
  const htmlTemplate = `
    <div style="width: 800px; height: 600px; background: #fdf5e6; display: flex; align-items: center; justify-content: center; font-family: 'Times New Roman', serif;">
      <div style="width: 500px; text-align: ${align}; font-size: 20px; color: black; line-height: 1.8;">
        ${text.replace(/\n/g, '<br>')}
      </div>
    </div>
  `;

  return await nodeHtmlToImage({
    html: htmlTemplate,
    type: 'png',
  });
}

app.get('/nuliskanan', async (req, res) => {
  const { text } = req.query;
  if (!text) {
    return res.status(400).json({ message: 'Parameter "text" harus disertakan!' });
  }

  try {
    const buffer = await generateTextImage(text, 'right');
    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error memproses gambar');
  }
});

app.get('/nuliskiri', async (req, res) => {
  const { text } = req.query;
  if (!text) {
    return res.status(400).json({ message: 'Parameter "text" harus disertakan!' });
  }

  try {
    const buffer = await generateTextImage(text, 'left');
    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error memproses gambar');
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});