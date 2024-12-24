const axios = require('axios')
const cheerio = require('cheerio')
const FormData = require('form-data')

async function ChatGPT(question, model) {
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

async function meiliai(query) {
const data = JSON.stringify({
"queries": [
{
"indexUid": "movies-en-US",
"q": query,
"attributesToHighlight": [
"*"
],
"highlightPreTag": "__ais-highlight__",
"highlightPostTag": "__/ais-highlight__",
"limit": 10,
"offset": 0,
"hybrid": {
"embedder": "small",
"semanticRatio": 0.5
},
"rankingScoreThreshold": 0.3
}]});
const config = {
method: 'POST',
url: 'https://edge.meilisearch.com/multi-search',
headers: {
'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
'Content-Type': 'application/json',
'accept-language': 'id-ID',
'referer': 'https://www.meilisearch.com/',
'authorization': 'Bearer 6287312fd043d3fca95136cd40483a26154d37dc99aa2e79417f88794a80cd1c',
'x-meilisearch-client': 'Meilisearch instant-meilisearch (v0.19.3) ; Meilisearch JavaScript (v0.41.0)',
'origin': 'https://www.meilisearch.com',
'sec-fetch-dest': 'empty',
'sec-fetch-mode': 'cors',
'sec-fetch-site': 'same-site',
'priority': 'u=4',
'te': 'trailers'
}, data: data };
const response = await axios.request(config);
return response.data
}

async function islamai(question) {
const url = 'https://vercel-server-psi-ten.vercel.app/chat';
const data = {
text: question,
array: [
{ content: "Assalamualaikum", role: "user" },
{ content: "Waalaikumsalam", role: "assistant" }
]};
const response = await axios.post(url, data, {
headers: {
'Content-Type': 'application/json',
'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
'Referer': 'https://islamandai.com/'
}})
return response.data
}

async function veniceai(question, model = "llama-3.3-70b") {
const data = JSON.stringify({
"requestId": "scrape-for-all",
"modelId": model,
"prompt": [{ "content": question, "role": "user" }],
"systemPrompt": "",
"conversationType": "text",
"temperature": 0.8,
"webEnabled": true,
"topP": 0.9,
"isCharacter": false,
"clientProcessingTime": 2834
})
const response = await axios.post('https://venice.ai/api/inference/chat', data, { headers: {
'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
'Content-Type': 'application/json',
'accept-language': 'id-ID',
'referer': 'https://venice.ai/chat',
'x-venice-version': '20241221.032412',
'origin': 'https://venice.ai',
'sec-fetch-dest': 'empty',
'sec-fetch-mode': 'cors',
'sec-fetch-site': 'same-origin',
'priority': 'u=4',
'te': 'trailers'
}})
const chunks = response.data
.split('\n')
.filter(chunk => chunk)
.map(chunk => JSON.parse(chunk))
const answer = chunks.map(chunk => chunk.content).join('')
return answer
}

async function flux(prompt, model = 1, size = 1, style = 1, color = 1, lighting = 1) {
const models = ["flux_1_schnell", "flux_1_dev", "sana_1_6b"];
const sizes = ["1_1", "1_1_HD", "1_2", "2_1", "2_3", "4_5", "9_16", "3_2", "4_3", "16_9"];
const styles = ["no_style", "anime", "digital", "fantasy", "neon_punk", "dark", "low_poly", "line_art", "pixel_art", "comic", "analog_film", "surreal"];
const colors = ["no_color", "cool", "muted", "vibrant", "pastel", "bw"];
const lightings = ["no_lighting", "lighting", "dramatic", "volumetric", "studio", "sunlight", "low_light", "golden_hour"];
const errors = [];
const formData = new FormData();
formData.append('prompt', prompt);
formData.append('model', models[model - 1]);
formData.append('size', sizes[size - 1]);
formData.append('style', styles[style - 1]);
formData.append('color', colors[color - 1]);
formData.append('lighting', lightings[lighting - 1]);
const response = await axios.post('https://api.freeflux.ai/v1/images/generate', formData, {
headers: {
'accept': 'application/json, text/plain, */*',
'content-type': 'multipart/form-data',
'origin': 'https://freeflux.ai',
'priority': 'u=1, i',
'referer': 'https://freeflux.ai/',
'user-agent': 'Postify/1.0.0'
}});
const { id, status, result, processingTime, width, height, nsfw, seed } = response.data;
return { id, status, result, processingTime, width, height, nsfw, seed }
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

async function srcLyrics(song) {
const { data } = await axios.get(`https://www.lyrics.com/lyrics/${song}`);
const $ = cheerio.load(data);
const result = $('.best-matches .bm-case').map((i, element) => {
const title = $(element).find('.bm-label a').first().text();
const artist = $(element).find('.bm-label a').last().text();
const album = $(element).find('.bm-label').eq(1).text().trim().replace(/\s+/g, ' ');
const imageUrl = $(element).find('.album-thumb img').attr('src');
const link = $(element).find('.bm-label a').first().attr('href');
return {
title,
artist,
album,
imageUrl,
link: `https://www.lyrics.com${link}`
};
}).get();
return result
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

async function igfbdl(link) {
const { data } = await axios.post(
'https://yt1s.io/api/ajaxSearch',
new URLSearchParams({ p: 'home', q: link, w: '', lang: 'en' }), { headers: {
'User-Agent': 'Postify/1.0.0',
'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
}, })
const $ = cheerio.load(data.data);
return $('a.abutton.is-success.is-fullwidth.btn-premium').map((_, el) => ({
title: $(el).attr('title'),
url: $(el).attr('href'),
})).get();
}

async function igdl(url) {
const data = `url=${encodeURIComponent(url)}&v=3&lang=en`
const config = {
method: 'POST',
url: 'https://api.downloadgram.org/media',
headers: {
'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
'Content-Type': 'application/x-www-form-urlencoded',
'accept-language': 'id-ID',
'referer': 'https://downloadgram.org/',
'origin': 'https://downloadgram.org',
'sec-fetch-dest': 'empty',
'sec-fetch-mode': 'cors',
'sec-fetch-site': 'same-site',
'priority': 'u=0',
'te': 'trailers',
},
data: data,
};
const response = await axios.request(config);
const $ = cheerio.load(response.data);
let mediaInfo = {};
if ($('video').length) {
mediaInfo.videoUrl = $('video source').attr('src');
mediaInfo.downloadUrl = $('a[download]').attr('href');
mediaInfo.posterUrl = $('video').attr('poster');
} else if ($('img').length) {
mediaInfo.imageUrl = $('img').attr('src');
mediaInfo.downloadUrl = $('a[download]').attr('href');
}
for (let key in mediaInfo) {
if (mediaInfo.hasOwnProperty(key)) {
mediaInfo[key] = mediaInfo[key].replace(/\\\\"/g, '').replace(/\\"/g, '');
}}
return mediaInfo;
}

async function tiktokdl(link, type = 'video') {
const headers = {
"authority": "ttsave.app",
"accept": "application/json, text/plain, */*",
"origin": "https://ttsave.app",
"referer": type === 'mp3' ? 'https://ttsave.app/en/mp3' : 'https://ttsave.app/en',
"user-agent": "Postify/1.0.0",
};
const parse = ($) => {
const uniqueId = $('#unique-id').val();
const nickname = $('h2.font-extrabold').text();
const profilePic = $('img.rounded-full').attr('src');
const username = $('a.font-extrabold.text-blue-400').text();
const description = $('p.text-gray-600').text();
const dlink = {
nowm: $('a.w-full.text-white.font-bold').first().attr('href'),
wm: $('a.w-full.text-white.font-bold').eq(1).attr('href'),
audio: $('a[type="audio"]').attr('href'),
profilePic: $('a[type="profile"]').attr('href'),
cover: $('a[type="cover"]').attr('href')
};
const stats = {
plays: '',
likes: '',
comments: '',
shares: ''
};
$('.flex.flex-row.items-center.justify-center').each((index, element) => {
const $element = $(element);
const svgPath = $element.find('svg path').attr('d');
const value = $element.find('span.text-gray-500').text().trim();
if (svgPath && svgPath.startsWith('M10 18a8 8 0 100-16')) {
stats.plays = value;
} else if (svgPath && svgPath.startsWith('M3.172 5.172a4 4 0 015.656')) {
stats.likes = value || '0';
} else if (svgPath && svgPath.startsWith('M18 10c0 3.866-3.582')) {
stats.comments = value;
} else if (svgPath && svgPath.startsWith('M17.593 3.322c1.1.128')) {
stats.shares = value;
}});
const songTitle = $('.flex.flex-row.items-center.justify-center.gap-1.mt-5')
.find('span.text-gray-500')
.text()
.trim();
const slides = $('a[type="slide"]').map((i, el) => ({
number: i + 1,
url: $(el).attr('href')
})).get();
return {
uniqueId,
nickname,
profilePic,
username,
description,
dlink,
stats,
songTitle,
slides
}};
const data = { "query": link, "language_id": "1" };
const response = await axios.post('https://ttsave.app/download', data, { headers });
const $ = cheerio.load(response.data);
const result = parse($);
if (type === 'video') {
return {
type: 'video',
...result,
videoInfo: {
nowm: result.dlink.nowm,
wm: result.dlink.wm,
}}} else if (type === 'mp3') {
return {
type: 'audio',
uniqueId: result.uniqueId,
nickname: result.nickname,
username: result.username,
songTitle: result.songTitle,
description: result.description,
stats: result.stats,
audioUrl: result.dlink.audio,
coverUrl: result.dlink.cover,
profilePic: result.profilePic
}} else if (type === 'slide') {
return {
type: 'slide',
uniqueId: result.uniqueId,
nickname: result.nickname,
username: result.username,
description: result.description,
stats: result.stats,
songTitle: result.songTitle,
slides: result.slides,
profilePic: result.profilePic,
coverUrl: result.dlink.cover
}}
}

async function getLyrics(url) {
const { data } = await axios.get(url);
const $ = cheerio.load(data);
const artistImage = $('#featured-artist-avatar img').attr('src');
const about = $('.artist-meta .bio').text().trim();
const year = $('.lyric-details dt:contains("Year:") + dd').text().trim();
const playlists = $('.lyric-details dt:contains("Playlists") + dd a').text().trim();
const lyrics = $('#lyric-body-text').text().trim();
const result = {
artistImage,
about,
year,
playlists,
lyrics
};
return result;
}

async function pastebin(url) {
let rawUrl = url;
if (!url.includes('/raw/')) {
const pasteId = url.split('/').pop();
rawUrl = `https://pastebin.com/raw/${pasteId}`;
}
const response = await axios.get(rawUrl);
return response.data;
}

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

module.exports = { ChatGPT, feloask, meiliai, islamai, veniceai, flux, spotifys, bingS, bingI, bingV, srcLyrics, ytdl, igfbdl, igdl, tiktokdl, getLyrics, pastebin, remini, reminiv2, dehaze, bratv2, transcribe }