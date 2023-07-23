const express = require('express');
const router = express.Router();

const Home = require('../controllers/home');
const user = require('../controllers/user');
const err404 = require('../controllers/404');
const ativos = require('../controllers/ativos');
const local = require('../controllers/local');

router.get('/', Home.index);
router.get('/usuario/cadastro', user.indexCardUser);
router.get('/usuario', user.indexUser);
router.get('/usuario', user.dataUser);
router.get('/usuario/editar/:id', user.show);
router.delete('/usuario/deletar/:id', user.deletar);
router.put('/usuario/editar/:id', user.update);
router.post('/usuario/cadastro', user.add);
router.get('/ativos', ativos.indexAtivos);
router.get('/ativos/local', ativos.local);
router.get('/local', local.index);
router.get('/local/cadastro', local.indexCadastro);
router.post('/local/cadastro', local.add);
router.get('/local/editar/:id', local.show);
router.put('/local/editar/:id', local.update);
router.delete('/local/deletar/:id', local.deletar);
router.get('*', err404.index);

module.exports = router;
