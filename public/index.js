const categories = [{
    name: "AI",
    apis: [
      {
        title: "openai",
        service: "openai",
        q: "q=hai",,
        d: "Get repons from openai"
      },
      {
        title: "luminai",
        service: "luminai",
        q: "q=hai",
        d: "Get repons from luminai"
      },
      {
        title: "llamav1",
        service: "llamav1",
        q: "q=hai",
        d: "Get repons from llamav1"
      },
      {
        title: "llamav2",
        service: "llamav2",
        q: "q=hai",
        d: "Get repons from llamav2"
      },
      {
        title: "gemini",
        service: "gemini",
        q: "q=hai",
        d: "Get repons from gemini"
      },
      {
        title: "blackbox",
        service: "blackbox",
        q: "q=hai",
        d: "Get repons from blackbox"
      },
      {
        title: "simisimi",
        service: "simi",
        q: "q=hai",
        d: "Get repons from simisimi"
      },
      {
        title: "gpt4o",
        service: "gpt4o",
        q: "q=hai",
        d: "Get repons from gpt4o"
      },
      {
        title: "gpt4o-mini",
        service: "gpt4omini",
        q: "q=hai",
        d: "Get repons from gpt4o mini"
      },
      {
        title: "turbo-v1",
        service: "turbov1",
        q: "q=hai",
        d: "Get repons from gpt-turbo v1"
      },
      {
        title: "turbo-v2",
        service: "turbov2",
        q: "q=hai",
        d: "Get repons from gpt-turbo v2"
      },
      {
        title: "mistral-v1",
        service: "mistralv1",
        q: "q=hai",
        d: "Get repons from mistralv1"
      },
      {
        title: "mistral-v2",
        service: "mistralv2",
        q: "q=hai",
        d: "Get repons from mistralv2"
      },
      {
        title: "feloai",
        service: "feloai",
        q: "q=hai",
        d: "Get repons from felo ai"
      },
      {
        title: "moshiai",
        service: "moshiai",
        q: "q=hai",
        d: "Get repons from moshi ai"
      },
      {
        title: "meiliai",
        service: "meiliai",
        q: "q=hai",
        d: "Get repons from meili ai"
      },
      {
        title: "islamai",
        service: "islamai",
        q: "q=hai",
        d: "Get repons from islam ai"
      },
      {
        title: "veniceai",
        service: "veniceai",
        q: "q=hai",
        d: "Get repons from venice ai"
      },
    ],
  },
  {
    name: "Search",
    apis: [{
        title: "google",
        service: "google",
        q: "q=ronaldo",
        d: "Search with google"
      },
      {
        title: "gimage",
        service: "gimage",
        q: "q=ronaldo",
        d: "Search with gimage"
      },
      {
        title: "playstore",
        service: "playstore",
        q: "q=minecraft",
        d: "Search with playstore"
      },
      {
        title: "appstore",
        service: "appstore",
        q: "q=minecraft",
        d: "Search with appstore"
      },
      {
        title: "ytsearch",
        service: "yts",
        q: "q=mbappe",
        d: "Search with youtube"
      },
      {
        title: "spotifys",
        service: "spotifys",
        q: "q=sofia",
        d: "Search with spotify"
      },
      {
        title: "bing search",
        service: "bingsrc",
        q: "q=mbappe",
        d: "Search with bing-search"
      },
      {
        title: "bing image",
        service: "bingimg",
        q: "q=mbappe",
        d: "Search with bing-image"
      },
      {
        title: "bing video",
        service: "bingvd",
        q: "q=mbappe",
        d: "Search with bing-video"
      },
      {
        title: "pinterest",
        service: "pinterest",
        q: "q=mbappe",
        d: "Search with pinterest"
      },
      {
        title: "lirik",
        service: "lirik",
        q: "q=sofia",
        d: "Search with lirik"
      },
    ],
  },
  {
    name: "Downloader",
    apis: [{
        title: "youtube",
        service: "ytdl",
        q: "url=https://youtu.be/3JSJ6h7LKb0",
        d: "Youtube downloader"
      },
      {
        title: "facebook",
        service: "fbdl",
        q: "url=https://www.facebook.com/share/r/12BFZAtjpS8/?mibextid=qDwCgo",
        d: "Facebook downloader"
      },
      {
        title: "instagram",
        service: "igdl",
        q: "url=https://www.instagram.com/p/DCQhOuXTRvE/?img_index=1&igsh=MWF2dXU3aWtpazY2NQ==",
        d: "Instagram downloader"
      },
      {
        title: "instagramv2",
        service: "igdlv2",
        q: "url=https://www.instagram.com/p/DCQhOuXTRvE/?img_index=1&igsh=MWF2dXU3aWtpazY2NQ==",
        d: "Instagramv2 downloader"
      },
      {
        title: "tiktok",
        service: "ttdl",
        q: "url=https://vm.tiktok.com/ZSjVn47bC/",
        d: "Tiktok downloader"
      },
      {
        title: "tiktokv2",
        service: "ttdlv2",
        q: "url=https://vm.tiktok.com/ZSjVn47bC/",
        d: "Tiktokv2 downloader"
      },
      {
        title: "spotify",
        service: "spotify",
        q: "url=https://open.spotify.com/track/2bNxCVI4Fub8BAwr0CQDyd",
        d: "Spotify downloader"
      },
      {
        title: "videy",
        service: "videy",
        q: "url=https://videy.co/v?id=6eWSwq2t",
        d: "Videy downloader"
      },
      {
        title: "mediafire",
        service: "mfdl",
        q: "url=https://www.mediafire.com/folder/4zhvcue3l75xa/Delirius+Test",
        d: "Mediafire downloader"
      },
      {
        title: "gdrive",
        service: "gdrive",
        q: "url=https://drive.google.com/file/d/1YTD7Ymux9puFNqu__5WPlYdFZHcGI3Wz/view?usp=drivesdk",
        d: "Gdrive downloader"
      },
      {
        title: "getlirik",
        service: "getlirik",
        q: "url=https://www.lyrics.com/lyric/32849180/Alvaro+Soler/Sofia",
        d: "Get lirik music"
      },
      {
        title: "pastebin",
        service: "pastebin",
        q: "url=https://pastebin.com/Geq38sT1",
        d: "Get data url from pastebin"
      },
    ],
  },
  {
    name: "Maker",
    apis: [{
        title: "bratv1",
        service: "bratv1",
        q: "q=hai",
        d: "Bratv1 sticker"
      },
      {
        title: "bratv2",
        service: "bratv2",
        q: "q=hai",
        d: "Bratv2 sticker"
      },
      {
        title: "textimage",
        service: "txtimage",
        q: "q=hai",
        d: "Text image dummy"
      },
      {
        title: "blur image",
        service: "blurimg",
        q: "url=https://pomf2.lain.la/f/c4njx2we.jpg",
        d: "Blur your image"
      },
      {
        title: "beautiful",
        service: "beautiful",
        q: "url=https://pomf2.lain.la/f/c4njx2we.jpg",
        d: "Beautiful image"
      },
      {
        title: "facepalm",
        service: "facepalm",
        q: "url=https://pomf2.lain.la/f/c4njx2we.jpg",
        d: "Facepalm image"
      },
    ],
  },
  {
    name: "Tools",
    apis: [{
        title: "tinyurl",
        service: "tinyurl",
        q: "url=https://www.google.com",
        d: "Changes to shortlink"
      },
      {
        title: "remini",
        service: "remini",
        q: "url=https://pomf2.lain.la/f/c4njx2we.jpg",
        d: "Enhancev1 your image"
      },
      {
        title: "reminiv2",
        service: "reminiv2",
        q: "url=https://pomf2.lain.la/f/c4njx2we.jpg",
        d: "Enhancev2 your image"
      },
      {
        title: "recolor",
        service: "recolor",
        q: "url=https://pomf2.lain.la/f/c4njx2we.jpg",
        d: "Recolor your image"
      },
      {
        title: "dehaze",
        service: "dehaze",
        q: "url=https://pomf2.lain.la/f/c4njx2we.jpg",
        d: "Dehaze your image"
      },
      {
        title: "screenshot web",
        service: "ssweb",
        q: "url=https://pomf2.lain.la/f/c4njx2we.jpg",
        d: "Screenshot website target"
      },
    ],
  },
  {
    name: "Converter",
    apis: [{
        title: "tobase64",
        service: "tobase64",
        q: "q=hai",
        d: "Convert utf8 to base64"
      },
      {
        title: "toutf8",
        service: "toutf8",
        q: "q=aGFp",
        d: "Convert base64 to utf8"
      },
      {
        title: "tohex",
        service: "tohex",
        q: "q=hai",
        d: "Convert text to hex"
      },
      {
        title: "togithub-raw",
        service: "ghraw",
        q: "url=https://github.com/ViooWA/Web/blob/main/vercel.json",
        d: "Convert to github raw url"
      },
      {
        title: "togithub-ori",
        service: "ghori",
        q: "url=https://raw.githubusercontent.com/ViooWA/Web/main/vercel.json",
        d: "Convert to github main url"
      },
      {
        title: "audio2text",
        service: "audio2txt",
        q: "url=https://pomf2.lain.la/f/21axy7kx.mp3",
        d: "Voice to text"
      },
    ],
  },
];

