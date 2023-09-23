$(document).ready(function () {
  buscaUsuarioTabela();
  getDadosUsers();
});

//Responsável por retornar os dados de usuários
function getDadosUsers() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/usuario/getUsuarios',
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
function buscaUsuarioTabela() {
  const meuInput = $('#buscauser');
  let timeout;
  $('#buscauser').on('input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      $.ajax({
        url: `/usuario/findUsuarios`,
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
function clickBotaoUsuarios() {
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
  var registrosPorPagina = 10;
  var paginaAtual = 1;

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

    console.log(data.length <= registrosPorPagina);
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
  console.log(total);
  exibirDados(
    data,
    0,
    registrosPorPagina < data.length ? registrosPorPagina : 10
  );
}

//Função Responsável por exibir os dados com paginação
function exibirDados(data, startIndex, endIndex) {
  var tabela = $('#tabela tbody');
  tabela.empty();

  if (data) {
    for (var i = startIndex; i < endIndex; i++) {
      var row = $('<tr>');
      row.append($('<td>').text(data[i].nome));
      row.append($('<td>').text(data[i].email));
      row.append(
        $(
          `<td><div class="d-inline-block"><form id="form-edita-${data[i]._id}" action="/usuario/editar/${data[i]._id}?_method=GET" method="GET"><button class="btn btn-link me-2"><i class='bx bxs-edit' id='${data[i]._id}'><i
          class="uil uil-pen"></i></button></form>
          </div>
          `
        )
      );
      row.append(`<td><div class="d-inline-block"><form id="form-excluir-${data[i]._id}" action="/usuario/deletar/${data[i]._id}?_method=DELETE" method="POST"><button type="button" class="btn btn-link btn-excluir" data-id=${data[i]._id}><i
      class="uil uil-trash"></i></button></form>
      </div>`);

      tabela.append(row);
      clickBotaoUsuarios();
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
