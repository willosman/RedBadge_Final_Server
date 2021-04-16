let express = require("express")
let router = express.Router()
const validateSession = require('../middleware/validate-session')

const Cardtype = require('../db').import('../models/cardtype');

/*CREATE Cardtype */

router.post('/', validateSession, (req, res) => {
    const cardTypeEntry = {
        type: req.body.type,
        card_id: req.user.id
    }
    Cardtype.create(cardTypeEntry)
    .then(type => res.status(200).json(type))
    .catch(err => res.status(500).json({error: err}))
})

/* GET ALL CARD TYPE */
router.get('/', validateSession, (req, res) => {
    let userid = req.user.owner_id
    Cardtype.findAll({
        // where: {card_id: userid}
    })
    .then(type => res.status(200).json(type))
    .catch(err => res.status(500).json({error: err}))

})

/*GET CARD TYPE BY ID */
router.get('/:id', function(req, res) {
    let id = req.params.id;
    Cardtype.findAll({
        where: {id: id}
    })
    .then(type => res.status(200).json(type))
    .then(err => res.status(500).json({error: err}))
});

/*UPDATE CARD TYPE */
router.put('/:id', validateSession, function(req, res) {
    const updateCardType = {
        type: req.body.type
    }
    const query = {where: {id: req.params.id}}

    Cardtype.update(updateCardType, query)
    .then((type) => res.status(200).json(type))
    .catch((err) => res.status(500).json({error: err}))
})

/*DELETE CARD TYPE */
router.delete('/:id', validateSession, (req, res) => {
    const query = {where: {id: req.params.id}};
    Cardtype.destroy(query)
    .then((response) => 
    res.status(200).json({
        message: "Card Type has been destroyed",
    }))
    .catch((err) => res.status(500).json({error: err}))
})

module.exports = router;