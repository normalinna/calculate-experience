const People = require('../models/People');
const {Router} = require('express');
const verify = require('../middleware/verifyToken');

const router = Router();

router.post('/calculation', verify, async (req, res) => {
    try {
        const {name, exp} = req.body;

        const existingPeople = await People.findOne({name});

        if (existingPeople) {
            return res.status(400).json({message: 'This people is existing'});
        }

        const people = new People({
            name, experience: exp, owner: req.user.userId
        });

        await people.save();

        res.status(201).json({people});

    } catch (e) {
        res.status(500).json({message: "Server error, try it again"});
    }
});

router.get('/peoples', verify, async (req, res) => {
    try {
        const peoples = await People.find({owner: req.user.userId});
        res.status(201).json(peoples);
    } catch (e) {
        res.status(500).json({message: "Server error, try it again"});
    }
});
module.exports = router;
