const features = [
  {
    name: "Vioo-AI",
    method: "GET",
    description: "AI/v-ai",
    category: "AI",
    endpoint: "/api/ai/vai",
    query: "q=Hello",
  },
  {
    name: "AIO-Downloader",
    method: "GET",
    description: "Downloader/aio",
    category: "Downloader",
    endpoint: "/api/dl/aio",
    query: "url=URL",
  },
]

const featureContainer = document.getElementById("feature-container")

function handleRequest(endpoint, query, method) {
  if (method === "GET") {
    window.open(`${endpoint}?${query}`, "_blank")
  }
}

features.forEach((feature) => {
  const card = document.createElement("div")
  card.className =
    "bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"

  card.innerHTML = `
    <h2 class="text-xl font-semibold text-white mb-2">${feature.name}</h2>
    <p class="text-gray-400 text-sm mb-4">${feature.description}</p>
    <button
      class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      onclick="handleRequest('${feature.endpoint}', '${feature.query}', '${feature.method}')"
    >
      ${feature.method}
    </button>
  `

  featureContainer.appendChild(card)
})             