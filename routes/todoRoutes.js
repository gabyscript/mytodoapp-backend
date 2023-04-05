
const express = require('express');
const todoController = require('../controllers/todoController')

const router = express.Router();

router.post('/', todoController.addNewTodo)

router.delete('/:id', todoController.deleteTodo )

router.patch('/:id', todoController.checkTodo )

module.exports = { router };