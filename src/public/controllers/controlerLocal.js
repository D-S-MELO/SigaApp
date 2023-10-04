$(document).ready(function () {
  buscaLocalTabela();
  getDadosLocal();
});

//Responsável por retornar os dados de usuários
function getDadosLocal() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/local/getDadosLocal',
    dataType: 'json',
    success: function (data) {
      montaTabelaComPaginacao(data); // monta a tabela com os dados buscados
    },
    error: function (xhr, status, error) {
      mostraErro(
        'Ocorreu um erro ao buscar os dados dos usuários cadastrados!'
      );
    },
  });
}

//Função do campo de busca
function buscaLocalTabela() {
  const meuInput = $('#buscaLocal');
  let timeout;
  $('#buscaLocal').on('input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      $.ajax({
        url: `/local/findLocal`,
        data: {
          nome: meuInput.val(),
        },
        dataType: 'json',
        success: function (data) {
          montaTabelaComPaginacao(data); // monta a tabela com os dados buscados
        },
        error: function (xhr, status, error) {
          mostraErro(
            'Ocorreu um erro ao buscar os dados dos usuários cadastrados!'
          );
        },
      });
    }, 800); // Ajuste o tempo de debounce conforme necessário
  });
}

// Função dos botões de ações excluir
function clickBotaolocal() {
  $('.btn-excluir').on('click', function (event) {
    // Evita que o clique no botão cause a página a ser recarregada
    event.preventDefault();
    Swal.fire({
      title: 'Tem certeza?',
      text:
        'Você está prestes a excluir este usuário. Esta ação não pode ser desfeita.',
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
function montaTabelaComPaginacao(data) {
  var currentPage = 1;
  var itemsPerPage = 12;

  $('#pagina-anterior').on('click', function () {
    if (currentPage > 1) {
      currentPage--;
      exibirDados(data, currentPage, itemsPerPage);
    }
  });

  $('#pagina-proxima').on('click', function () {
    const maxPage = Math.ceil(data.length / itemsPerPage);
    if (currentPage < maxPage) {
      currentPage++;
      exibirDados(data, currentPage, itemsPerPage);
    }
  });

  exibirDados(data, currentPage, itemsPerPage);
}

//Função Responsável por exibir os dados com paginação
function exibirDados(data, currentPage, itemsPerPage) {
  const tabela = $('#tabela tbody');
  tabela.empty();

  if (data) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    for (var i = startIndex; i < endIndex && i < data.length; i++) {
      const row = $('<tr>');
      row.append($('<td>').text(data[i].nome));
      row.append(`<td><div class="d-inline-block"><form id="form-excluir-${data[i]._id}" action="/local/deletar/${data[i]._id}?_method=DELETE" method="POST"><button type="button" class="btn btn-link btn-excluir" data-id=${data[i]._id}><i
      class="uil uil-trash"></i></button></form>
      </div>`);

      tabela.append(row);
      clickBotaolocal();
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
