const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.get("/api/example", (req, res) => {
  res.json({ message: "Hello from GET endpoint!" });
});

app.post("/api/example", (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hello, ${name}!` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});