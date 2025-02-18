const textElement = document.getElementById("typing-text")
const textToType = "Fast, Easy, and Simple APIs"
let index = 0

function typeText() {
  if (index < textToType.length) {
    textElement.textContent += textToType[index]
    index++
    setTimeout(typeText, 100)
  }
}

document.addEventListener("DOMContentLoaded", typeText)

const categories = [{
    name: "AI",
    apis: [
      {
        title: "openai",
        service: "openai",
        q: "q=hai",
        description: "Get repons from openai"
      },
      {
        title: "luminai",
        service: "luminai",
        q: "q=hai",
        description: "Get repons from luminai"
      },
      {
        title: "llamav1",
        service: "llamav1",
        q: "q=hai",
        description: "Get repons from llamav1"
      },
      {
        title: "llamav2",
        service: "llamav2",
        q: "q=hai",
        description: "Get repons from llamav2"
      },
      {
        title: "gemini",
        service: "gemini",
        q: "q=hai",
        description: "Get repons from gemini"
      },
      {
        title: "blackbox",
        service: "blackbox",
        q: "q=hai",
        description: "Get repons from blackbox"
      },
      {
        title: "claude",
        service: "claude",
        q: "q=hai",
        description: "Get repons from claude"
      },
      {
        title: "simisimi",
        service: "simi",
        q: "q=hai",
        description: "Get repons from simisimi"
      },
      {
        title: "gpt4o",
        service: "gpt4o",
        q: "q=hai",
        description: "Get repons from gpt4o"
      },
      {
        title: "gpt4o-mini",
        service: "gpt4omini",
        q: "q=hai",
        description: "Get repons from gpt4o mini"
      },
      {
        title: "turbo-v1",
        service: "turbov1",
        q: "q=hai",
        description: "Get repons from gpt-turbo v1"
      },
      {
        title: "turbo-v2",
        service: "turbov2",
        q: "q=hai",
        description: "Get repons from gpt-turbo v2"
      },
      {
        title: "mistral-v1",
        service: "mistralv1",
        q: "q=hai",
        description: "Get repons from mistralv1"
      },
      {
        title: "mistral-v2",
        service: "mistralv2",
        q: "q=hai",
        description: "Get repons from mistralv2"
      },
      {
        title: "feloai",
        service: "feloai",
        q: "q=hai",
        description: "Get repons from felo ai"
      },
      {
        title: "moshiai",
        service: "moshiai",
        q: "q=hai",
        description: "Get repons from moshi ai"
      },
      {
        title: "meiliai",
        service: "meiliai",
        q: "q=hai",
        description: "Get repons from meili ai"
      },
      {
        title: "islamai",
        service: "islamai",
        q: "q=hai",
        description: "Get repons from islam ai"
      },
      {
        title: "veniceai",
        service: "veniceai",
        q: "q=hai",
        description: "Get repons from venice ai"
      },
      {
        title: "text2image v1",
        service: "txt2imgv1",
        q: "q=beautiful%20girl",
        description: "Generate image with dalle"
      },
      {
        title: "text2image v2",
        service: "txt2imgv2",
        q: "q=beautiful%20girl",
        description: "Generate image with haiper"
      },
      {
        title: "text2image v3",
        service: "txt2imgv3",
        q: "q=beautiful%20girl",
        description: "Generate image with imgsys"
      },
      {
        title: "ai-baby",
        service: "aibaby",
        q: "ayah=https://pomf2.lain.la/f/496snr7.jpg&ibu=https://pomf2.lain.la/f/48li9yvf.jpg&gender=boy",
        description: "Generate baby face image with ai"
      },
      {
        title: "dystopia",
        service: "dystopia",
        q: "q=beautiful%20girl",
        description: "Generate image with dystopia"
      },
    ],
  },
  {
    name: "Search",
    apis: [{
        title: "google v1",
        service: "googlev1",
        q: "q=ronaldo",
        description: "Search with google v1"
      },
      {
        title: "google v2",
        service: "googlev2",
        q: "q=ronaldo",
        description: "Search with google v2"
      },
      {
        title: "gimage",
        service: "gimage",
        q: "q=ronaldo",
        description: "Search with gimage"
      },
      {
        title: "playstore",
        service: "playstore",
        q: "q=minecraft",
        description: "Search with playstore"
      },
      {
        title: "appstore",
        service: "appstore",
        q: "q=minecraft",
        description: "Search with appstore"
      },
      {
        title: "apkpure",
        service: "apkpure",
        q: "q=minecraft",
        description: "Search with apkpure"
      },
      {
        title: "ytsearch",
        service: "yts",
        q: "q=mbappe",
        description: "Search with youtube"
      },
      {
        title: "spotifys",
        service: "spotifys",
        q: "q=sofia",
        description: "Search with spotify"
      },
      {
        title: "bing search",
        service: "bingsrc",
        q: "q=mbappe",
        description: "Search with bing-search"
      },
      {
        title: "bing image",
        service: "bingimg",
        q: "q=mbappe",
        description: "Search with bing-image"
      },
      {
        title: "bing video",
        service: "bingvd",
        q: "q=mbappe",
        description: "Search with bing-video"
      },
      {
        title: "pinterest",
        service: "pinterest",
        q: "q=mbappe",
        description: "Search with pinterest"
      },
      {
        title: "lirik",
        service: "lirik",
        q: "q=sofia",
        description: "Search with lirik"
      },
      {
        title: "sfilesrc",
        service: "sfilesrc",
        q: "q=minecraft",
        description: "Search with sfilesrc"
      },
      {
        title: "gsmarena",
        service: "gsmarena",
        q: "q=infinix",
        description: "Search with gsmarena"
      },
    ],
  },
  {
    name: "Downloader",
    apis: [{
        title: "youtube",
        service: "ytdl",
        q: "url=https://youtu.be/3JSJ6h7LKb0",
        description: "Youtube downloader"
      },
      {
        title: "youtubev2",
        service: "ytdlv2",
        q: "url=https://youtu.be/3JSJ6h7LKb0",
        description: "Youtubev2 downloader"
      },
      {
        title: "ytmp4",
        service: "ytmp4",
        q: "url=https://youtu.be/3JSJ6h7LKb0",
        description: "Youtube mp4 downloader"
      },
      {
        title: "ytmp3",
        service: "ytmp3",
        q: "url=https://youtu.be/3JSJ6h7LKb0",
        description: "Youtube mp3 downloader"
      },
      {
        title: "facebook",
        service: "fbdl",
        q: "url=https://www.facebook.com/share/r/12BFZAtjpS8/?mibextid=qDwCgo",
        description: "Facebook downloader"
      },
      {
        title: "instagram",
        service: "igdl",
        q: "url=https://www.instagram.com/p/DCQhOuXTRvE/?img_index=1&igsh=MWF2dXU3aWtpazY2NQ==",
        description: "Instagram downloader"
      },
      {
        title: "instagramv2",
        service: "igdlv2",
        q: "url=https://www.instagram.com/p/DCQhOuXTRvE/?img_index=1&igsh=MWF2dXU3aWtpazY2NQ==",
        description: "Instagramv2 downloader"
      },
      {
        title: "tiktok",
        service: "ttdl",
        q: "url=https://vm.tiktok.com/ZSjVn47bC/",
        description: "Tiktok downloader"
      },
      {
        title: "tiktokv2",
        service: "ttdlv2",
        q: "url=https://vm.tiktok.com/ZSjVn47bC/",
        description: "Tiktokv2 downloader"
      },
      {
        title: "spotify",
        service: "spotify",
        q: "url=https://open.spotify.com/track/2bNxCVI4Fub8BAwr0CQDyd",
        description: "Spotify downloader"
      },
      {
        title: "videy",
        service: "videy",
        q: "url=https://videy.co/v?id=6eWSwq2t",
        description: "Videy downloader"
      },
      {
        title: "twitter",
        service: "twitter",
        q: "url=https://twitter.com/Eminem/status/943590594491772928",
        description: "Twitter downloader"
      },
      {
        title: "terabox",
        service: "terabox",
        q: "url=https://terabox.com/s/1A6XAXNBdHuLneJ51dNNy0g",
        description: "Terabox downloader"
      },
      {
        title: "threads",
        service: "threads",
        q: "url=https://www.threads.net/@melalibaliofficial/post/DECt01XSuyk?xmt=AQGznZWwI8lwsOmnsjwiaOhaoMgKAhwZChNQyLcdV-MVbQ",
        description: "Threads downloader"
      },
      {
        title: "capcut",
        service: "capcut",
        q: "url=https://www.capcut.com/t/Zs8Sw9wsE/%20aesthetic",
        description: "Capcut downloader"
      },
      {
        title: "mediafire",
        service: "mfdl",
        q: "url=https://www.mediafire.com/file/5nt8ybeyd3jhnhg/𝐀𝐠𝐥𝐞𝐫+𝐅𝐨𝐫𝐠𝐞𝐫+𝐯𝟏𝟒.𝟐+@AndraZyy.zip/file",
        description: "Mediafire downloader"
      },
      {
        title: "gdrive",
        service: "gdrive",
        q: "url=https://drive.google.com/file/d/1YTD7Ymux9puFNqu__5WPlYdFZHcGI3Wz/view?usp=drivesdk",
        description: "Gdrive downloader"
      },
      {
        title: "getlirik",
        service: "getlirik",
        q: "url=https://www.lyrics.com/lyric/32849180/Alvaro+Soler/Sofia",
        description: "Get lirik music"
      },
      {
        title: "pastebin",
        service: "pastebin",
        q: "url=https://pastebin.com/Geq38sT1",
        description: "Get data url from pastebin"
      },
      {
        title: "sfiledl",
        service: "sfiledl",
        q: "url=https://sfile.mobi/4MJIjvGqTmi",
        description: "Sfile downloader"
      },
    ],
  },
  {
    name: "Maker",
    apis: [{
        title: "bratv1",
        service: "bratv1",
        q: "q=hai",
        description: "Bratv1 sticker"
      },
      {
        title: "bratv2",
        service: "bratv2",
        q: "q=hai",
        description: "Bratv2 sticker"
      },
      {
        title: "textimage",
        service: "txtimage",
        q: "q=hai",
        description: "Text image dummy"
      },
      {
        title: "blur image",
        service: "blurimg",
        q: "url=https://pomf2.lain.la/f/c4njx2we.jpg",
        description: "Blur your image"
      },
      {
        title: "beautiful",
        service: "beautiful",
        q: "url=https://pomf2.lain.la/f/c4njx2we.jpg",
        description: "Beautiful image"
      },
      {
        title: "facepalm",
        service: "facepalm",
        q: "url=https://pomf2.lain.la/f/c4njx2we.jpg",
        description: "Facepalm image"
      },
    ],
  },
  {
    name: "Tools",
    apis: [{
        title: "tinyurl",
        service: "tinyurl",
        q: "url=https://www.google.com",
        description: "Changes to shortlink"
      },
      {
        title: "remini",
        service: "remini",
        q: "url=https://pomf2.lain.la/f/c4njx2we.jpg",
        description: "Enhancev1 your image"
      },
      {
        title: "reminiv2",
        service: "reminiv2",
        q: "url=https://pomf2.lain.la/f/c4njx2we.jpg",
        description: "Enhancev2 your image"
      },
      {
        title: "recolor",
        service: "recolor",
        q: "url=https://pomf2.lain.la/f/c4njx2we.jpg",
        description: "Recolor your image"
      },
      {
        title: "dehaze",
        service: "dehaze",
        q: "url=https://pomf2.lain.la/f/c4njx2we.jpg",
        description: "Dehaze your image"
      },
      {
        title: "screenshot web",
        service: "ssweb",
        q: "url=https://pomf2.lain.la/f/c4njx2we.jpg",
        description: "Screenshot website target"
      },
      {
        title: "iplookup",
        service: "iplookup",
        q: "domain=google.com",
        description: "Check ip with domain"
      },
      {
        title: "checkip",
        service: "checkip",
        q: "ip=8.8.8.8",
        description: "Check your ip location"
      },
      {
        title: "iplocation full",
        service: "cekipfull",
        q: "ip=8.8.8.8",
        description: "Check your ip location full"
      },
    ],
  },
  {
    name: "Converter",
    apis: [{
        title: "to base64",
        service: "tobase64",
        q: "q=hai",
        description: "Convert utf8 to base64"
      },
      {
        title: "to utf8",
        service: "toutf8",
        q: "q=aGFp",
        description: "Convert base64 to utf8"
      },
      {
        title: "to hex",
        service: "tohex",
        q: "q=hai",
        description: "Convert text to hex"
      },
      {
        title: "to github-raw",
        service: "ghraw",
        q: "url=https://github.com/ViooWA/Web/blob/main/vercel.json",
        description: "Convert to github raw url"
      },
      {
        title: "to github-ori",
        service: "ghori",
        q: "url=https://raw.githubusercontent.com/ViooWA/Web/main/vercel.json",
        description: "Convert to github main url"
      },
      {
        title: "audio2text",
        service: "audio2txt",
        q: "url=https://files.catbox.moe/xa34uk.mp3",
        description: "Voice to text"
      },
      {
        title: "to vurl",
        service: "tovurl",
        q: "url=https://pomf2.lain.la/f/21axy7kx.mp3",
        description: "Convert any url to vurl"
      },
      {
        title: "to isgd",
        service: "toisgd",
        q: "url=https://pomf2.lain.la/f/21axy7kx.mp3",
        description: "Convert any url to isgd"
      },
    ],
  },
  {
    name: "Stalker",
    apis: [{
        title: "github userv1",
        service: "github-userv1",
        q: "username=ViooWA",
        description: "Github user stalk v1"
      },
      {
        title: "github userv2",
        service: "github-userv2",
        q: "username=ViooWA",
        description: "Github user stalk v2"
      },
      {
        title: "npm stalk",
        service: "npm-stalk",
        q: "pkgname=axios",
        description: "Npm stalk with package name"
      },
      {
        title: "tiktok stalk",
        service: "tt-stalk",
        q: "username=djayyz_1",
        description: "Tiktok stalk with username"
      },
      {
        title: "youtube stalk",
        service: "yt-stalk",
        q: "username=SanjayaAds",
        description: "Youtube stalk with username"
      },
      {
        title: "instagram stalk",
        service: "ig-stalk",
        q: "username=vioo.wa",
        description: "Instagram stalk with username"
      },
      {
        title: "ff stalk",
        service: "ff-stalk",
        q: "id=12345678",
        description: "Freefire stalk with id"
      },
      {
        title: "ml stalk",
        service: "ml-stalk",
        q: "id=109088431&zoneid=2558",
        description: "Ml stalk with id and zoneid"
      },
    ],
  },
  {
    name: "Ephoto",
    apis: [{
        title: "glitchtext",
        service: "glitchtext",
        q: "q=mbappe",
        description: "Generate image with glitch text"
      },
      {
        title: "writetext",
        service: "writetext",
        q: "q=mbappe",
        description: "Generate image with write text"
      },
      {
        title: "advancedglow",
        service: "advancedglow",
        q: "q=mbappe",
        description: "Generate image with advanced glow"
      },
      {
        title: "logomaker",
        service: "logomaker",
        q: "q=mbappe",
        description: "Generate image with logo maker"
      },
      {
        title: "pixelglitch",
        service: "pixelglitch",
        q: "q=mbappe",
        description: "Generate image with pixel glitch"
      },
      {
        title: "neonglitch",
        service: "neonglitch",
        q: "q=mbappe",
        description: "Generate image with neong litch"
      },
      {
        title: "flagtext",
        service: "flagtext",
        q: "q=mbappe",
        description: "Generate image with flag text"
      },
      {
        title: "flag3dtext",
        service: "flag3dtext",
        q: "q=mbappe",
        description: "Generate image with flag3d text"
      },
      {
        title: "deletingtext",
        service: "deletingtext",
        q: "q=mbappe",
        description: "Generate image with deleting text"
      },
      {
        title: "sandsummer",
        service: "sandsummer",
        q: "q=mbappe",
        description: "Generate image with sand summer"
      },
      {
        title: "makingneon",
        service: "makingneon",
        q: "q=mbappe",
        description: "Generate image with making neon"
      },
      {
        title: "royaltext",
        service: "royaltext",
        q: "q=mbappe",
        description: "Generate image with royal text"
      },
    ],
  },
]

