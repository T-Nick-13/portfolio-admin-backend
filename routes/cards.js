const router = require('express').Router();
const { createCard, getCard, deleteCard } = require('../controllers/cards');
const upload = require('../middlewares/upload');

router.post('/', upload, createCard); 
router.get('/', getCard); 
router.delete('/:cardId', deleteCard);

module.exports = router;
