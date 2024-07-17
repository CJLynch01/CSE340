const pool = require("../database/")

/* *****************************
*   Register new account
* *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password){
    try {
      const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
      return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
    } catch (error) {
      return error.message
    }
}

/* **********************
 *   Check for existing email
 * ********************* */
async function checkExistingEmail(account_email){
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1"
    const email = await pool.query(sql, [account_email])
    return email.rowCount
  } catch (error) {
    return error.message
  }
}

/* *****************************
* Return account data using email address
* ***************************** */
async function getAccountByEmail (account_email) {
  try {
    const result = await pool.query(
      'SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1',
      [account_email])
    return result.rows[0]
  } catch (error) {
    return new Error("No matching email found")
  }
}

/* *****************************
 * Return account data using account id
 * *************************** */
async function getAccountById(account_id) {
  try {
    const result = await pool.query(
      "SELECT account_id, account_firstname, account_lastname, account_email, account_type FROM account WHERE account_id = $1",
      [account_id]
    );
    return result.rows[0];
  } catch (error) {
    return new Error("No matching account found");
  }
}

/* *****************************
* Update account information
* ***************************** */
async function updateInformation (account_firstname, account_lastname, account_email, account_id) {
  try {
    const sql =
      "UPDATE public.account SET account_firstname = $1, account_lastname = $2, account_email = $3 WHERE account_id = $4 RETURNING *";
    const result = await pool.query(sql, [account_firstname, account_lastname, account_email, account_id,]);
    return result.rows[0];
  } catch (error) {
    console.log("Account wasn't updated.")
    return error.message;
  }
}

/* *****************************
* Update password information
* ***************************** */
async function updatePassword(account_id, account_password) {
  try {
    const sql =
      "UPDATE account SET account_password = $1 WHERE account_id = $2 RETURNING *";
    const data = await pool.query(sql, [account_password, account_id]);
    return data.rows[0];
  } catch (error) {
    return error.message;
  }
}

/* *****************************
 * Get reviews by account_id
 * *************************** */
async function getReviewsByAccountId(account_id) {
  try {
    const sql = `SELECT review.review_text, review.review_date, review.account_id, review.review_id, inventory.inv_make, inventory.inv_model, inventory.inv_year
      FROM review JOIN inventory ON review.inv_id = inventory.inv_id WHERE review.account_id = $1`;
    return await pool.query(sql, [account_id]);
  } catch (error) {
    return error.message;
  }
}

/* *****************************
 * Get reviews by review_id
 * *************************** */
async function getReviewById(review_id) {
  try {
    const sql = "SELECT * FROM review WHERE review_id = $1";
    return await pool.query(sql, [review_id]);
  } catch (error) {
    return error.message;
  }
}

async function updateReview(review_id, review_text) {
  try {
    const sql = "UPDATE review SET review_text = $1 WHERE review_id = $2 RETURNING *";
    return await pool.query(sql, [review_text, review_id]);
  } catch (error) {
    return error.message;
  }
}

async function deleteReview(review_id) {
  try {
    const sql = "DELETE FROM review WHERE review_id = $1"
    return await pool.query(sql, [review_id])
  } catch (error) {
    return error.message;
  }
}


module.exports = { registerAccount, checkExistingEmail, getAccountByEmail, getAccountById, updateInformation, updatePassword, getReviewsByAccountId, getReviewById, updateReview, deleteReview }