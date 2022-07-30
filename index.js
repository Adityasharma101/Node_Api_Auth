const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const port = process.env.PORT || 3000;
const passport = require('passport');
const session = require('express-session');
const app = express();
const {userSchema}= require('./controllers/models/db');
const passportFile =require('./config/passport');
//MIDDLEWARES


app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "25mb", extended: true }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));



// FOR PASSPORT LOGIN AUTHENTICATION
// app.use(session({
//   secret: 'im a Secret',
//   resave: true, 
//   saveUninitialized:true
//   })); // session secret
// app.use(passport.initialize());
// app.use(passport.session());
// passportFile(passport,userSchema)

//AUTHORIZATION ROUTES(REGISTRATION AND LOGIN)
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// BOARD ROUTES(GET, POST AND PUT REQ FOR THE BOARD)
const boardRoutes = require("./routes/board");
app.use("/boards", boardRoutes);

// EXT API ROUTES TO GET ARTICLES
const extApiRoutes = require("./routes/extApi");
app.use("/api", extApiRoutes);

//THE MAIN ROUTE
app.get("/", (req, res) => {
  res.send("heyyy im the main route");
});

// SERVER LISTNING
app.listen(port, () => {
  console.log(`your server is hosted at http://localhost:${port} `);
});

module.exports = app;
