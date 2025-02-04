const axios = require('axios')
const cheerio = require('cheerio')
const FormData = require('form-data')
const ytSearch = require('yt-search')

async function ChatGPT(question, model) {
const validModels = ["openai", "llama", "mistral", "mistral-large"]
const data = JSON.stringify({
messages: [question],
character: model
})
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
}
const response = await axios.request(config)
return response.data
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
}]})
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
}, data: data }
const response = await axios.request(config)
return response.data
}

async function islamai(question) {
const url = 'https://vercel-server-psi-ten.vercel.app/chat'
const data = {
text: question,
array: [
{ content: "Assalamualaikum", role: "user" },
{ content: "Waalaikumsalam", role: "assistant" }
]}
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

async function cbaby(urlBapak, urlEmak, gender = 'girl') {
const _fetch = async (urls) => {
const response = await axios.get(urls, { responseType: 'arraybuffer' })
return `data:image/jpeg;base64,${Buffer.from(response.data).toString('base64')}`
}
const heatod = {
'content-type': 'application/json',
'origin': 'https://ai-baby-generator.net',
'referer': 'https://ai-baby-generator.net/in',
'user-agent': 'Postify/1.0.0',
}
const fotobapak = await _fetch(urlBapak)
const fotoemak = await _fetch(urlEmak)
const gdata = {
"0": {
"json": {
"fatherImage": fotobapak,
"motherImage": fotoemak,
"gender": gender,
}, },
}
const res2 = await axios.post('https://ai-baby-generator.net/api/ai.generateImage?batch=1', gdata, { headers: heatod })
const _id = res2.data[0].result.data.json.taskId
const _url = 'https://ai-baby-generator.net/api/ai.getTask?batch=1'
let result
do {
await new Promise((resolve) => setTimeout(resolve, 5000))
const _data = {
"0": {
"json": {
"taskId": _id,
}, },
}
const taskResponse = await axios.post(_url, _data, { headers: heatod })
result = taskResponse.data[0].result.data.json
} while (result.status !== 'SUCCEED')
return result.imageUrl
}

async function text2img(prompt) {
const requestData = JSON.stringify({ "prompt": prompt })
const requestConfig = {
method: 'POST',
url: 'https://imgsys.org/api/initiate',
headers: {
'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
'Content-Type': 'application/json',
'accept-language': 'id-ID',
'referer': 'https://imgsys.org/',
'origin': 'https://imgsys.org',
'sec-fetch-dest': 'empty',
'sec-fetch-mode': 'cors',
'sec-fetch-site': 'same-origin',
'priority': 'u=0',
'te': 'trailers'
},
data: requestData
}
try {
const initiateResponse = await axios.request(requestConfig)
const { requestId } = initiateResponse.data
let imageResponse
do {
imageResponse = await axios.get(`https://imgsys.org/api/get?requestId=${requestId}`)
if (imageResponse.data.message) {
await new Promise(resolve => setTimeout(resolve, 1000))
}
} while (imageResponse.data.message)
return imageResponse.data
} catch (e) {
console.error('Error:', e)
throw e
}}

async function gemini(query) {
try {
const res = await axios.post("https://fastrestapis.fasturl.cloud/aillm/gemini/chat", { ask: query }, { headers: { accept: "application/json", "Content-Type": "application/json" }})
return res.data.result
} catch (err) {
console.error(err.message)
}}

async function blackbox(content) {
try {
const response = await axios.post('https://luminai.my.id/', { content, cName: "Vioo", cID: "Vioo0Uf9A72" })
return response.data
} catch (error) {
console.error(error)
throw error
}}

async function google(query) {
const encodedQuery = encodeURIComponent(query)
const url = `https://www.google.com/search?q=${encodedQuery}`
const { data } = await axios.get(url, {
headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}})
const $ = cheerio.load(data)
const results = []
$('div.tF2Cxc').each((index, element) => {
const title = $(element).find('h3').text()
const link = $(element).find('a').attr('href')
const snippet = $(element).find('.VwiC3b').text()
if (title && link) {
results.push({ title, link, snippet })
}})
return results
}

