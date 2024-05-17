projectData = [];

const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

let API_KEY = "1bde10f68d1ae4cc4f4c9e50421dc5ee";
let url = [];

const bodyParser = require("body-parser");

app.use(cors());

app.use(express.static("dist"));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  url = req.body.url;
  const meaningUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${API_KEY}&url=${url}&lang=en`;
  try {
    await axios
      .get(meaningUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response.data;
      })
      .then(async (data) => {
        res.send({
          text: data.sentence_list[0].text || "",
          agreement: data.agreement,
          subjectivity: data.subjectivity,
          confidence: data.confidence,
          irony: data.irony,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  } catch (error) {
    console.log(error.message);
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
