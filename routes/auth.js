const express = require("express");
const {
  allUsers,
  registeredUser,
  loginUser,
} = require("../controllers/route_controllers/auth");
const router = express.Router();
// const verifyToken = require("../config/tokenVerification");
const passport = require("passport");

//PROJECT 2
// get request to get all the users registered to the database
router.get("/", allUsers);

// post request to register a user to the databse system
router.post("/register", registeredUser);


// post request to login a user to the system
router.post('/login', loginUser)






// post request to login a user to the system using passport 
// router.post("/login", passport.authenticate('local-signin',{
//     successRedirect:'/auth/loginCheck',
//     failureRedirect:'/'
// }));





// post request to a private route using token verification
// router.get("/loginCheck", (req, res) => {
//     res.json({
//       message: "heyy we are at dashboard ",
//     });
//   });


//EXPORTING THE ROUTER
module.exports = router;