async function apkpure(text) {
let url = `https://apkpure.net/id/search?q=${text}`
let { data } = await axios.get(url)
let $ = cheerio.load(data)
let results = []
$('a.apk-item').each((_, el) => {
let title = $(el).find('div.title').text().trim()
let dev = $(el).find('div.dev').text().trim()
let rating = $(el).find('span.stars').text().trim()
let link = 'https://apkpure.net' + $(el).attr('href')
if (title && dev && rating && link) {
results.push({
title,
developer: dev,
rating,
link
})}
})
return results
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

async function spotifydl(url) {
const hai = await axios.get(`https://api.fabdl.com/spotify/get?url=${encodeURIComponent(url)}`)
const hao = await axios.get(`https://api.fabdl.com/spotify/mp3-convert-task/${hai.data.result.gid}/${hai.data.result.id}`)
return {
title: hai.data.result.name,
download: `https://api.fabdl.com${hao.data.result.download_url}`,
image: hai.data.result.image,
duration_ms: hai.data.result.duration_ms
}}

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

async function pinterest(query) {
const options = {
query,
scope: "pins",
redux_normalize_feed: true,
page_size: 50
}
const response = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=/search/pins/?q=${encodeURIComponent(query)}&data=${encodeURIComponent(JSON.stringify({ options, context: {}
}))}&_=${Date.now()}`, { headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
'X-Requested-With': 'XMLHttpRequest' }})
const data = response.data.resource_response?.data?.results || []
const results = data.map(item => ({
src: item.images.orig?.url || item.images['564x']?.url || '',
title: item.rich_metadata?.title || item.grid_title || '',
link: `https://www.pinterest.com/pin/${item.id}`,
source: item.rich_metadata?.site_name || item.domain || ''
})).filter(item => item.src)
return results
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

async function sfilesrc(teks) {
try {
const response = await axios.get(`https://sfile-api.vercel.app/search/${encodeURIComponent(teks)}`)
if (response.data) {
const { data } = response.data.data
return {
files: data.map(file => ({
icon: file.icon,
size: file.size,
title: file.title,
id: 'https://sfile.mobi/'+file.id
}))
}}
} catch (e) {
console.error('Error: '+e)
return null
}}

async function ytsearch(query) {
try {
const searchResults = await ytSearch.search(query)
const videos = searchResults.videos.map(video => ({
title: video.title,
description: video.description,
url: video.url,
videoId: video.videoId,
timestamp: video.timestamp,
duration: video.duration,
ago: video.ago,
views: video.views,
author: {
name: video.author.name,
url: video.author.url,
verified: video.author.verified
},
image: video.image,
thumbnail: video.thumbnail
}))

return videos
} catch (error) {
console.error("Error during YouTube search:", error)
return []
}
}

async function ytdl(link) {
try {
const result = await axios.get(`https://ytdl.vreden.web.id/metadata?url=${link}`)
return {
status: true,
...result.data
}} catch (error) {
return {
status: false,
message: error.message
}}}

const formatAudio = ['mp3', 'm4a', 'webm', 'acc', 'flac', 'opus', 'ogg', 'wav'];
const formatVideo = ['360', '480', '720', '1080', '1440', '4k'];

async function cekProgress(id) {
const configProgress = {
method: 'GET',
url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}}
while (true) {
const response = await axios.request(configProgress);
if (response.data && response.data.success && response.data.progress === 1000) {
return response.data.download_url;
}
await new Promise(resolve => setTimeout(resolve, 5000));
}}

