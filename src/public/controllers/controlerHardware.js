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
    getDados(idTab.tabTable, idTab.routes);
    localStorage.setItem('latTabOpeb', `${idTab.tabId}`);
  });
}

// Função para verificar ultima aba aberta, para permanecer ela em aberta
function verificarUltimaAbaAberta() {
  let tabID = localStorage.getItem('latTabOpeb');
  $('#' + tabID).show();
  let idTab = tabelasPorTabs(tabID);
  getDados(idTab.tabTable, idTab.routes);
}

function habilitaBuscaDadosTabelas() {
  let timeout;
  $(
    '#buscaArmazenamento ,#buscaCooler,#buscaFonte,#buscaMemoria,#buscaMonitor,#buscaPlacaVideo,#buscaPlacaMae,#buscaProcessador,#buscaSo'
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
  const indiceRota = tab.routes;
  const buscaIndiceValorBusca = tab.buttonFind;
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
          montaTabelaComPaginacao(data, tab.tabId, indiceRota);
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
function montaTabelaComPaginacao(data, idtab, idtTabRoutes) {
  var currentPage = 1;
  var itemsPerPage = 6;
  $('#pagina-anterior').on('click', function () {
    if (currentPage > 1) {
      currentPage--;
      exibirDados(data, currentPage, itemsPerPage, idtab, idtTabRoutes);
    }
  });

  $('#pagina-proxima').on('click', function () {
    const maxPage = Math.ceil(data.length / itemsPerPage);
    if (currentPage < maxPage) {
      currentPage++;
      exibirDados(data, currentPage, itemsPerPage, idtab, idtTabRoutes);
    }
  });

  // Exibir dados iniciais
  exibirDados(data, currentPage, itemsPerPage, idtab, idtTabRoutes);
}

//Função Responsável por exibir os dados com paginação
function exibirDados(data, currentPage, itemsPerPage, idtab, idtTabRoutes) {
  var tabela = $(`#${idtab} tbody`);
  tabela.empty();
  if (data) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    for (var i = startIndex; i < endIndex && i < data.length; i++) {
      var row = $('<tr>');
      row.append($('<td>').text(data[i].nome));
      row.append(
        $(
          `<td><div class="d-inline-block"><form id="form-edita-${data[i]._id}" action="/${idtTabRoutes}/editar/${data[i]._id}?_method=GET" method="GET"><button class="btn btn-link me-2"><i class='bx bxs-edit' id='${data[i]._id}'><i
          class="uil uil-pen"></i></button></form>
          </div>
          `
        )
      );
      row.append(`<td><div class="d-inline-block"><form id="form-excluir-${data[i]._id}" action="/${idtTabRoutes}/deletar/${data[i]._id}?_method=DELETE" method="POST"><button type="button" class="btn btn-link btn-excluir" data-id=${data[i]._id}><i
      class="uil uil-trash"></i></button></form>
      </div>`);
      tabela.append(row);
      clickBotaoExcluir();
    }
  }
}

// Função Responsável pelos botões avançar e voltar da tabela
function paginaAnterior(paginaAtual) {
  return Math.max(0, --paginaAtual);
}

// Função Responsável pelos botões avançar e voltar da tabela
function paginaProxima(paginaAtual, registrosPorPagina, data) {
  if (paginaAtual < registrosPorPagina) {
    paginaAtual++;
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
// Retorna as informações das tabs de Hardware, rotas, id,nome dos botões de buscas e nome das tabelas
function tabelasPorTabs(tab) {
  var data = [
    {
      tabId: 'tab1',
      tabTable: 'tabelaArmazenamento',
      routes: 'armazenamento',
      buttonFind: '#buscaArmazenamento',
    },
    {
      tabId: 'tab2',
      tabTable: 'tabelaCooler',
      routes: 'cooler',
      buttonFind: '#buscaCooler',
    },
    {
      tabId: 'tab3',
      tabTable: 'tabelaFonte',
      routes: 'fonte',
      buttonFind: '#buscaFonte',
    },
    {
      tabId: 'tab4',
      tabTable: 'tabelaMemoria',
      routes: 'memoriaRam',
      buttonFind: '#buscaMemoria',
    },
    {
      tabId: 'tab5',
      tabTable: 'tabelaMonitor',
      routes: 'monitor',
      buttonFind: '#buscaMonitor',
    },
    {
      tabId: 'tab6',
      tabTable: 'tabelaPlacaVideo',
      routes: 'placaVideo',
      buttonFind: '#buscaPlacaVideo',
    },
    {
      tabId: 'tab7',
      tabTable: 'tabelaPlacaMae',
      routes: 'placaMae',
      buttonFind: '#buscaPlacaMae',
    },
    {
      tabId: 'tab8',
      tabTable: 'tabelaProcessador',
      routes: 'processador',
      buttonFind: '#buscaProcessador',
    },
    {
      tabId: 'tab9',
      tabTable: 'tabelaSo',
      routes: 'so',
      buttonFind: '#buscaSo',
    },
  ];
  var indice = data.find(function (objeto) {
    return objeto.tabId === tab;
  });
  return indice;
}
