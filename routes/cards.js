const router = require('express').Router();
const { createCard, getCard, deleteCard, editCard } = require('../controllers/cards');
const upload = require('../middlewares/upload');

router.post('/', upload, createCard); 
router.get('/', getCard); 
router.delete('/:cardId', deleteCard);
router.patch('/', editCard);

module.exports = router;
