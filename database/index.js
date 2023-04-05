const { Pool } = require('pg');

const DATABASE_HOST = process.env.PGHOST ;
const DATABASE_USER = process.env.PGUSER ; 
const DATABASE_PASSWORD = process.env.PGPASSWORD ; 
const DATABASE_NAME = process.env.PGDATABASE ;
const DATABASE_PORT = process.env.PGPORT ;

const pool = new Pool({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    port: DATABASE_PORT,
    allowExitOnIdle: true
});

module.exports = pool;