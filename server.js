// server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 80;

app.use(express.json());
app.use(cors());

app.post("/search", async (req, res) => {
  const apiKey = "e2902688-21fe-4f46-ab47-d98a8d4f73f4";
  const { query } = req.body;

  try {
    const response = await axios.get(
      `https://api.companieshouse.gov.uk/search/companies?q=${query}`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching data from Companies House API:",
      error.message
    );
    console.error("Request headers:", error.config.headers);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
