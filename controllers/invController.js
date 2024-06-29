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
invCont.newclassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  req.flash("notice", "This is a flash message.");
  res.render("./inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
  })
}

/* ***************************
 * Process New Classification to database
 * ************************** */
invCont.processclassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body
  const addResult = await invModel.addclassification(classification_name)
  if (addResult) {
    req.flash("info success", `${classification_name} added successfully.`)
    res.status(201).render("./inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: null,
      classification_name,
    });
  } else {
    req.flash("notice", "Sorry, the classification failed.");
    res.status(501).render("./inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: null,
      classification_name,
    });
  }
};

/* ***************************
 *  Show add inventory view
 * ************************** */
invCont.addinventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const dropdown = await utilities.buildClassificationList();
  req.flash("notice", "This is a flash message.");
  res.render("./inventory/add-inventory", {
    title: "Add New Inventory",
    nav,
    dropdown,
    errors: null,
  })
}

/* ***************************
* Process add inventory form submission
* ************************** */
invCont.processAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav();
  let dropdown = await utilities.buildClassificationList(classification_id);
  
  const { inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_color, classification_id } = req.body;
  const createResult = await invModel.addinventory(inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_color, classification_id);

  if (createResult) {
      req.flash("notice", "Vehicle added successfully.");
      res.status(201).render("./inventory/add-inventory", {
        title: "Add Inventory",
        nav,
        errors: null,
        dropdown,
      });
  } else {
      req.flash("notice", "Sorry, there was an error adding the vehicle.");
      res.status(500).render("./inventory/add-inventory", {
        title: "Add Inventory",
        nav,
        errors: null,
        dropdown,
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

module.exports = { invCont, errormess };