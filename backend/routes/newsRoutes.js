const express = require("express");
const { getPopularNews } = require("../controllers/newsController")

const router = express.Router();

router.get('/getPopular', getPopularNews);

module.exports = router;