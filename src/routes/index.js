const express = require('express');
const router = express.Router();

const Home = require('../controllers/home');
const user = require('../controllers/user');
const err404 = require('../controllers/404');

router.get('/', Home.index);
router.get('/usuario/cadastro', user.indexCardUser);
router.get('/usuario', user.indexUser);
router.get('/usuario', user.dataUser);
router.get('/usuario/editar/:id', user.show);
router.delete('/usuario/deletar/:id', user.deletar);
router.post('/usuario/cadastro', user.add);
router.get('*', err404.index);

module.exports = router;
