const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}
const errormess = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build single view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inventory_id = req.params.inventoryId
  const data = await invModel.getInventoryByID(inventory_id)
  const grid = await utilities.buildItemGrid(data)
  let nav = await utilities.getNav()
  res.render("./inventory/detail", {
    title: data.inv_year + ' ' + data.inv_make + ' ' + data.inv_model,
    nav,
    grid,
  })
}

/* ***************************
 *  Show management view
 * ************************** */
invCont.management = async function (req, res, next) {
  let nav = await utilities.getNav()
  req.flash("notice", "This is a flash message.");
  res.render("./inventory/management", {
    title: "Inventory Management",
    nav,
  })
}

/* ***************************
 *  Show add classification view
 * ************************** */
invCont.addclassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  req.flash("notice", "This is a flash message.");
  res.render("./inventory/add-classification", {
    title: "Add New Classification",
    nav,
  })
}

/* ***************************
 *  Show add inventory view
 * ************************** */
invCont.addinventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  // const classificationList = await utilities.buildClassificationList();
  // req.flash("notice", "This is a flash message.");
  res.render("./inventory/add-inventory", {
    title: "Add New Inventory",
    nav,
    // classificationList,
    // messages: req.flash(),
    // FormData: req.body,
  })
}

/* ***************************
* Process add inventory form submission
* ************************** */
// invCont.processAddInventory = async function (req, res, next) {
//   const { year, make, model, classification_id, description } = req.body;
//   const image = req.file ? req.file.filename : 'no-image.jpg'; // Default image path
//   const thumbnail = req.file ? req.file.filename : 'no-image-thumbnail.jpg'; // Default thumbnail path

//   const result = await invModel.addInventory(year, make, model, classification_id, description, image, thumbnail);
//   if (result) {
//     req.flash("success", "New inventory added successfully!");
//     res.redirect("/inv");
//   } else {
//     req.flash("error", "Failed to add new inventory. Please try again.");
//     res.redirect("/inv/add-inventory");
//   }
// };

// Build Error
errormess.buildError = (req, res, next) => {
    throw new Error("Intentional error occurred");
};

module.exports = { invCont, errormess };