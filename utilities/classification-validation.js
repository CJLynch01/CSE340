const utilities = require(".");
const { body, validationResult } = require("express-validator");
const validate = {};

/* ******************************
 * Classification Rules
 * ***************************** */
validate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .isAlphanumeric()
      .withMessage(
        "Please provide a classification name that meets the requirements."
      ),
  ];
};

/* ******************************
 * Check classification name
 * ***************************** */
validate.checkClassificationName = async (req, res, next) => {
  const { classification_name } = req.body;
  let errors = [];
  errors = validationResult(req);
  let nav = await utilities.getNav();
  if (!errors.isEmpty()) {
    console.log(errors);
    res.render("inventory/add-classification", {
      errors,
      title: "Add Classification",
      nav,
      classification_name,
    });
    return;
  }
  next();
};

module.exports = validate;