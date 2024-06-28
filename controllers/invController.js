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
    errors: null,
  })
}

/* ***************************
 * Add New Classification to database
 * ************************** */
invCont.addClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body
  const addResult = await invModel.addNewClassification(classification_name)
  if (addResult) {
    req.flash("info success", `${classification_name} added successfully.`)
    res.redirect("/inv/")
  } else {
    req.flash("info error", "Classification not entered. Try again.")
    res.render("./inventory/add-classification", {
      title: "Add New Classification Page",
      nav,
      errors: null,
    })
  }
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
    errors: null,
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
    errors: null,
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
 * Show New Classification Form
 * ************************** */
invCont.newclassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add New Classification Page",
    nav,
    errors: null,
  })
}

/* ***************************
 *  Show add inventory view
 * ************************** */
invCont.addinventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList();
  req.flash("notice", "This is a flash message.");
  res.render("./inventory/add-inventory", {
    title: "Add New Inventory",
    nav,
    classificationList,
  })
}

/* ***************************
* Process add inventory form submission
* ************************** */
invCont.processAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav();
  let classifications = await utilities.buildClassificationList();
  const { inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_color, classification_id } = req.body;

  const createResult = await invModel.addinventory(inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_color, classification_id);

  if (createResult) {
      req.flash("notice", "Vehicle added successfully.");
      res.status(201).redirect("/inv");
  } else {
      req.flash("notice", "Sorry, there was an error adding the vehicle.");
      res.status(500).render("./inventory/add-inventory", {
          title: "New Vehicle Form",
          nav,
          classifications,
          inv_make,
          inv_model,
          inv_year,
          inv_description,
          inv_price,
          inv_miles,
          inv_color,
          classification_id
      });
  }
}

// Build Error
errormess.buildError = (req, res, next) => {
    throw new Error("Intentional error occurred");
};

module.exports = { invCont, errormess, newclassification, addclassification };