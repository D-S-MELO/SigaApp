const express = require('express');
const router = express.Router();

const Home = require('../controllers/home');
const cadUser = require('../controllers/user');
const err404 = require('../controllers/404');

router.get('/', Home.index);
router.get('/usuario/add', cadUser.indexCardUser);
router.get('/usuario', cadUser.indexUser);
router.get('*', err404.index);

module.exports = router;
