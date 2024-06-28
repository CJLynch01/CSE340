const pool = require("../database/")
const invModel= {};

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

/* ***************************
 *  Get single view by item ID
 * ************************** */
async function getInventoryByID(inventory_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory
       WHERE inv_id = $1`,
      [inventory_id]
    );
    return data.rows[0]
  } catch (error) {
    console.error("Error getting inventory item by ID: " + error)
  }
}

/* ***************************
 *  Put New Classification into database
 * ************************** */
async function addNewClassification(classification_name) {
  try {
    const data = await pool.query(
      `INSERT INTO classification (classification_name) VALUES($1) RETURNING *`,
      [classification_name]
    )
    return data.rows[0]
  } catch (error) {
    console.error("add class to db error " + error)
  }
}

/* ***************************
 *  Add inventory to database
 * ************************** */
async function addinventory(inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_color, classification_id) {
  const inv_image = "/images/vehicles/no-image.png";
  const inv_thumbnail = "/images/vehicles/no-image-tn.png";
  const result = await pool.query(
      `
          INSERT INTO public.inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          RETURNING *;
      `,
      [inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id]
  );
  return result.rows[0];
}

module.exports = {getClassifications, getInventoryByClassificationId, getInventoryByID, addinventory, addNewClassification}