const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const getPopularNews = async (req, res) => {
  const currentDate = new Date();
  const lastMonthDate = new Date(currentDate);
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
  try {
    const result = await fetch(
      `https://newsapi.org/v2/everything?q=Pokemon&from=${lastMonthDate}&sortBy=popularity&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`
    );
    const data = await result.json();
    res.send(data);
  } catch (error) {
    res.json({ error: error, message: "Error fetching popular news" });
  }
};

module.exports = { getPopularNews };
