projectData = [];

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const bodyParser = require("body-parser");

let API_KEY = "e2aa00900b878034b5b61f4121b7b528";
let url = [];
let baseURL = "https://api.meaningcloud.com/sentiment-2.1?key=";

app.use(cors());
app.use(express.static("dist"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  url = req.body.url;
  try {
    const { url } = req.body;
    const urlAPI = `${baseURL}${API_KEY}&url=${url}&lang=en`;

    const response = await axios.get(urlAPI, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response?.data;
    console.log("data", data);
    const sentimentData = {
      text: data?.sentence_list[0]?.text || "",
      agreement: data?.agreement || "",
      subjectivity: data?.subjectivity || "",
      confidence: data?.confidence || "",
      irony: data?.irony || "",
    };

    res.send(sentimentData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//config port
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
