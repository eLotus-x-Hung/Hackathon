const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validations.js');
const User = require('../models/UserModel');

/**
 * @desc Routers
 */
router.post('/register', async (req, res) => {

    /**
     * @desc Validation check
     */
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    /**
     * @desc Username uniqueness check
     */
    const usernameExists = await User.findOne({ username: req.body.username });
    if(usernameExists) return res.status(400).send('Username address already exists');

    /**
     * @desc Hash the password
     */
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    /**
     * @desc Save user
     */
    const user = User({
        username: req.body.username,
       password: hashedPassword
    });

    try {
        const newUser = await user.save()
        res.send({user: newUser._id});
    } catch (error) {
        res.send({message: error})
    }
})

router.post('/login', async (req, res) => {

    /**
     * @desc Validation check
     */
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    /**
     * @desc Username existance check
     */
    const registeredUser = await User.findOne({ username: req.body.username });
    if(!registeredUser) return res.status(400).send('User with this username does not exist');

    /**
     * @desc Check password
     */
    const passwordMatch = bcrypt.compareSync(req.body.password, registeredUser.password);
    if(!passwordMatch) return res.status(400).send('Username or Password do not match');

    /**
     * @desc Create and assign JWT
     */
    const token = jwt.sign({_id: registeredUser._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRE_TOKEN_TIME
    });
    res.header('auth-token', token).send(token);
})

module.exports = router