const categories = [{
    name: "AI",
    apis: [{
        title: "gpt-4o",
        service: "gpt4o",
        q: "q=hai"
      },
      {
        title: "gpt-4o mini",
        service: "gpt4o-mini",
        q: "q=hai"
      },
      {
        title: "gpt turbo",
        service: "gpt-turbo",
        q: "q=hai"
      },
      {
        title: "gpt turbov2",
        service: "gpt-turbov2",
        q: "q=hai"
      },
      {
        title: "openai",
        service: "openai",
        q: "q=hai"
      },
      {
        title: "luminai",
        service: "luminai",
        q: "q=hai"
      },
      {
        title: "llama",
        service: "llama",
        q: "q=hai"
      },
      {
        title: "blackbox",
        service: "blackbox",
        q: "q=hai"
      },
      {
        title: "simisimi",
        service: "simi",
        q: "q=hai"
      },
    ],
  },
  {
    name: "Search",
    apis: [{
        title: "google",
        service: "google",
        q: "q=ronaldo"
      },
      {
        title: "gimage",
        service: "gimage",
        q: "q=ronaldo"
      },
      {
        title: "playstore",
        service: "playstore",
        q: "q=minecraft"
      },
      {
        title: "appstore",
        service: "appstore",
        q: "q=minecraft"
      },
      {
        title: "yt search",
        service: "yts",
        q: "q=christy"
      },
    ],
  },
  {
    name: "Downloader",
    apis: [{
        title: "youtube",
        service: "ytdl",
        q: "url=https://youtu.be/3JSJ6h7LKb0"
      },
      {
        title: "facebook",
        service: "fbdl",
        q: "url=https://www.facebook.com/share/r/12BFZAtjpS8/?mibextid=qDwCgo"
      },
      {
        title: "instagram",
        service: "igdl",
        q: "url=https://www.instagram.com/p/DCQhOuXTRvE/?img_index=1&igsh=MWF2dXU3aWtpazY2NQ=="
      },
      {
        title: "tiktok",
        service: "ttdl",
        q: "url=https://vm.tiktok.com/ZSjVn47bC/"
      },
      {
        title: "mediafire",
        service: "mfdl",
        q: "url=https://www.mediafire.com/folder/4zhvcue3l75xa/Delirius+Test"
      },
    ],
  },
  {
    name: "Maker",
    apis: [{
        title: "brat sticker",
        service: "brat",
        q: "q=hai"
      },
      {
        title: "textimage",
        service: "txtimage",
        q: "q=hai"
      },
    ],
  },
  {
    name: "Tools",
    apis: [{
        title: "tinyurl",
        service: "tinyurl",
        q: "url=https://www.google.com"
      },
      {
        title: "reminiv2",
        service: "reminiv2",
        q: "url=https://pomf2.lain.la/f/c4njx2we.jpg"
      },
      {
        title: "recolor",
        service: "recolor",
        q: "url=https://pomf2.lain.la/f/c4njx2we.jpg"
      },
      {
        title: "dehaze",
        service: "dehaze",
        q: "url=https://pomf2.lain.la/f/c4njx2we.jpg"
      },
      {
        title: "screenshot web",
        service: "ssweb",
        q: "url=https://pomf2.lain.la/f/c4njx2we.jpg"
      },
    ],
  },
  {
    name: "Converter",
    apis: [{
        title: "tobase64",
        service: "tobase64",
        q: "q=hai"
      },
      {
        title: "toutf8",
        service: "toutf8",
        q: "q=aGFp"
      },
      {
        title: "tohex",
        service: "tohex",
        q: "q=hai"
      },
      {
        title: "togithub-raw",
        service: "ghraw",
        q: "url=https://github.com/ViooWA/Web/blob/main/vercel.json"
      },
      {
        title: "togithub-ori",
        service: "ghori",
        q: "url=https://raw.githubusercontent.com/ViooWA/Web/main/vercel.json"
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
        "items-center",
        "justify-between",
        "p-4",
        "bg-white"
      );
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
      tryButton.classList.add(
        "bg-yellow-light",
        "text-white",
        "px-3",
        "py-1",
        "rounded-full",
        "text-xs",
        "font-bold",
        "shadow",
        "tracking-wide",
        "text-sm"
      );
      tryButton.innerText = "TRY";
      tryButton.href = `https://api-vioo.my.id/api/${api.service}?${api.q}`;
      tryButton.target = "_blank";
      card.appendChild(leftSection);
      card.appendChild(tryButton);
      section.appendChild(card);
    });
    container.appendChild(section);
  });
}
renderCards();
