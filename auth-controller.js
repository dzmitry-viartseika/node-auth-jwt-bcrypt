const User = require('./model/User');
const Role = require('./model/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { secret } = require('./config');

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }

    return jwt.sign(payload, secret, {
        expiresIn: '24h'
    });
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {username, password, role} = req.body;
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({username, password: hashPassword, roles: [role]})
            await user.save()
            return res.json({message: "Пользователь успешно зарегистрирован", test: user})
        } catch(e) {
            console.log(e);
            res.status(400).json({message: 'Registartion error'});
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) return res.status(400).json({message: `Current User ${username} hasn't founded`});
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) return res.status(400).json({message: `Check your password`});
            const token = generateAccessToken(user._id, user.roles);
            return  res.json({token})
        } catch(e) {
            res.status(400).json({message: 'Login error'});
        }
    }

    async getUsers(req, res) {
        try {
            // const userRole = new Role();
            // const adminRole = new Role({value: 'ADMIN'});
            const users = await User.find();
            res.json(users)
            // await userRole.save();
            // await adminRole.save();
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = new authController();
