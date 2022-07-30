const axios = require("axios").default;

const { articleSchema } = require("../models/db");

const storeArticle = async (req, res) => {
  const api = await axios.get(
    "https://jsonmock.hackerrank.com/api/articles?page"
  );

  if (api) {
    try {
      for (let i of api.data.data) {
        if (i.title == null && i.story_title == null) {
          continue;
        } else {
          if (i.title == null) {
            if (i.story_title != null) {
              i.title = i.story_title;
            }
          }

          const articleExist = await articleSchema.findOne({
            where: { comment: i.num_comments },
          });
          if (articleExist)
            return res.status(400).send("we have already entered your entries");

          const article = await articleSchema.create({
            name: i.title,
            comment: i.num_comments,
            story_title: i.story_title,
          });
        }
      }
      res.status(201).send("we have entered your entries");
    } catch (error) {
      console.log(error);
    }
  } else {
    console.error("API DOES NOT RESPONDED ");
  }
};

const findArticle = async (req, res) => {
  const num = req.params.num;
  const articles = await articleSchema.findAll({
    limit: parseInt(num),
    order: [["comment", "DESC"]],
  });

  if (articles) {
    res.status(200).send(articles);
  } else {
    res.status(500).send({
      error: "could not recieve users",
    });
  }
};

module.exports = {
  storeArticle,
  findArticle,
};
