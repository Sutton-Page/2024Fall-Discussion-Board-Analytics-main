const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to fetch data from test.json in the public folder
app.get("/api/students", (req, res) => {
  const filePath = path.join(__dirname, "../public/test.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read file" });
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint to update test.json in the public folder
app.put("/api/students", (req, res) => {
  const updatedData = JSON.stringify(req.body, null, 2); // Pretty print JSON
  const filePath = path.join(__dirname, "../public/test.json");

  fs.writeFile(filePath, updatedData, "utf8", (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to write file" });
    }
    res.json({ message: "File updated successfully" });
  });
});

// Start the server and dynamically assign a port
const PORT = process.env.PORT || 0;  // 0 allows the OS to assign a free port
const server = app.listen(PORT, () => {
  const actualPort = server.address().port;  // Get the dynamically assigned port
  console.log(`Server is running on http://localhost:${actualPort}`);

  // Write the dynamically assigned port to a .env file for Vite to read
  const envContent = `BACKEND_PORT=${actualPort}\nFLASK_PORT=5000\nSPRING_PORT=8888`;
  fs.writeFileSync(path.join(__dirname, "../.env"), envContent, "utf8");

  console.log(`Dynamic port ${actualPort} written to .env file`);
});
