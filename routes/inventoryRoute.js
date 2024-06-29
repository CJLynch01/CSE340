const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/index");
const { invCont, errormess } = require("../controllers/invController");

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invCont.buildByClassificationId));

// Route to build single view
router.get("/detail/:inventoryId", utilities.handleErrors(invCont.buildByInventoryId));

// Route for management view
router.get("/", utilities.handleErrors(invCont.management));

// Route for add classification view
router.get("/add-classification", 
    utilities.handleErrors(invCont.newclassification));

router.post("/add-classification",
    utilities.handleErrors(invCont.processclassificationclassification));

// Route for add inventory view
router.get("/add-inventory", utilities.handleErrors(invCont.addinventory));

// Route to process add inventory form submission
router.post("/add-inventory", utilities.handleErrors(invCont.processAddInventory));

// Intentional Error Route
router.get("/trigger-error", utilities.handleErrors(errormess.buildError));

module.exports = router;