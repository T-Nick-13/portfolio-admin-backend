const router = require('express').Router();
const {
  createUser, getUserMe
} = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');

router.post('/signup', createUser);
router.get('/users/me', authMiddleware, getUserMe);

module.exports = router;