function renderCards() {
  const container = document.getElementById("api-container");
  container.innerHTML = "";
  categories.forEach((category) => {
    const section = document.createElement("div");
    section.classList.add(
      "divide-y",
      "divide-gray-300",
      "p-4",
      "bg-white",
      "rounded-lg",
      "border",
      "border-gray-300",
      "shadow-sm"
    );

    const categoryTitle = document.createElement("div");
    categoryTitle.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "text-xl",
      "font-bold",
      "bg-yellow-light",
      "text-white",
      "p-3",
      "rounded-lg",
      "shadow-md",
      "tracking-wider",
      "mb-4"
    );
    const categoryName = document.createElement("span");
    categoryName.innerText = category.name;
    const totalEndpoints = document.createElement("span");
    totalEndpoints.classList.add("text-sm", "font-medium");
    totalEndpoints.innerText = `Total: ${category.apis.length}`;
    categoryTitle.appendChild(categoryName);
    categoryTitle.appendChild(totalEndpoints);
    section.appendChild(categoryTitle);

    category.apis.forEach((api) => {
      const card = document.createElement("div");
      card.classList.add(
        "flex",
        "flex-col",
        "items-start",
        "p-4",
        "bg-white",
        "cursor-pointer",
        "rounded-md",
        "border",
        "hover:shadow-lg"
      );

      const topSection = document.createElement("div");
      topSection.classList.add("flex", "items-center", "justify-between", "w-full");

      const leftSection = document.createElement("div");
      leftSection.classList.add("flex", "items-center", "space-x-3");

      const getBadge = document.createElement("span");
      getBadge.classList.add(
        "bg-yellow-light",
        "text-white",
        "px-3",
        "py-1",
        "rounded-full",
        "text-xs",
        "font-bold",
        "shadow"
      );
      getBadge.innerText = "GET";

      const apiTitle = document.createElement("span");
      apiTitle.classList.add("text-gray-800", "font-semibold", "text-lg");
      apiTitle.innerText = api.title;

      leftSection.appendChild(getBadge);
      leftSection.appendChild(apiTitle);

      const tryButton = document.createElement("a");
      tryButton.classList.add("text-yellow-light", "text-2xl");
      tryButton.innerHTML = `<i class="fas fa-arrow-right"></i>`;
      tryButton.href = `https://vapis.my.id/api/${api.service}?${api.q}`;
      tryButton.target = "_blank";

      topSection.appendChild(leftSection);
      topSection.appendChild(tryButton);
      card.appendChild(topSection);

      const desc = document.createElement("p");
      desc.classList.add("hidden", "text-gray-600", "mt-3", "text-sm");
      desc.innerText = api.d;

      card.appendChild(desc);

      card.addEventListener("click", () => {
        const isHidden = desc.classList.contains("hidden");
        desc.classList.toggle("hidden", !isHidden);
      });

      section.appendChild(card);
    });

    container.appendChild(section);
  });
}

renderCards();