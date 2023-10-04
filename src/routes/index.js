const express = require('express');
const router = express.Router();

const Home = require('../controllers/home');
const user = require('../controllers/user');
const err404 = require('../controllers/404');
const ativos = require('../controllers/ativos');
const local = require('../controllers/local');
const so = require('../controllers/so');
const placaMae = require('../controllers/placamae');
const processador = require('../controllers/processador');
const memoria = require('../controllers/memoria');
const armazenamento = require('../controllers/armazenamento');
const fonte = require('../controllers/fonte');
const placas = require('../controllers/placas');
const gabinete = require('../controllers/gabinete');
const monitor = require('../controllers/monitor');
const cooler = require('../controllers/cooler');
const hardware = require('../controllers/hardware');
const chamados = require('../controllers/chamados');
const login = require('../controllers/login');

//Rota Principal
const verificarAutenticacao = (request, response, next) => {
  // Se o usuário estiver autenticado, chama o próximo middleware
  if (request.isAuthenticated()) {
    return next();
  } else {
    return response.redirect('/login');
  }
};

router.get('/', verificarAutenticacao, Home.index);

//Rotas da Tela de Login
router.get('/login', login.index);
router.post('/login', login.auth);

//Rota da tela de Usuários
router.get('/usuario/cadastro', verificarAutenticacao, user.indexCardUser);
router.get('/usuario', verificarAutenticacao, user.indexUser);
router.get('/usuario', verificarAutenticacao, user.dataUser);
router.get('/usuario/getUsuarios', verificarAutenticacao, user.getDadosUser);
router.get('/usuario/findUsuarios', verificarAutenticacao, user.findUser);
router.get('/usuario/editar/:id', verificarAutenticacao, user.show);
router.delete('/usuario/deletar/:id', verificarAutenticacao, user.deletar);
router.put('/usuario/editar/:id', verificarAutenticacao, user.update);
router.post('/usuario/cadastro', verificarAutenticacao, user.add);
//Rotas da Tela de Ativos
router.get('/ativosAdd', verificarAutenticacao, ativos.indexAtivos);
router.get('/ativosAdd/local', verificarAutenticacao, ativos.local);
router.get('/ativosAdd/so', verificarAutenticacao, ativos.so);
router.get('/ativosAdd/placaMae', verificarAutenticacao, ativos.placa);
router.get(
  '/ativosAdd/processador',
  verificarAutenticacao,
  ativos.processadores
);
router.get('/ativosAdd/memoria', verificarAutenticacao, ativos.memoria);
router.get(
  '/ativosAdd/armazenamento',
  verificarAutenticacao,
  ativos.armazenamentos
);
router.get('/ativosAdd/fonte', verificarAutenticacao, ativos.fontes);
router.get('/ativosAdd/placaVideo', verificarAutenticacao, ativos.placaVideo);
router.get('/ativosAdd/monitor', verificarAutenticacao, ativos.monitors);
router.get('/ativosAdd/gabinete', verificarAutenticacao, ativos.gabinetes);
router.get('/ativosAdd/cooler', verificarAutenticacao, ativos.coolers);
router.post('/ativos/cadastro', verificarAutenticacao, ativos.add);
router.get('/ativos', verificarAutenticacao, ativos.show);
router.get(
  '/ativos/getDadosAtivos',
  verificarAutenticacao,
  ativos.getDadosAtivos
);
router.get(
  '/ativos/getDadosGraficos',
  verificarAutenticacao,
  ativos.getDadosGraficos
);
router.delete('/ativos/deletar/:id', verificarAutenticacao, ativos.deletar);
router.get('/ativos/editar/:id', verificarAutenticacao, ativos.showEquipamento);
router.put('/ativos/editar/:id', verificarAutenticacao, ativos.update);
router.get('/ativos/findAtivos', verificarAutenticacao, ativos.findAtivo);
//Rotas Placas Mãe
router.get('/placaMae', verificarAutenticacao, placaMae.index);
router.get('/placaMae/cadastro', verificarAutenticacao, placaMae.indexCadastro);
router.post('/placaMae/cadastro', verificarAutenticacao, placaMae.add);
router.get('/placaMae/editar/:id', verificarAutenticacao, placaMae.show);
router.put('/placaMae/editar/:id', verificarAutenticacao, placaMae.update);
router.delete('/placaMae/deletar/:id', verificarAutenticacao, placaMae.deletar);
router.get('/placaMae/find', verificarAutenticacao, placaMae.find);
router.get('/placaMae/getDados', verificarAutenticacao, placaMae.getDados);
//Rotas Processador
router.get('/processador', verificarAutenticacao, processador.index);
router.get(
  '/processador/cadastro',
  verificarAutenticacao,
  processador.indexCadastro
);
router.post('/processador/cadastro', verificarAutenticacao, processador.add);
router.get('/processador/editar/:id', verificarAutenticacao, processador.show);
router.put(
  '/processador/editar/:id',
  verificarAutenticacao,
  processador.update
);
router.delete(
  '/processador/deletar/:id',
  verificarAutenticacao,
  processador.deletar
);
router.get('/processador/find', verificarAutenticacao, processador.find);
router.get(
  '/processador/getDados',
  verificarAutenticacao,
  processador.getDados
);
//Rotas Hardware Armazenamento
router.get('/memoriaRam', verificarAutenticacao, memoria.index);
router.get(
  '/memoriaRam/cadastro',
  verificarAutenticacao,
  memoria.indexCadastro
);
router.post('/memoriaRam/cadastro', verificarAutenticacao, memoria.add);
router.get('/memoriaRam/editar/:id', verificarAutenticacao, memoria.show);
router.put('/memoriaRam/editar/:id', verificarAutenticacao, memoria.update);
router.delete(
  '/memoriaRam/deletar/:id',
  verificarAutenticacao,
  memoria.deletar
);
router.get('/memoriaRam/find', verificarAutenticacao, memoria.find);
router.get('/memoriaRam/getDados', verificarAutenticacao, memoria.getDados);
//Rotas Hardware Armazenamento
router.get('/armazenamento', verificarAutenticacao, armazenamento.index);
router.get('/armazenamento/find', verificarAutenticacao, armazenamento.find);
router.get(
  '/armazenamento/getDados',
  verificarAutenticacao,
  armazenamento.getDados
);
router.get(
  '/armazenamento/cadastro',
  verificarAutenticacao,
  armazenamento.indexCadastro
);
router.post(
  '/armazenamento/cadastro',
  verificarAutenticacao,
  armazenamento.add
);
router.get(
  '/armazenamento/editar/:id',
  verificarAutenticacao,
  armazenamento.show
);
router.put(
  '/armazenamento/editar/:id',
  verificarAutenticacao,
  armazenamento.update
);
router.delete(
  '/armazenamento/deletar/:id',
  verificarAutenticacao,
  armazenamento.deletar
);
//Rotas da tela Placa Video
router.get('/placaVideo', verificarAutenticacao, placas.index);
router.get('/placaVideo/cadastro', verificarAutenticacao, placas.indexCadastro);
router.post('/placaVideo/cadastro', verificarAutenticacao, placas.add);
router.get('/placaVideo/editar/:id', verificarAutenticacao, placas.show);
router.put('/placaVideo/editar/:id', verificarAutenticacao, placas.update);
router.delete('/placaVideo/deletar/:id', verificarAutenticacao, placas.deletar);
router.get('/placaVideo/find', verificarAutenticacao, placas.find);
router.get('/placaVideo/getDados', verificarAutenticacao, placas.getDados);
//Rotas da tela Fonte
router.get('/fonte', verificarAutenticacao, fonte.index);
router.get('/fonte/cadastro', verificarAutenticacao, fonte.indexCadastro);
router.post('/fonte/cadastro', verificarAutenticacao, fonte.add);
router.get('/fonte/editar/:id', verificarAutenticacao, fonte.show);
router.put('/fonte/editar/:id', verificarAutenticacao, fonte.update);
router.delete('/fonte/deletar/:id', verificarAutenticacao, fonte.deletar);
router.get('/fonte/find', verificarAutenticacao, fonte.find);
router.get('/fonte/getDados', verificarAutenticacao, fonte.getDados);
router.get('/gabinete', verificarAutenticacao, gabinete.index);
router.get('/gabinete/cadastro', verificarAutenticacao, gabinete.indexCadastro);
router.post('/gabinete/cadastro', verificarAutenticacao, gabinete.add);
router.get('/gabinete/editar/:id', verificarAutenticacao, gabinete.show);
router.put('/gabinete/editar/:id', verificarAutenticacao, gabinete.update);
router.delete('/gabinete/deletar/:id', verificarAutenticacao, gabinete.deletar);
//Rotas da tela cooler
router.get('/monitor', verificarAutenticacao, monitor.index);
router.get('/monitor/cadastro', verificarAutenticacao, monitor.indexCadastro);
router.post('/monitor/cadastro', verificarAutenticacao, monitor.add);
router.get('/monitor/editar/:id', verificarAutenticacao, monitor.show);
router.put('/monitor/editar/:id', verificarAutenticacao, monitor.update);
router.delete('/monitor/deletar/:id', verificarAutenticacao, monitor.deletar);
router.get('/monitor/find', verificarAutenticacao, monitor.find);
router.get('/monitor/getDados', verificarAutenticacao, monitor.getDados);
//Rotas da tela cooler
router.get('/cooler', verificarAutenticacao, cooler.index);
router.get('/cooler/cadastro', verificarAutenticacao, cooler.indexCadastro);
router.post('/cooler/cadastro', verificarAutenticacao, cooler.add);
router.get('/cooler/editar/:id', verificarAutenticacao, cooler.show);
router.put('/cooler/editar/:id', verificarAutenticacao, cooler.update);
router.delete('/cooler/deletar/:id', verificarAutenticacao, cooler.deletar);
router.get('/cooler/find', verificarAutenticacao, cooler.find);
router.get('/cooler/getDados', verificarAutenticacao, cooler.getDados);
//Rotas da tala Sistema Operacional
router.get('/so', verificarAutenticacao, so.index);
router.get('/so/cadastro', verificarAutenticacao, so.indexCadastro);
router.post('/so/cadastro', verificarAutenticacao, so.add);
router.put('/so/editar/:id', verificarAutenticacao, so.update);
router.delete('/so/deletar/:id', verificarAutenticacao, so.deletar);
router.get('/so/find', verificarAutenticacao, so.find);
router.get('/so/getDados', verificarAutenticacao, so.getDados);
//Rotas da Tela de local de Atendimento
router.get('/local', verificarAutenticacao, local.index);
router.get('/local/cadastro', verificarAutenticacao, local.indexCadastro);
router.get('/local/findLocal', verificarAutenticacao, local.findLocal);
router.get('/local/getDadosLocal', verificarAutenticacao, local.getDadosLocal);
router.post('/local/cadastro', verificarAutenticacao, local.add);
router.get('/local/editar/:id', verificarAutenticacao, local.show);
router.put('/local/editar/:id', verificarAutenticacao, local.update);
router.delete('/local/deletar/:id', verificarAutenticacao, local.deletar);
router.get('/hardware', verificarAutenticacao, hardware.index);
//Rotas da telas de Chamados
router.get('/chamados', verificarAutenticacao, chamados.index);
router.get('/chamados/cadastro', verificarAutenticacao, chamados.indexCadastro);
router.post('/chamados/cadastro', verificarAutenticacao, chamados.add);
router.get('/chamados/getChamados', verificarAutenticacao, chamados.getDados);
router.get('/chamados/find', verificarAutenticacao, chamados.find);
router.get(
  '/chamados/atender/:id',
  verificarAutenticacao,
  chamados.showChamado
);
router.get(
  '/chamados/setDados',
  verificarAutenticacao,
  chamados.setDadosChamado
);
router.post('/chamados/atenderChamado', verificarAutenticacao, chamados.update);
router.get('*', verificarAutenticacao, err404.index);
module.exports = router;
