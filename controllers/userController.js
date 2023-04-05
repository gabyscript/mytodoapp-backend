const pool = require('../database/index');
const format = require('pg-format');
const jwt = require('jsonwebtoken');
const {getUserData, registerUser, verifyUser} = require('../services/userService')

const register = async(req, res) => {
    try {
        const user = req.body;
        await registerUser(pool, user)        
        res.send("Usuario creado con éxito")
    } catch (error) {        
        res.status(500).send(error)
        console.log(error)
    }
}

const loginUser = async (req,res) => {
    try {
        const { email, password } = req.body;
        await verifyUser(email, password);
        const token = jwt.sign({ email }, "az_AZ");
        res.send(token)
    } catch (error) {
        res.status(error.code || 500).send(error)
    }
}

const showUserData = async (req,res) => {
    try {
        const Authorization = req.header('Authorization');
        const token = Authorization.split('Bearer ')[1];
        jwt.verify(token, 'az_AZ');
        const {email} = jwt.decode(token);
        const userData = await getUserData(email);
        res.json(userData)
    } catch (error) {
        res.status(error.code || 401).send(error);
    }
}

module.exports = {
    register,
    loginUser,
    showUserData
};

