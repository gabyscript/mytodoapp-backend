
const express = require('express');

const { router: todos } = require('./todoRoutes');
const { router: users } = require('./userRoutes');


const router = express.Router();

router.use('/todos', todos);

router.use('/users', users);

module.exports = { router };
