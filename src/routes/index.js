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
//Rota Principal
router.get('/', Home.index);
//Rota da tela de Usuários
router.get('/usuario/cadastro', user.indexCardUser);
router.get('/usuario', user.indexUser);
router.get('/usuario', user.dataUser);
router.get('/usuario/getUsuarios', user.getDadosUser);
router.get('/usuario/findUsuarios', user.findUser);
router.get('/usuario/editar/:id', user.show);
router.delete('/usuario/deletar/:id', user.deletar);
router.put('/usuario/editar/:id', user.update);
router.post('/usuario/cadastro', user.add);
//Rotas da Tela de Ativos
router.get('/ativosAdd', ativos.indexAtivos);
router.get('/ativosAdd/local', ativos.local);
router.get('/ativosAdd/so', ativos.so);
router.get('/ativosAdd/placaMae', ativos.placa);
router.get('/ativosAdd/processador', ativos.processadores);
router.get('/ativosAdd/memoria', ativos.memoria);
router.get('/ativosAdd/armazenamento', ativos.armazenamentos);
router.get('/ativosAdd/fonte', ativos.fontes);
router.get('/ativosAdd/placaVideo', ativos.placaVideo);
router.get('/ativosAdd/monitor', ativos.monitors);
router.get('/ativosAdd/gabinete', ativos.gabinetes);
router.get('/ativosAdd/cooler', ativos.coolers);
router.post('/ativos/cadastro', ativos.add);
router.get('/ativos', ativos.show);
router.get('/ativos/getDadosAtivos', ativos.getDadosAtivos);
router.get('/ativos/getDadosGraficos', ativos.getDadosGraficos);
router.delete('/ativos/deletar/:id', ativos.deletar);
router.get('/ativos/editar/:id', ativos.showEquipamento);
router.put('/ativos/editar/:id', ativos.update);
router.get('/ativos/findAtivos', ativos.findAtivo);
//Rotas Placas Mãe
router.get('/placaMae', placaMae.index);
router.get('/placaMae/cadastro', placaMae.indexCadastro);
router.post('/placaMae/cadastro', placaMae.add);
router.get('/placaMae/editar/:id', placaMae.show);
router.put('/placaMae/editar/:id', placaMae.update);
router.delete('/placaMae/deletar/:id', placaMae.deletar);
router.get('/placaMae/find', placaMae.find);
router.get('/placaMae/getDados', placaMae.getDados);
//Rotas Processador
router.get('/processador', processador.index);
router.get('/processador/cadastro', processador.indexCadastro);
router.post('/processador/cadastro', processador.add);
router.get('/processador/editar/:id', processador.show);
router.put('/processador/editar/:id', processador.update);
router.delete('/processador/deletar/:id', processador.deletar);
router.get('/processador/find', processador.find);
router.get('/processador/getDados', processador.getDados);
//Rotas Hardware Armazenamento
router.get('/memoriaRam', memoria.index);
router.get('/memoriaRam/cadastro', memoria.indexCadastro);
router.post('/memoriaRam/cadastro', memoria.add);
router.get('/memoriaRam/editar/:id', memoria.show);
router.put('/memoriaRam/editar/:id', memoria.update);
router.delete('/memoriaRam/deletar/:id', memoria.deletar);
router.get('/memoriaRam/find', memoria.find);
router.get('/memoriaRam/getDados', memoria.getDados);
//Rotas Hardware Armazenamento
router.get('/armazenamento', armazenamento.index);
router.get('/armazenamento/find', armazenamento.find);
router.get('/armazenamento/getDados', armazenamento.getDados);
router.get('/armazenamento/cadastro', armazenamento.indexCadastro);
router.post('/armazenamento/cadastro', armazenamento.add);
router.get('/armazenamento/editar/:id', armazenamento.show);
router.put('/armazenamento/editar/:id', armazenamento.update);
router.delete('/armazenamento/deletar/:id', armazenamento.deletar);
//Rotas da tela Placa Video
router.get('/placaVideo', placas.index);
router.get('/placaVideo/cadastro', placas.indexCadastro);
router.post('/placaVideo/cadastro', placas.add);
router.get('/placaVideo/editar/:id', placas.show);
router.put('/placaVideo/editar/:id', placas.update);
router.delete('/placaVideo/deletar/:id', placas.deletar);
router.get('/placaVideo/find', placas.find);
router.get('/placaVideo/getDados', placas.getDados);
//Rotas da tela Fonte
router.get('/fonte', fonte.index);
router.get('/fonte/cadastro', fonte.indexCadastro);
router.post('/fonte/cadastro', fonte.add);
router.get('/fonte/editar/:id', fonte.show);
router.put('/fonte/editar/:id', fonte.update);
router.delete('/fonte/deletar/:id', fonte.deletar);
router.get('/fonte/find', fonte.find);
router.get('/fonte/getDados', fonte.getDados);
router.get('/gabinete', gabinete.index);
router.get('/gabinete/cadastro', gabinete.indexCadastro);
router.post('/gabinete/cadastro', gabinete.add);
router.get('/gabinete/editar/:id', gabinete.show);
router.put('/gabinete/editar/:id', gabinete.update);
router.delete('/gabinete/deletar/:id', gabinete.deletar);
//Rotas da tela cooler
router.get('/monitor', monitor.index);
router.get('/monitor/cadastro', monitor.indexCadastro);
router.post('/monitor/cadastro', monitor.add);
router.get('/monitor/editar/:id', monitor.show);
router.put('/monitor/editar/:id', monitor.update);
router.delete('/monitor/deletar/:id', monitor.deletar);
router.get('/monitor/find', monitor.find);
router.get('/monitor/getDados', monitor.getDados);
//Rotas da tela cooler
router.get('/cooler', cooler.index);
router.get('/cooler/cadastro', cooler.indexCadastro);
router.post('/cooler/cadastro', cooler.add);
router.get('/cooler/editar/:id', cooler.show);
router.put('/cooler/editar/:id', cooler.update);
router.delete('/cooler/deletar/:id', cooler.deletar);
router.get('/cooler/find', cooler.find);
router.get('/cooler/getDados', cooler.getDados);
//Rotas da tala Sistema Operacional
router.get('/so', so.index);
router.get('/so/cadastro', so.indexCadastro);
router.post('/so/cadastro', so.add);
router.put('/so/editar/:id', so.update);
router.delete('/so/deletar/:id', so.deletar);
router.get('/so/find', so.find);
router.get('/so/getDados', so.getDados);
//Rotas da Tela de local de Atendimento
router.get('/local', local.index);
router.get('/local/cadastro', local.indexCadastro);
router.get('/local/findLocal', local.findLocal);
router.get('/local/getDadosLocal', local.getDadosLocal);
router.post('/local/cadastro', local.add);
router.get('/local/editar/:id', local.show);
router.put('/local/editar/:id', local.update);
router.delete('/local/deletar/:id', local.deletar);
router.get('/hardware', hardware.index);
//Rotas da telas de Chamados
router.get('/chamados', chamados.index);
router.get('/chamados/cadastro', chamados.indexCadastro);
router.post('/chamados/cadastro', chamados.add);
router.get('*', err404.index);

module.exports = router;
