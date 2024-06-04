const fetchData = async (url = "", data = { url: "" }) => {
  try {
    const response = await axios.post(url, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("response", response);
    return response.data;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
};

module.exports = {
  fetchData,
};
