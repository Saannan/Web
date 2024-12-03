document.addEventListener("DOMContentLoaded", () => {
  const endpoints = [
    {
      method: "GET",
      path: "/api/example",
      description: "Example GET endpoint",
    },
    {
      method: "POST",
      path: "/api/example",
      description: "Example POST endpoint (requires 'name' in body)",
    },
  ];

  const container = document.getElementById("endpoints");

  endpoints.forEach((endpoint) => {
    const endpointDiv = document.createElement("div");
    endpointDiv.classList.add("endpoint");

    endpointDiv.innerHTML = `
      <h3>${endpoint.method} ${endpoint.path}</h3>
      <p>${endpoint.description}</p>
      ${endpoint.method === "POST" ? '<textarea placeholder="Request Body (JSON)" rows="5"></textarea>' : ""}
      <button>Test</button>
      <pre style="background: #f0f0f0; padding: 10px; display: none;"></pre>
    `;

    const button = endpointDiv.querySelector("button");
    const responseOutput = endpointDiv.querySelector("pre");

    button.addEventListener("click", async () => {
      const url = endpoint.path;
      const method = endpoint.method;
      const headers = { "Content-Type": "application/json" };

      let body = null;
      if (method === "POST") {
        const textarea = endpointDiv.querySelector("textarea");
        body = JSON.parse(textarea.value || "{}");
      }

      try {
        const response = await axios({ method, url, headers, data: body });
        responseOutput.textContent = JSON.stringify(response.data, null, 2);
        responseOutput.style.display = "block";
      } catch (error) {
        responseOutput.textContent = JSON.stringify(error.response?.data || error.message, null, 2);
        responseOutput.style.display = "block";
      }
    });

    container.appendChild(endpointDiv);
  });
});