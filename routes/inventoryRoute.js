const express = require("express");
const router = new express.Router();
const { invCont, errormess } = require("../controllers/invController");

// Route to build inventory by classification view
router.get("/type/:classificationId", invCont.buildByClassificationId);

// Route to build single view
router.get("/detail/:inventoryId", invCont.buildByInventoryId);

// Intentional Error Route
router.get("/trigger-error", errormess.buildError);

module.exports = router;