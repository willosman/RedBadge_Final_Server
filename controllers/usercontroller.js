const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require('../middleware/validate-session');
const validateAdmin = require('../middleware/validate-admin');

/*REGISTER A USER */

router.post('/register', function (req, res) {
  User.create({
    email: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password, 13),
    firstName: req.body.user.firstName,
    lastName: req.body.user.lastName,
    role: req.body.user.role
  })
  .then(function registrationSuccess(user) {
      const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24
      });
      res.json({
          user: user,
          message: 'You have successfully registered!',
          sessionToken: token
      });
  })
  .catch((err) => res.status(500).json({error: err}));
});

router.post('/validate-session', validateSession, function(req, res) {
    if(req.user) {
        res.status(200).json(true);
    }
})

/*USER LOGIN */

router.post('/login', function (req, res) {
    User.findOne({
        where: {
            email: req.body.user.email
        }
    })
    .then(function loginSuccess(user) {
        if (user) {
            bcrypt.compare(
                req.body.user.password,
                user.password,
                function (err, matches) {
                    if (matches) {
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
                            expiresIn: 60 * 60 * 24 
                        });
                        res.status(200).json({
                            user: user,
                            message: 'Welcome!',
                            sessionToken: token
                        });
                    } else {
                        res.status(502).send({error: 'login failed'});
                    }
                }
            );
        } else {
            res.status(500).json({error: "user doesn't exist"});
        }
    })
    .catch((err) => res.status(500).json({error: err}));
});

router.get('/', validateSession, validateAdmin, function(req, res) {
    User.findAll()
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({error: err}));
})

router.delete('/:id', validateSession, validateAdmin, (req, res) => {
    const query = {where: {id: req.params.id}}
    User.destroy(query)
    .then((response) =>
    res.status(200).json({
        message: "User has been destroyed!"
    }) 
    )
    .catch((err) => res.status(500).json({error: err}));
})
module.exports = router;