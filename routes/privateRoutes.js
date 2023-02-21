const router = require('express').Router();
const authenticateUser = require('./verifyToken');

/**
 * @desc using authenticateUser as a middleware for validation
 */
router.get('/', authenticateUser,(req, res) => {
    res.send(req.user)
})

module.exports = router