async function ytdlv2(url, format) {
if (!formatAudio.includes(format) && !formatVideo.includes(format)) {
throw new Error('Format nya gak valid bro.');
}
const configDownload = {
method: 'GET',
url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`, headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}};
const response = await axios.request(configDownload);
if (response.data && response.data.success) {
const { id, title, info } = response.data;
const { image } = info;
const downloadUrl = await cekProgress(id);
return {
id: id,
image: image,
title: title,
downloadUrl: downloadUrl
}} else {
throw new Error('Failed to fetch video details.');
}}

async function Ytmp4(url) {
const response = await axios.get(`https://ytdl-api.caliphdev.com/download/video?url=${encodeURIComponent(url)}`)
const data = response.data
const dUrl = data.downloadUrl
const rUrl = await axios.get('https://v.gd/create.php', {
params: {
format: 'simple',
url: dUrl
}})
return {
status: data.status,
title: data.videoDetails.title,
description: data.videoDetails.description,
duration: data.videoDetails.lengthSeconds,
views: data.videoDetails.viewCount,
author: data.videoDetails.author.name,
channel: data.videoDetails.author.channel_url,
uploaded: data.videoDetails.uploadDate,
videoUrl: data.videoDetails.video_url,
thumbnail: data.videoDetails.cover,
url: rUrl
}}

async function Ytmp3(url) {
const response = await axios.get(`https://ytdl-api.caliphdev.com/download/audio?url=${encodeURIComponent(url)}`)
const data = response.data
const dUrl = data.downloadUrl
const rUrl = await axios.get('https://v.gd/create.php', {
params: {
format: 'simple',
url: dUrl
}})
return {
status: data.status,
title: data.videoDetails.title,
description: data.videoDetails.description,
duration: data.videoDetails.lengthSeconds,
views: data.videoDetails.viewCount,
author: data.videoDetails.author.name,
channel: data.videoDetails.author.channel_url,
uploaded: data.videoDetails.uploadDate,
videoUrl: data.videoDetails.video_url,
thumbnail: data.videoDetails.cover,
url: rUrl
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

async function terabox(url) {
const response = await axios.get(`https://fastrestapis.fasturl.cloud/downup/teraboxdown?url=${encodeURIComponent(url)}`)
return response.data.result
}

async function threads(link) {
const { data } = await axios.get('https://threads.snapsave.app/api/action', {
params: { url: link },
headers: {
'accept': 'application/json, text/plain, */*',
'referer': 'https://threads.snapsave.app/',
'user-agent': 'Postify/1.0.0'
},
timeout: 10000
})
const type = (type) => ({
GraphImage: 'Photo',
GraphVideo: 'Video',
GraphSidecar: 'Gallery'
}[type] || type);
return {
postInfo: {
id: data.postinfo.id,
username: data.postinfo.username,
avatarUrl: data.postinfo.avatar_url,
mediaTitle: data.postinfo.media_title,
type: type(data.postinfo.__type)
},
media: data.items.map(item => ({
type: type(item.__type),
id: item.id,
url: item.url,
width: item.width,
height: item.height,
...(item.__type === 'GraphVideo' && {
thumbnailUrl: item.display_url,
videoUrl: item.video_url,
duration: item.video_duration
})}))
}}

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
let rawUrl
if (!url.includes('/raw/')) {
const pasteId = url.split('/').pop()
rawUrl = `https://pastebin.com/raw/${pasteId}`
} else {
rawUrl = url
}
const response = await axios.get(rawUrl)
return response.data
}

async function sfiledl(url) {
try {
const id = url.split('/').pop()
const response = await axios.get(`https://sfile-api.vercel.app/download/${id}`)
if (response.data) {
const { url, date, downloaded } = response.data.data
return {
dl: url,
date: date,
dcount: downloaded
}}} catch (e) {
console.error('Error: '+e)
return null
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

async function ephoto(command, texk) {
const links = {
glitchtext: 'https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html',
writetext: 'https://en.ephoto360.com/write-text-on-wet-glass-online-589.html',
advancedglow: 'https://en.ephoto360.com/advanced-glow-effects-74.html',
logomaker: 'https://en.ephoto360.com/free-bear-logo-maker-online-673.html',
pixelglitch: 'https://en.ephoto360.com/create-pixel-glitch-text-effect-online-769.html',
neonglitch: 'https://en.ephoto360.com/create-impressive-neon-glitch-text-effects-online-768.html',
flagtext: 'https://en.ephoto360.com/nigeria-3d-flag-text-effect-online-free-753.html',
flag3dtext: 'https://en.ephoto360.com/free-online-american-flag-3d-text-effect-generator-725.html',
deletingtext: 'https://en.ephoto360.com/create-eraser-deleting-text-effect-online-717.html',
sandsummer: 'https://en.ephoto360.com/write-in-sand-summer-beach-online-576.html',
makingneon: 'https://en.ephoto360.com/making-neon-light-text-effect-with-galaxy-style-521.html',
royaltext: 'https://en.ephoto360.com/royal-text-effect-online-free-471.html'
};
const url = links[command];
let form = new FormData();
let gT = await axios.get(url, { headers: { "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36" }});
let $ = cheerio.load(gT.data);
let token = $("input[name=token]").val();
let build_server = $("input[name=build_server]").val();
let build_server_id = $("input[name=build_server_id]").val();
form.append("text[]", texk);
form.append("token", token);
form.append("build_server", build_server);
form.append("build_server_id", build_server_id);
let res = await axios.post(url, form, { headers: { Accept: "*/*", "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36", cookie: gT.headers["set-cookie"]?.join("; "), ...form.getHeaders()}})
let $$ = cheerio.load(res.data);
let json = JSON.parse($$("input[name=form_value_input]").val());
json["text[]"] = json.text;
delete json.text
let { data } = await axios.post("https://en.ephoto360.com/effect/create-image", new URLSearchParams(json), { headers: { "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36", cookie: gT.headers["set-cookie"].join("; ")}});
return build_server + data.image
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

async function shortUrlv1(url) {
const response = await axios.get('https://v.gd/create.php', {
params: {
format: 'simple',
url: url
}})
return response.data
}

async function shortUrlv2(url) {
const response = await axios.get('https://is.gd/create.php', {
params: {
format: 'simple',
url: url
}})
return response.data
}

async function cekip(query) {
const results = []

try {
const response = await axios.get(`https://ipinfo.io/${query}/json`);
results.push({ name: 'ipinfo.io', data: response.data });
} catch (error) {
results.push({ name: 'ipinfo.io', error: error.message });
}

try {
const response = await axios.get(`http://ip-api.com/json/${query}`);
results.push({ name: 'ip-api.com', data: response.data });
} catch (error) {
results.push({ name: 'ip-api.com', error: error.message });
}

try {
const response = await axios.get(`https://ipwhois.app/json/${query}`);
results.push({ name: 'ipwhois.app', data: response.data });
} catch (error) {
results.push({ name: 'ipwhois.app', error: error.message });
}

try {
const response = await axios.get(`https://ipapi.co/${query}/json/`);
if (response.data.error) {
throw new Error(response.data.reason || 'IP tidak valid');
}
results.push({ name: 'ipapi.co', data: response.data });
} catch (error) {
results.push({ name: 'ipapi.co', error: error.message });
}

return results;
}

module.exports = { ChatGPT, feloask, meiliai, islamai, veniceai, cbaby, text2img, gemini, blackbox, google, apkpure, spotifys, spotifydl, bingS, bingI, bingV, pinterest, srcLyrics, sfilesrc, ytsearch, ytdl, ytdlv2, Ytmp4, Ytmp3, igfbdl, tiktokdl, terabox, threads, getLyrics, pastebin, sfiledl, remini, reminiv2, dehaze, bratv2, ephoto, transcribe, shortUrlv1, shortUrlv2, cekip }