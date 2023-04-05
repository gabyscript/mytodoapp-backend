const pool = require('../database/index');
const format = require('pg-format');
const jwt = require('jsonwebtoken');
const {addTask, deleteTask, checkTask} = require('../services/todoService');


const addNewTodo = async (req,res) => {
    try {
        const newTodo = req.body;
        await addTask(newTodo);
        res.send("Tarea creada con éxito")
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}

const deleteTodo = async (req, res) => {
    try {
        const Authorization = req.header('Authorization');
        const token = Authorization.split('Bearer ')[1];
        jwt.verify(token, 'az_AZ');
        const {email} = jwt.decode(token);
        const {id} = req.params;
        await deleteTask(id, email)
        res.send("Tarea eliminada con éxito")        
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}

const checkTodo = async (req, res) => {
    try {
        const Authorization = req.header('Authorization');
        const token = Authorization.split('Bearer ')[1];
        jwt.verify(token, 'az_AZ');
        const {email} = jwt.decode(token);
        const {id} = req.params;
        const {check} = req.body;
        await checkTask(check,id, email);
        res.send("Tarea checkeada con éxito")        
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}

module.exports = {
    addNewTodo,
    deleteTodo,
    checkTodo
};

