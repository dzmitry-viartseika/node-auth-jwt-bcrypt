const User = require('./model/User');
const Role = require('./model/Role');

class authController {
    async registration(req, res) {
        try {
            console.log('1')
        } catch(e) {
            console.log(e);
        }
    }

    async login(req, res) {
        try {
            console.log('1')
        } catch(e) {
            console.log(e);
        }
    }

    async getUsers(req, res) {
        try {
            const userRole = new Role();
            const adminRole = new Role({ value: 'ADMIN' });
            await userRole.save();
            await adminRole.save();
            res.json('ADDED ROLES')
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = new authController();
