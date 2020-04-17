const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
     try {
         const token = req.headers.authorization.split(' ')[1];
         if (!token) {
             console.log(token);
             return res.status(401).json({ message: 'Not autheticated user'});
         }

        if (token) {
            const decoded = jwt.verify(token, config.get('jwtSecret'));
            req.user = decoded;
            next();
        } else {
            return res.json({
                success: false,
                message: 'Auth token is not supplied'
            });
        }
    } catch (e) {
         console.log(e);
        res.status(401).json({message: 'Not autheticated user'});
    }
};
