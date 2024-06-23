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
 *  Add inventory to database
 * ************************** */
// async function addInventory(year, make, model, classification_id, description, image, thumbnail) {
//   const queryText = `
//     INSERT INTO public.inventory (inv_year, inv_make, inv_model, classification_id, inv_description, inv_image, inv_thumbnail)
//     VALUES ($1, $2, $3, $4, $5, $6, $7)
//   `;
//   const values = [year, make, model, classification_id, description, image, thumbnail];
//   try {
//     const result = await pool.query(queryText, values);
//     return result.rowCount > 0;
//   } catch (error) {
//     console.error("Error adding inventory: " + error);
//     return false;
//   }
// }

module.exports = {getClassifications, getInventoryByClassificationId, getInventoryByID}