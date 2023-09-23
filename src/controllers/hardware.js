const { MASTER_DIR } = require('../helpers/constants');
const armazenamento = require('../model/Armazenamento');
const cooler = require('../model/Cooler');
const fonte = require('../model/Fonte');
const memoria = require('../model/Memoria');
const placa = require('../model/placaMae');
const monitor = require('../model/Monitor');
const placaVideo = require('../model/PlacaVideo');
const processador = require('../model/Processador');
const So = require('../model/So');

const index = async function (request, response, next) {
  const jsFiles = ['layout.js', 'controlerHardware.js', 'controllerSo.js'];
  const armazenamentos = await armazenamento.find({});
  const memorias = await memoria.find({});
  const coolers = await cooler.find({});
  const fontes = await fonte.find({});
  const placaMae = await placa.find({});
  const monitores = await monitor.find({});
  const placas = await placaVideo.find({});
  const so = await So.find({});
  const processadores = await processador.find({});
  return response.render('hardware', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
    armazenamentos,
    coolers,
    fontes,
    memorias,
    monitores,
    placaMae,
    placas,
    processadores,
    so,
  });
};
module.exports = {
  index,
};
