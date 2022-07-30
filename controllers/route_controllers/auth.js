const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//REQUIRING userSchema SCHEMA FROM THE DATABASE
const { userSchema } = require("../models/db");

// verifyToken FUNCTION FROM THE config FOLDER TO FOR JWT TOKEN VERIFICATION
const verifyToken = require("../../config/tokenVerification");

// REQUIRING VALIDATIONS FROM config FOLDER
const {
  registerValidation,
  loginValidation,
} = require("../../config/validation");

const allUsers = async (req, res) => {
  try {
    const users = await userSchema.findAll({
      attributes: ["id", "name", "email"],
    });

    if (users) {
      res.status(200).send(users);
    } else {
      res.status(201).send("No user registered");
    }
  } catch (err) {
    res.status(500).send({
      error: "could not recieve users",
    });
  }
};

const registeredUser = async (req, res) => {
  try {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist = await userSchema.findOne({
      where: { email: req.body.email },
    });
    if (emailExist) return res.status(409).send("oops!..User Already Exist");

    // using bcrypyt to hash the password and save it to the database
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    const user = await userSchema.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPass,
    });

    jwt.sign(
      { user: user.email },
      process.env.TOKEN_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        res.status(201).json({
          user: user.name,
          token,
          message: "User has been registered",
        });
      }
    );
  } catch (error) {
    res.status(404).send(err);
  }
};
const loginUser = async (req, res) => {
  try {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await userSchema.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(409).send("oops!..User Not Registered");

    // comparing the hashed password to the login input password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(409).send("Password is incorrect");

    // creating jwt token for private routes
    // here also, expiration is declared
    jwt.sign(
      { user: user.email },
      process.env.TOKEN_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        res.status(201).json({
          token,
          message: "heyyy we logged in and above that is our JWT Token",
        });
      }
    );



    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



module.exports = {
  allUsers,
  registeredUser,
  loginUser,
};
