const axios = require('axios')
const FormData = require('form-data')

async function remini(imageBuffer) {
const formData = new FormData();
formData.append('image', imageBuffer, {
filename: 'upload.png',
contentType: 'image/png',
});
const response = await axios.post(
'https://www.videotok.app/api/free-restore-image', formData, {
headers: {
...formData.getHeaders(),
}, });
const { imageUrl } = response.data;
return imageUrl;
}

async function reminiv2(imageData, action) {
let actions = ['enhance', 'recolor', 'dehaze'];
if (!actions.includes(action)) action = 'enhance';
const url = `https://inferenceengine.vyro.ai/${action}`;
const formData = new FormData();
formData.append('model_version', '1');
formData.append('image', imageData, 'enhance_image_body.jpg');
const response = await axios.post(url, formData, {
headers: {
...formData.getHeaders(),
'User-Agent': 'okhttp/4.9.3',
}, responseType: 'arraybuffer', });
return response.data;
}

async function recolor(imageUrl) {
const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
const imageBuffer = Buffer.from(imageResponse.data, 'binary');
const form = new FormData();
form.append('image', imageBuffer, { filename: 'image.jpg' });
form.append('output_format', 'jpg');
form.append('mode', 'Rec709');
const response = await axios.post('https://www.ailabapi.com/api/image/enhance/image-color-enhancement', form, { headers: {'ailabapi-api-key': 'arGCBImqk9ePHroLEAuzdT3xln52QORi8WFsQXO1Dj6UbN30P1Kw5CsWNyf2vVtS', ...form.getHeaders(),
},});
return response.data.data.image_url;
}

async function dehaze(imageUrl) {
const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
const imageBuffer = Buffer.from(imageResponse.data, 'binary');
const filename = imageUrl.split('/').pop();
const form = new FormData();
form.append('image', imageBuffer, { filename: filename });
const response = await axios.post('https://www.ailabapi.com/api/image/enhance/image-defogging', form, { headers: {
'ailabapi-api-key': 'arGCBImqk9ePHroLEAuzdT3xln52QORi8WFsQXO1Dj6UbN30P1Kw5CsWNyf2vVtS', ...form.getHeaders(),
}});
return Buffer.from(response.data.image, 'base64');
}

module.exports = { remini, reminiv2, recolor, dehaze  }
