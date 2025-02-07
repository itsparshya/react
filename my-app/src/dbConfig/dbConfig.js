import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',       // MySQL host (localhost or your remote DB)
  user: 'root',            // MySQL user
  password: 'yourpassword',    // MySQL password
  database: 'react'    // Your database name

});

export default pool;
