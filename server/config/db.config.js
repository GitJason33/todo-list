const postgres = require('pg');
const config = require('config');


const pool = new postgres.Pool(config.get("db_onrender"));

module.exports = pool;


/**
 * for some performance reasons, we can use this code to connect a single connection
 * for transactions: 

  // get a client from the pool
  const client = await pool.connect();
  try {
    // begin a transaction
    await client.query('BEGIN');

    // execute multiple queries using the same client
    await client.query('INSERT INTO users (name, email) VALUES ($1, $2)', ['Alice', 'alice@example.com']);
    await client.query('UPDATE users SET email = $1 WHERE name = $2', ['bob@example.com', 'Bob']);

    // commit the transaction
    await client.query('COMMIT');
  } catch (err) {
    // rollback the transaction in case of error
    await client.query('ROLLBACK');
    console.error(err);
  } finally {
    // release the client back to the pool
    client.release();
  }
 */