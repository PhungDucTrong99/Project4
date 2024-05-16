console.log("Hello, webpack!");
import "../styles/main.scss";
const { fetchData } = require("./fetchData");
const { checkForUrl } = require("./checkForUrl");

document.addEventListener("DOMContentLoaded", function () {
  let button = document.getElementById("submit");
  button.addEventListener("click", async function (event) {
    event.preventDefault();
    const url = document.getElementById("url").value;
    if (checkForUrl(url)) {
      const data = await fetchData("http://localhost:8080/", {
        url,
      });
      if (data) {
        document.getElementById("text").innerHTML = `SubjectText: ${data.text}`;
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
    } else {
      alert(" ITS INVALID URL");
    }
  });
});
