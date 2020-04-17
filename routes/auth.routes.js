const {Router} = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = Router();

//  /api/auth/register
router.post('/register',
        [
        check('email', 'Email not validate').isEmail(),
        check('nickname', 'Nickname length mast be 6 characters').isLength({min: 6}),
        check('password', 'Min password length mast be 6 characters')
                .isLength({min: 6})
        ],
    async (req, res) => {
        const errors = validationResult(req);
        
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const {email, nickname, password} = req.body;

            const existUserEmail = await User.findOne({email: email});

            if (existUserEmail) {
                return res.status(400).json({message: 'User with data email is exist'});
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({email, nickname, password: hashedPassword});

            await user.save();
            // res.send(user);
            res.status(201).json({message: "User was created"});
        } catch (e) {
            res.status(500).json({ message: 'Server error, try it again'});
        }
    });

//  /api/auth/login
router.post('/login',
    [
        check('email', 'Enter the correct email').normalizeEmail().isEmail(),
        check('password', 'Enter the his password').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        try {

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const {email,password} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                return res.status(400).json({message: 'User not found'});
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({message: 'Password not correct, try it again'});
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '2h'}
            );

            res.json({token, userId: user.id});
        } catch (e) {
            res.status(500).json({ message: 'Server error, try it again'});
        }
    });

module.exports = router;