function renderCards() {
  const container = document.getElementById("api-container")
  container.innerHTML = ""
  
  categories.forEach((category) => {
    const section = document.createElement("div")
    section.classList.add("p-4", "bg-gray-800", "rounded-lg", "shadow-sm")

    const categoryTitle = document.createElement("div")
    categoryTitle.classList.add(
      "flex", "justify-between", "items-center", "text-xl", 
      "font-bold", "bg-yellow-light", "text-white", 
      "p-3", "rounded-lg", "shadow-md", "mb-4"
    )
    
    const categoryName = document.createElement("span")
    categoryName.innerText = category.name
    
    const totalEndpoints = document.createElement("span")
    totalEndpoints.classList.add("text-sm", "font-medium")
    totalEndpoints.innerText = `Total: ${category.apis.length}`

    categoryTitle.appendChild(categoryName)
    categoryTitle.appendChild(totalEndpoints)
    section.appendChild(categoryTitle)

    category.apis.forEach((api, index) => {
      const card = document.createElement("div")
      card.classList.add(
        "card", "flex", "flex-col", "items-start", "p-4", 
        "bg-gray-800", "cursor-pointer", "rounded-md"
      )

      const topSection = document.createElement("div")
      topSection.classList.add("flex", "items-center", "justify-between", "w-full")

      const leftSection = document.createElement("div")
      leftSection.classList.add("flex", "items-center", "space-x-3")

      const getBadge = document.createElement("span")
      getBadge.classList.add(
        "bg-yellow-light", "text-white", "px-3", "py-1", 
        "rounded-full", "text-xs", "font-bold", "shadow"
      )
      getBadge.innerText = "GET"

      const apiTitle = document.createElement("span")
      apiTitle.classList.add("text-white", "font-semibold", "text-lg")
      apiTitle.innerText = api.title

      leftSection.appendChild(getBadge)
      leftSection.appendChild(apiTitle)

      const tryButton = document.createElement("a")
      tryButton.classList.add("text-yellow-light", "text-2xl")
      tryButton.innerHTML = `<i class="fas fa-arrow-right"></i>`
      tryButton.href = `https://vapis.my.id/api/${api.service}?${api.q}`
      tryButton.target = "_blank"

      topSection.appendChild(leftSection)
      topSection.appendChild(tryButton)
      card.appendChild(topSection)

      const description = document.createElement("p")
      description.classList.add("hidden", "text-white", "mt-3", "italic", "text-sm")
      description.innerText = api.description
      card.appendChild(description)

      card.addEventListener("click", () => {
        document.querySelectorAll("#api-container p").forEach((desc) => {
          if (desc !== description) {
            desc.classList.add("hidden")
          }
        })
        description.classList.toggle("hidden")
      })

      section.appendChild(card)
    })

    container.appendChild(section)
  })
}

renderCards()