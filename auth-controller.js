const User = require('./model/User');
const Role = require('./model/Role');
const bcrypt = require('bcryptjs');

class authController {
    async registration(req, res) {
        try {
            const { username, password } = req.body;
            const candidate = await User.findOne({ username });
            if (candidate) return res.status(400).json({ message: 'User with the same name already exists' });
            const hashPassword = bcrypt.hashSync(password, 7)
            const user = new User({ username, password: hashPassword })
        } catch(e) {
            console.log(e);
            res.status(400).json({message: 'Registartion error'});
        }
    }

    async login(req, res) {
        try {
            console.log('1')
        } catch(e) {
            res.status(400).json({message: 'Login error'});
        }
    }

    async getUsers(req, res) {
        try {
            // const userRole = new Role();
            // const adminRole = new Role({ value: 'ADMIN' });
            // await userRole.save();
            // await adminRole.save();
            res.json('ADDED ROLES')
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = new authController();
