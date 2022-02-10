const Router = require('express');
const router = new Router();
const controller = require('./auth-controller');
const { check } = require('express-validator');
const authMiddleWare = require('./middleware/authMiddleware');
const roleMiddleWare = require('./middleware/roleMiddleWare');

router.post('/registration', [
    check('username', 'Username can not be empty'),
    check('password', 'Password can be more 4 and less 10 symbols').isLength({min: 4, max: 10}),
    controller.registration
]);
router.post('/login', controller.login);
router.get('/users', roleMiddleWare(['ADMIN']), controller.getUsers);

module.exports = router;
