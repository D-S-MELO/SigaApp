$(document).ready(function () {
  habilitaBuscaDadosTabelas();
  habilitaAbas();
  verificarUltimaAbaAberta();
});

// Função para habilitar as abas
function habilitaAbas() {
  // Adiciona um evento de clique a cada aba
  $('.tab-item').on('click', function () {
    const tabId = $(this).data('tab');
    $('.tab-content').hide(); // Oculta todos os conteúdos das abas
    $('#' + tabId).show(); // Mostra o conteúdo da aba clicada
    let idTab = tabelasPorTabs(tabId);
    let indiceRota = retornaIndiceRota(idTab);
    carregaDados(idTab, indiceRota);
    localStorage.setItem('latTabOpeb', `${tabId}`);
  });
}

// Função para verificar ultima aba aberta, para permanecer ela em aberta
function verificarUltimaAbaAberta() {
  let tabID = localStorage.getItem('latTabOpeb');
  $('#' + tabID).show();
}

function habilitaBuscaDadosTabelas() {
  let timeout;
  $(
    '#buscaArmazenamento ,#buscaCooler,#buscaFonte,#buscaMemoria,#buscaMonitor,#buscaPlaca,#buscaPlaca,#buscaProcessador,#buscaLocal'
  ).on('input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      buscaDadosTabela();
    }, 800);
  });
}

//Responsável por retornar os dados de hardware Armazenamento
function getDados(idtab, indiceRota) {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: `/${indiceRota}/getDados`,
    dataType: 'json',
    success: function (data) {
      montaTabelaComPaginacao(data, idtab, indiceRota); // monta a tabela com os dados buscados
    },
    error: function (xhr, status, error) {
      mostraErro('Ocorreu um erro ao buscar os dados cadastrados!');
    },
  });
}

//Função do campo de busca
function buscaDadosTabela() {
  const tabID = localStorage.getItem('latTabOpeb');
  const tab = tabelasPorTabs(tabID);
  const indiceRota = retornaIndiceRota(tab);
  const buscaIndiceValorBusca = retornaIndiceValorBusca(tab);
  const meuInput = $(`${buscaIndiceValorBusca}`);

  let timeout;
  $(`${buscaIndiceValorBusca}`).on('input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      $.ajax({
        url: `/${indiceRota}/find`,
        data: {
          nome: meuInput.val(),
        },
        dataType: 'json',
        success: function (data) {
          montaTabelaComPaginacao(data, tab);
        },
        error: function (xhr, status, error) {
          mostraErro('Ocorreu um erro ao buscar os dados cadastrados!');
        },
      });
    }, 800);
  });
}

// Função dos botões de ações excluir
function clickBotaoExcluir() {
  $('.btn-excluir').on('click', function (event) {
    // Evita que o clique no botão cause a página a ser recarregada
    event.preventDefault();
    Swal.fire({
      title: 'Tem certeza?',
      text:
        'Você está prestes a excluir esta informação. Esta ação não pode ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6c757d',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      width: '22em',
    }).then((result) => {
      if (result.isConfirmed) {
        const id = $(this).data('id');
        $('#form-excluir-' + id).submit();
      }
    });
  });
}

// Função responsável por montar a tabela com paginação
function montaTabelaComPaginacao(data, idtab) {
  var registrosPorPagina = 10;
  var paginaAtual = 1;
  console.log('Aqui', idtab);
  $('#pagina-anterior').click(function () {
    paginaAtual = paginaAnterior(paginaAtual);
    exibirDados(
      data,
      (paginaAtual - 1) * registrosPorPagina,
      paginaAtual * registrosPorPagina
    );
  });

  $('#pagina-proxima').click(function () {
    paginaAtual = paginaProxima(
      paginaAtual,
      paginaAtual * registrosPorPagina,
      data
    );

    exibirDados(
      data,
      data.length - registrosPorPagina,
      data.length <= registrosPorPagina
        ? data.length
        : data.length / paginaAtual
    );
  });
  // Exibir dados iniciais
  var total = registrosPorPagina < data.length;
  exibirDados(
    data,
    0,
    registrosPorPagina < data.length ? registrosPorPagina : 10,
    idtab
  );
}

