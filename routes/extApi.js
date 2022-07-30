const express = require("express");
const {
  storeArticle,
  findArticle,
} = require("../controllers/route_controllers/extApi");
const router = express.Router();

//INTEGRATION OF THE EXTERNAL ARTICLE API
//get req to gett all the data and save it to database
router.get("/", storeArticle);

//get req to get specific number of articles from the api
router.get("/article/:num", findArticle);

module.exports = router;
