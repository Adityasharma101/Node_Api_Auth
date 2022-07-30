const jwt = require("jsonwebtoken");
// const verifyToken = require('../../config/tokenVerification');

//REQUIRING board SCHEMA FROM THE DATABASE
const { boardSchema } = require("../models/db");

//REQUIRING boardvalidation FROM THE config FOLDER
const { boardValidation } = require("../../config/validation");

const allBoard = async (req, res) => {
  jwt.verify(req.token, process.env.TOKEN_SECRET, async (err, auth) => {
    if (err) return res.status(403).send("That's Forbidden ");

    try {
      const boards = await boardSchema.findAll({
        attributes: ["id", "stage", "title"],
      });

      if (boards) {
        res.status(200).send(boards);
      } else {
        restart.status(404).send("boards Not Found");
      }
    } catch (error) {
      res.status(500).send({
        error: "could not recieve users",
      });
    }
  });
};

const addBoard = async (req, res) => {
  jwt.verify(req.token, process.env.TOKEN_SECRET, async (err, auth) => {
    if (err) return res.status(403).send("That's Forbidden ");

    try {
      const { error } = boardValidation(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const boards = await boardSchema.findAll({});

      const id = boards[boards.length - 1].id + 1;

      const board = await boardSchema.create({
        id: id,
        stage: req.body.stage,
        title: req.body.title,
      });

      if (board) {
        res.status(201).json({
          id: id,
          title: req.body.title,
          stage: req.body.stage,
          messge: "we have created the user" 
        });
      } else {
        res.status(400).json({ messge: "User couldn't be created" });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  });
};

const updateBoard = async (req, res) => {
  jwt.verify(req.token, process.env.TOKEN_SECRET, async (err, auth) => {
    if (err) return res.status(403).send("That's Forbidden ");

    let id = req.params.id;
    try {
      const board = await boardSchema.findByPk(id);

      if (board) {
        let obj = board.stage;

        if (obj < 3) {
          await boardSchema.update(req.body, {
            where: { id: id },
          });
          await boardSchema.increment("stage", { by: 1, where: { id: id } });
          res.status(200).json({
            message: "updated the object",
            stage: board.stage + 1,
            title: req.body.title,
          });
        } else {
          res.status(400).json({ message: "cant update" });
        }
      }
    } catch (error) {
      res.status(400).send(error);
    }
  });
};

module.exports = {
  allBoard,
  addBoard,
  updateBoard,
};
