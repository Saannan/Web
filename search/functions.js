const axios = require('axios')
const FormData = require('form-data')

async function ChatGPT(message, model = "gpt-4o") {
    const modelx = ["gpt-3.5-turbo", "gpt-3.5-turbo-0125", "gpt-4o-mini", "gpt-4o"];
    const payload = {
      messages: [{
        role: "user",
        content: message
      }],
      model: model
    };
    const response = await axios.post("https://mpzxsmlptc4kfw5qw2h6nat6iu0hvxiw.lambda-url.us-east-2.on.aws/process", payload, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Postify/1.0.0'
      }
    });
    return response.data;
}

async function ChatGPTv2(question, model) {
  const validModels = ["openai", "llama", "mistral", "mistral-large"];
  const data = JSON.stringify({
    messages: [question],
    character: model
  });
  const config = {
    method: 'POST',
    url: 'https://chatsandbox.com/api/chat',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
      'Content-Type': 'application/json',
      'accept-language': 'id-ID',
      'referer': `https://chatsandbox.com/chat/${model}`,
      'origin': 'https://chatsandbox.com',
      'alt-used': 'chatsandbox.com',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'priority': 'u=0',
      'te': 'trailers',
      'Cookie': '_ga_V22YK5WBFD=GS1.1.1734654982.3.0.1734654982.0.0.0; _ga=GA1.1.803874982.1734528677'
    },
    data: data
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

async function Ytdl(link, qualityIndex, typeIndex) {
const qualities = {
audio: { 1: '32', 2: '64', 3: '128', 4: '192' },
video: { 1: '144', 2: '240', 3: '360', 4: '480', 5: '720', 6: '1080', 7: '1440', 8: '2160' }
};
const headers = {
accept: '*/*',
referer: 'https://ytshorts.savetube.me/',
origin: 'https://ytshorts.savetube.me/',
'user-agent': 'Postify/1.0.0',
'Content-Type': 'application/json'
};
const cdn = () => Math.floor(Math.random() * 11) + 51;
const type = typeIndex === 1 ? 'audio' : 'video';
const quality = qualities[type][qualityIndex];
const cdnNumber = cdn();
const cdnUrl = `cdn${cdnNumber}.savetube.su`;
const videoInfoResponse = await axios.post(
`https://${cdnUrl}/info`, { url: link }, { headers: { ...headers, authority: `cdn${cdnNumber}.savetube.su` } });
const videoInfo = videoInfoResponse.data.data;
const body = {
downloadType: type,
quality,
key: videoInfo.key
};
const downloadResponse = await axios.post(
`https://${cdnUrl}/download`,
body,
{ headers: { ...headers, authority: `cdn${cdnNumber}.savetube.su` } }
);
const downloadData = downloadResponse.data.data;
return {
link: downloadData.downloadUrl,
duration: videoInfo.duration,
durationLabel: videoInfo.durationLabel,
fromCache: videoInfo.fromCache,
id: videoInfo.id,
key: videoInfo.key,
thumbnail: videoInfo.thumbnail,
thumbnail_formats: videoInfo.thumbnail_formats,
title: videoInfo.title,
titleSlug: videoInfo.titleSlug,
videoUrl: videoInfo.url,
quality,
type
};
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

async function transcribe(url) {
    const formData = new FormData()
    const response = await axios.get(url, { responseType: 'stream' })
    const roar = url.split('/').pop()
    formData.append('file', response.data, {
      filename: roar,
      contentType: 'audio/mpeg'
    })
    const config = {
      headers: {
        ...formData.getHeaders(),
        'authority': 'api.talknotes.io',
        'accept': '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'origin': 'https://talknotes.io',
        'referer': 'https://talknotes.io/',
        'User-Agent': 'Postify/1.0.0'
      },
      maxBodyLength: Infinity
    }
    const respons = await axios.post(
      'https://api.talknotes.io/tools/converter',
      formData,
      config
    )
    return respons.data
}

module.exports = { ChatGPT, ChatGPTv2, Ytdl, reminiv2, recolor, dehaze, transcribe }