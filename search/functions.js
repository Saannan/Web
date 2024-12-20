const axios = require('axios')
const cheerio = require('cheerio')
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
const response = await axios.request(config);
return response.data;
}

async function feloask(query) {
const headers = {
"Accept": "*/*",
"User-Agent": "Postify/1.0.0",
"Content-Encoding": "gzip, deflate, br, zstd",
"Content-Type": "application/json",
}
const payload = {
query,
search_uuid: Date.now().toString() + Math.random().toString(36).substring(2, 15),
search_options: { langcode: "id-MM" },
search_video: true,
}
const response = await axios.post("https://api.felo.ai/search/threads", payload, {
headers,
timeout: 30000,
responseType: 'text',
})
const result = { answer: '', source: [] }
response.data.split('\n').forEach(line => {
if (line.startsWith('data:')) {
const data = JSON.parse(line.slice(5).trim())
if (data.data) {
if (data.data.text) {
result.answer = data.data.text.replace(/\d+/g, '')
}
if (data.data.sources) {
result.source = data.data.sources
}}}
})
return result
}

async function spotifys(query) {
const { data } = await axios.get(`https://www.bhandarimilan.info.np/spotisearch?query=${query}`);
const results = data.map(ft => ({
nama: ft.name,
artis: ft.artist,
rilis: ft.release_date,
durasi: ft.duration,
link: ft.link,
image: ft.image_url
}));
return results
}

async function bingS(query) {
const response = await axios.get(`https://www.bing.com/search?q=${query}`);
const html = response.data;
const $ = cheerio.load(html);
const results = [];
$('.b_algo').each((index, element) => {
const title = $(element).find('h2').text();
const link = $(element).find('a').attr('href');
const snippet = $(element).find('.b_caption p').text();
const image = $(element).find('.cico .rms_iac').attr('data-src');
results.push({
title,
link,
snippet,
image: image ? `https:${image}` : undefined
});
});
return results;
}

async function bingI(query) {
const response = await axios.get(`https://www.bing.com/images/search?q=${query}`);
const html = response.data;
const $ = cheerio.load(html);
const urls = [];
$(".imgpt > a").each((i, el) => {
urls[i] = $(el).attr("href");
});
const results = urls.map(url => ({
photo: `https://www.bing.com${url}`
}));
return results;
}

async function bingV(query) {
const { data } = await axios.get(`https://www.bing.com/videos/search?q=${query}`);
const $ = cheerio.load(data);
const videoDetails = [];
$('.mc_vtvc').each((index, element) => {
const title = $(element).find('.mc_vtvc_title strong').text();
const duration = $(element).find('.mc_bc_rc.items').first().text();
const views = $(element).find('.meta_vc_content').first().text();
const uploadDate = $(element).find('.meta_pd_content').first().text();
const channel = $(element).find('.mc_vtvc_meta_row_channel').text();
const link = $(element).find('a').attr('href');
videoDetails.push({
title,
duration,
views,
uploadDate,
channel,
link: `https://www.bing.com${link}`
});
});
return videoDetails;
}

async function ytdl(link, qualityIndex, typeIndex) {
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
}}

async function spotifydl(link) {
const headers = {
'authority': 'www.bhandarimilan.info.np',
'accept': '*/*',
'user-agent': 'Postify/1.0.0'
}
const { data } = await axios.get(`https://www.bhandarimilan.info.np/spotify?url=${link}`, { headers });
const { id, artists, title, album, cover, isrc, releaseDate } = data.metadata;
return {
id,
artists,
title,
album,
cover,
isrc,
releaseDate,
link: data.link
}}

async function remini(imageUrl, method) {
const Methods = ["enhance", "recolor", "dehaze"];
method = Methods.includes(method) ? method : Methods[0];
const url = `https://inferenceengine.vyro.ai/${method}`;
const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
const formData = new FormData();
formData.append("model_version", 1);
formData.append("image", imageResponse.data, {
filename: "enhance_image_body.jpg",
contentType: "image/jpeg"
});
const headers = {
...formData.getHeaders(),
"User-Agent": "okhttp/4.9.3",
"Connection": "Keep-Alive",
"Accept-Encoding": "gzip"
};
const response = await axios.post(url, formData, { headers, responseType: 'arraybuffer' });
return response.data;
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

async function bratv2(prompt) {
const url = 'https://www.bestcalculators.org/wp-admin/admin-ajax.php'
const headers = {
'authority': 'www.bestcalculators.org',
'accept': '*/*',
'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
'origin': 'https://www.bestcalculators.org',
'referer': 'https://www.bestcalculators.org/online-generators/brat-text-generator/',
'user-agent': 'Postify/1.0.0',
'x-requested-with': 'XMLHttpRequest'
}
const data = new URLSearchParams({
'action': 'generate_brat_text',
'text': prompt,
'fontSize': "100",
'blurLevel': "5"
})
const response = await axios.post(url, data.toString(), { headers })
return `data:image/png;base64,${response.data}`
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

module.exports = { ChatGPT, ChatGPTv2, feloask, spotifys, bingS, bingI, bingV, ytdl, remini, reminiv2, dehaze, bratv2, transcribe }