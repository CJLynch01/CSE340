// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build single view
router.get("/detail/:inventoryId", invController.buildByInventoryId);

//Intentional Error
router.get("/trigger-error/:ErrorId", invController.buildError);

module.exports = router;