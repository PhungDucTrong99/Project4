import "../styles/main.scss";
const { fetchData } = require("./fetchData");
const { checkForUrl } = require("./checkForUrl");

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("submit");
  button.addEventListener("click", handleSubmit);
});

async function handleSubmit(event) {
  event.preventDefault();
  const urlInput = document.getElementById("url");
  const url = urlInput.value.trim();

  if (!checkForUrl(url)) {
    console.log("This URL is invalid");
    alert("Invalid URL");
    return;
  }

  try {
    const data = await fetchData("http://localhost:3001/", { url });
    if (data) {
      updateUI(data);
    } else {
      console.log("No data received");
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    alert("Error fetching data. Please try again later.");
  }
}

function updateUI(data) {
  document.getElementById("text").innerHTML = `Subject Text: ${data.text}`;
  document.getElementById(
    "agreement"
  ).innerHTML = `Agreement: ${data.agreement}`;
  document.getElementById(
    "confidence"
  ).innerHTML = `Confidence: ${data.confidence}`;
  document.getElementById(
    "subjectivity"
  ).innerHTML = `Subjectivity: ${data.subjectivity}`;
  document.getElementById("irony").innerHTML = `Irony: ${data.irony}`;
}
