const { MASTER_DIR } = require('../helpers/constants');
const Ativo = require('../model/Ativos');
const Local = require('../model/Local');
const So = require('../model/So');
const PlacaMae = require('../model/placaMae');
const processador = require('../model/Processador');
const memorias = require('../model/Memoria');
const armazenamento = require('../model/Armazenamento');
const fonte = require('../model/Fonte');
const placaVideos = require('../model/PlacaVideo');
const monitor = require('../model/Monitor');
const gabinete = require('../model/Gabinete');
const cooler = require('../model/Cooler');
const Ativos = require('../model/Ativos');

const indexAtivos = function (request, response, next) {
  const jsFiles = ['layout.js', 'controllerAtivos.js'];
  return response.render('cadastroAtivos', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
  });
};
const show = async function (request, response, next) {
  const jsFiles = ['layout.js', 'controllerAtivos.js'];
  try {
    const ativos = await Ativo.find({});
    return response.render('ativos', {
      layout: MASTER_DIR,
      jsFiles: { files: jsFiles },
      ativos,
    });
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao recuperar os Equipamentos');
  }
};
const getDadosAtivos = async function (request, response, next) {
  try {
    const ativos = await Ativo.find();
    const responseData = { ativos };
    const jsonContent = JSON.stringify(responseData);
    return response.end(jsonContent);
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao recuperar os Equipamentos');
  }
};

const getDadosGraficos = async function (request, response, next) {
  try {
    const ativos = await Ativo.aggregate([
      {
        $group: {
          _id: '$local', // Agrupa por local
          count: { $sum: 1 }, // Conta a quantidade de documentos em cada grupo
        },
      },
    ]);
    const responseData = { ativos };
    const jsonContent = JSON.stringify(responseData);
    return response.end(jsonContent);
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao recuperar os Equipamentos');
  }
};

const local = async function (request, response, next) {
  try {
    const locais = await Local.find({});
    if (locais) {
      response.json({ locais });
    }
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao requisitar os locais');
  }
};

const so = async function (request, response, next) {
  try {
    const so = await So.find({});
    if (so) {
      response.json({ so });
    }
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao requisitar os locais');
  }
};

const placa = async function (request, response, next) {
  try {
    const placaMae = await PlacaMae.find({});
    if (placaMae) {
      response.json({ placaMae });
    }
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao requisitar as placas mães');
  }
};

const processadores = async function (request, response, next) {
  try {
    const cpu = await processador.find({});
    if (cpu) {
      response.json({ cpu });
    }
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao requisitar os processadores');
  }
};

const memoria = async function (request, response, next) {
  try {
    const memori = await memorias.find({});
    if (memori) {
      response.json({ memori });
    }
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao requisitar as memórias');
  }
};
const armazenamentos = async function (request, response, next) {
  try {
    const ssdHDD = await armazenamento.find({});
    if (ssdHDD) {
      response.json({ ssdHDD });
    }
  } catch (err) {
    request.flash(
      'erro_mgs',
      'Ocorreu um erro ao requisitar os Armazenamentos'
    );
  }
};
const fontes = async function (request, response, next) {
  try {
    const fontes = await fonte.find({});
    if (fontes) {
      response.json({ fontes });
    }
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao requisitar as fontes');
  }
};
const placaVideo = async function (request, response, next) {
  try {
    const Placas = await placaVideos.find({});
    if (Placas) {
      response.json({ Placas });
    }
  } catch (err) {
    request.flash(
      'erro_mgs',
      'Ocorreu um erro ao requisitar as placas de vídeos'
    );
  }
};
const monitors = async function (request, response, next) {
  try {
    const monitores = await monitor.find({});
    if (monitores) {
      response.json({ monitores });
    }
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao requisitar os monitores');
  }
};
const coolers = async function (request, response, next) {
  try {
    const coler = await cooler.find({});
    if (coler) {
      response.json({ coler });
    }
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao requisitar os coolers');
  }
};
const gabinetes = async function (request, response, next) {
  try {
    const gabinet = await gabinete.find({});
    if (gabinet) {
      response.json({ gabinet });
    }
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao requisitar os monitores');
  }
};
const add = async function (request, response, next) {
  const dados = request.body;
  const fabricante = dados[0];
  const local = dados[1];
  const situacao = dados[2];
  const dataInstalacao = dados[3];
  const componentes = dados[4];
  try {
    const novoAtivo = new Ativo({
      fabricante,
      local,
      situacao,
      dataInstalacao,
      hardware: [
        {
          componentes,
        },
      ],
    });
    await novoAtivo.save();
    request.flash('success_mgs', 'Ativo Cadastrado com Sucesso!');
    response.redirect('/ativos');
  } catch (error) {
    console.log(error);
    response.json({ error: false, error });
  }
};

const deletar = async function (request, response, next) {
  try {
    await Ativo.findByIdAndDelete(request.params.id);
    request.flash('success_mgs', 'Equipamento Excluído com Sucesso!');
    response.redirect('/ativos');
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao excluir o equipamento!');
  }
};
const update = async function (request, response, next) {
  const dados = request.body;
  const fabricante = dados[0];
  const local = dados[1];
  const situacao = dados[2];
  const dataInstalacao = dados[3];
  const componentes = dados[4];
  try {
    const ativo = {
      fabricante,
      local,
      situacao,
      dataInstalacao,
      hardware: [
        {
          componentes,
        },
      ],
    };
    await Ativo.findByIdAndUpdate(request.params.id, ativo);
    request.flash('success_mgs', 'Ativo Atualizado com Sucesso!');
    response.json({});
  } catch (error) {
    console.log(error);
    response.json({ error: false, error });
  }
};
const showEquipamento = async function (request, response, next) {
  const jsFiles = ['layout.js', 'controllerAtivos.js'];
  try {
    const ativo = await Ativo.findById(request.params.id);
    return response.render('editarAtivos', {
      layout: MASTER_DIR,
      ativo,
      jsFiles: { files: jsFiles },
    });
  } catch (err) {
    request.flash('erro_mgs', 'Ocorreu um erro ao recuperar o usuário');
  }
};
module.exports = {
  add,
  indexAtivos,
  local,
  so,
  placa,
  processadores,
  memoria,
  armazenamentos,
  fontes,
  placaVideo,
  monitors,
  gabinetes,
  coolers,
  show,
  deletar,
  showEquipamento,
  update,
  getDadosAtivos,
  getDadosGraficos,
};
