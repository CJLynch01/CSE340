const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/index");
const accountController = require("../controllers/accountController");

// Route to build inventory by classification view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

//Route to build registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))

//Route post
router.post("/register", utilities.handleErrors(accountController.registerAccount))

module.exports = router;