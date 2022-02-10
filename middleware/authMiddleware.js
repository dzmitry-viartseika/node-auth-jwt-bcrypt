const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        console.log('req.header', req.header);
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(403).json({message: 'You need to be autorizated'});
        const decodedDate = jwt.verify(token, secret);
        req.user = decodedDate;
        next();
    } catch (e) {
        console.log(e);
        res.status(400).json({message: 'You need to be autorizated'});
    }
}
