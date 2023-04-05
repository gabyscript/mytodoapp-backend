
const pool = require('../database/index');
const format = require('pg-format');
const bcrypt = require('bcryptjs');
const pg = require('pg');

const jwt = require("jsonwebtoken");

const getUserData = async (email) => {
    const values = [email];
    let consulta = 'SELECT users.id as user_id, users.firstname, users.lastname, users.mail,todos.id as todo_id, todos.name,  checked FROM users FULL JOIN todos ON users.id = todos.user_id WHERE mail = $1';
    let {rows} = await pool.query(consulta, values);    
    
    return {rows};
}

const registerUser = async (pool, user) => {
    let {email, password, firstname, lastname, gender} = user;
    const encriptedPass = bcrypt.hashSync(password);
    password = encriptedPass;
    const values = [email, password, firstname, lastname, gender];
    const consulta = "INSERT INTO users values (DEFAULT, $1, $2, $3, $4, $5)";
    await pool.query(consulta,values)
}

const verifyUser = async (email, password) => {
    const values = [email];
    const consulta = "SELECT * FROM users WHERE mail = $1"
    const { rows: [user], rowCount } = await pool.query(consulta, values)
    const { password: encriptedPass } = user
    const rightPassword = bcrypt.compareSync(password, encriptedPass)
    if (!rightPassword || !rowCount)
        throw { code: 401, message: "Email o contraseña incorrecta" }
}

module.exports = {
    getUserData,
    registerUser,
    verifyUser
};