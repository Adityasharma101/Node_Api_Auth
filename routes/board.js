const express = require("express");
const {
  allBoard,
  addBoard,
  updateBoard,
} = require("../controllers/route_controllers/board");
const router = express.Router();

const verifyToken = require("../config/tokenVerification");
//PROJECT1
//get request to get all the boards stored in the database
router.get("/",  verifyToken, allBoard);

//post request to add a board in the database with validation of Joi
router.post("/", verifyToken, addBoard);

// put request to edit a board but only for a few times
router.put("/:id", verifyToken, updateBoard);

//EXPORTING THE ROUTER
module.exports = router;
