
const pool = require('../database/index');
const pg = require('pg');
const format = require('pg-format');

const addTask = async (newTask) => {
    let {user_id, name} = newTask;
    const values = [user_id, name];
    const consulta = 'INSERT INTO todos values (DEFAULT, $1, $2, DEFAULT)';
    await pool.query(consulta, values)
}

const deleteTask = async (id, email) => {
    const consulta = 'DELETE FROM todos WHERE id = $1 AND user_id = ( SELECT id FROM users WHERE mail = $2) '
    const values = [id, email];
    const {rowCount} = await pool.query(consulta, values);
    if (rowCount === 0) {
        throw {code: 404, message: "No se ha encontrado ninguna tarea con la id señalada."}
    }
}

const checkTask = async (check,id, email) => {
    const consulta = 'UPDATE todos SET checked = $1 WHERE id = $2 AND user_id = ( SELECT id FROM users WHERE mail = $3) '
    const values = [check,id, email];
    const {rowCount} = await pool.query(consulta, values);
    if (rowCount === 0) {
        throw {code: 404, message: "No se ha encontrado ninguna tarea con la id señalada."}
    }
}

module.exports = {
    addTask,
    deleteTask,
    checkTask
};