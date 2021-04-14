let express = require("express")
let router = express.Router()
// const router = require('express').Router();
const validateSession = require('../middleware/validate-session');

const Card = require('../db').import('../models/card');

/*CREATE A CARD */
router.post('/', validateSession, (req,res) => {
    const cardEntry = {
        cardName: req.body.cardName,
        cmc: req.body.cmc,
        image: req.body.image,
        cardType: req.body.cardType,
        rarity: req.body.rarity,
        text: req.body.text,
        owner_id: req.user.id
    }
    Card.create(cardEntry)
    .then(card => res.status(200).json(card))
    .catch(err =>res.status(500).json({error: err}))
})

/*GET ALL CARDS */
router.get('/', validateSession, (req, res) => {
    let userid = req.user.owner_id
    Card.findAll({
        // where: {owner_id: userid}
    })
    .then(card => res.status(200).json(card))
    .catch(err => res.status(500).json({error: err}))
})

/*GET CARD BY ID */
router.get('/:id', function(req, res) {
    let id = req.params.id;
    Card.findAll({
        where: {id: id}
    })
    .then(card => res.status(200).json(card))
    .then(err => res.status(500).json({error: err}))
});

/*UPDATE CARD */
router.put('/:id', validateSession, function(req, res) {
    const updateCardEntry = {
        cardName: req.body.cardName,
        cmc: req.body.cmc,
        image: req.body.image,
        cardType: req.body.cardType,
        rarity: req.body.rarity,
        text: req.body.text
    }
    const query = {where: {id: req.params.id, owner_id: req.user.id}}

    Card.update(updateCardEntry, query)
    .then((card) => res.status(200).json(card))
    .catch((err) => res.status(500).json({error: err}))
});

/*DELETE CARD */ 
router.delete('/:id', validateSession, (req, res) => {
    const query = {where: {id: req.params.id, owner_id: req.user.id}};
    Card.destroy(query)
    .then((response) => 
    res.status(200).json({
        message: "Card has been destroyed!",
    })
    )
    .catch((err) => res.status(500).json({error: err}))
})
module.exports = router