//Função Responsável por exibir os dados com paginação
function exibirDados(data, startIndex, endIndex, idtab) {
  var tabela = $(`#${idtab} tbody`);
  tabela.empty();
  var prefixRota = retornaIndiceRota(idtab);
  if (data) {
    for (var i = startIndex; i < endIndex; i++) {
      var row = $('<tr>');
      row.append($('<td>').text(data[i].nome));
      row.append(
        $(
          `<td><div class="d-inline-block"><form id="form-edita-${data[i]._id}" action="/${prefixRota}/editar/${data[i]._id}?_method=GET" method="GET"><button class="btn btn-link me-2"><i class='bx bxs-edit' id='${data[i]._id}'><i
          class="uil uil-pen"></i></button></form>
          </div>
          `
        )
      );
      row.append(`<td><div class="d-inline-block"><form id="form-excluir-${data[i]._id}" action="/${prefixRota}/deletar/${data[i]._id}?_method=DELETE" method="POST"><button type="button" class="btn btn-link btn-excluir" data-id=${data[i]._id}><i
      class="uil uil-trash"></i></button></form>
      </div>`);

      tabela.append(row);
      clickBotaoExcluir();
    }
  }
}

// Função Responsável pelos botões avançar e voltar da tabela
function paginaAnterior(paginaAtual) {
  if (paginaAtual > 1) {
    paginaAtual--;
    return paginaAtual;
  }
  return paginaAtual;
}

// Função Responsável pelos botões avançar e voltar da tabela
function paginaProxima(paginaAtual, endIndex, data) {
  if (endIndex < data.length) {
    paginaAtual++;
    return paginaAtual;
  }
  return paginaAtual;
}

// Função Responsável por exibir erros quando não retornar os dados necessários
function mostraErro(mensagem) {
  Swal.fire({
    title: 'Erro',
    text: `${mensagem}`,
    icon: 'warning',
    confirmButtonColor: '#6c757d',
    confirmButtonText: 'Ok',
    width: '22em',
  });
}

function tabelasPorTabs(tab) {
  var data = [
    { tabId: 'tab1', tabTable: 'tabelaArmazenamento' },
    { tabId: 'tab2', tabTable: 'tabelaCooler' },
    { tabId: 'tab3', tabTable: 'tabelaFonte' },
    { tabId: 'tab4', tabTable: 'tabelaMemoria' },
  ];
  var indice = data.find(function (objeto) {
    return objeto.tabId === tab;
  });
  return indice.tabTable;
}

function retornaIndiceRota(id) {
  switch (id) {
    case 'tabelaArmazenamento':
      return 'armazenamento';
      break;
    case 'tabelaCooler':
      return 'cooler';
      break;
    case 'tabelaFonte':
      return 'fonte';
      break;
    case 'tabelaMemoria':
      return 'memoriaRam';
      break;
    default:
      break;
  }
}
function retornaIndiceValorBusca(id) {
  switch (id) {
    case 'tabelaArmazenamento':
      return '#buscaArmazenamento';
      break;
    case 'tabelaCooler':
      return '#buscaCooler';
      break;
    case 'tabelaFonte':
      return '#buscaFonte';
      break;
    case 'tabelaMemoria':
      return '#buscaMemoria';
      break;
    default:
      break;
  }
}

function carregaDados(idtab, indiceRota) {
  switch (idtab) {
    case 'tabelaArmazenamento':
      getDados(idtab, indiceRota);
      break;
    case 'tabelaCooler':
      getDados(idtab, indiceRota);
      break;
    case 'tabelaFonte':
      getDados(idtab, indiceRota);
      break;
    case 'tabelaMemoria':
      getDados(idtab, indiceRota);
      break;
    default:
      break;
  }
}
