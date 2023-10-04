$(document).ready(function () {
  getDadosChamados();
  getDadosCampoLocal();
  getDadosCampoEquipamento();
  cadastraNovoChamado();
  buscaChamadoTabela();
  setaDadosEditar();
  atenderChamado();
});

function getDadosCampoLocal() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/ativosAdd/local',
    dataType: 'json',
    success: function (data) {
      const selectElement = document.getElementById('local');
      if (selectElement !== null) {
        while (selectElement.firstChild) {
          selectElement.removeChild(selectElement.lastChild);
        }
        if (Object.keys(data).length !== 0) {
          const defaultOption = document.createElement('option');
          defaultOption.textContent = '';
          defaultOption.value = ''; // Valor vazio para o campo default
          selectElement.appendChild(defaultOption);

          data.locais.forEach((local) => {
            const nome = local.nome;
            const optionElement = document.createElement(`option`);
            optionElement.textContent = nome;
            optionElement.id = local._id;
            selectElement.appendChild(optionElement);
          });
        } else {
          const optionElement = document.createElement('option');
          optionElement.textContent = 'Não Há Dados ';
          selectElement.appendChild(optionElement);
        }
      }
    },
    error: function (xhr, status, error) {
      mostraMensagem('Atenção!', error.responseText, 'error');
    },
  });
}

function getDadosCampoEquipamento() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/ativos/getDadosAtivos',
    dataType: 'json',
    success: function (data) {
      const selectElement = document.getElementById('id');
      if (selectElement !== null) {
        while (selectElement.firstChild) {
          selectElement.removeChild(selectElement.lastChild);
        }
        if (Object.keys(data).length !== 0) {
          const defaultOption = document.createElement('option');
          defaultOption.textContent = '';
          defaultOption.value = ''; // Valor vazio para o campo default
          selectElement.appendChild(defaultOption);

          data.ativos.forEach((local) => {
            const id = local._id;
            const optionElement = document.createElement(`option`);
            optionElement.textContent = id;
            optionElement.id = local._id;
            selectElement.appendChild(optionElement);
          });
        } else {
          const optionElement = document.createElement('option');
          optionElement.textContent = 'Não Há Dados ';
          selectElement.appendChild(optionElement);
        }
      }
    },
    error: function (xhr, status, error) {
      mostraMensagem('Atenção!', error.responseText, 'error');
    },
  });
}

//Responsável por retornar os dados de Chamados
function getDadosChamados() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/chamados/getChamados',
    dataType: 'json',
    success: function (data) {
      montaTabelaComPaginacao(data); // monta a tabela com os dados buscados
    },
    error: function (xhr, status, error) {
      mostraMensagem('Atenção!', error.responseText, 'error');
    },
  });
}

function cadastraNovoChamado() {
  $(document).on('click', `.add`, function (event) {
    const equipamento = $('#id').val();
    const local = $('#local').find('option:selected').attr('id');
    const descricao = $('#descricao').val();
    const descricao_detalhada = $('#descricao_detalhada').val();
    const dados = [];
    dados.push(equipamento, local, descricao, descricao_detalhada);
    $.ajax({
      type: 'POST',
      url: '/chamados/cadastro',
      data: JSON.stringify(dados),
      contentType: 'application/json',
      success: function (resposta) {
        Swal.fire({
          title: 'Chamado Cadastrado com Sucesso!',
          confirmButtonText: 'Ok',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            window.location.href = '/chamados';
          }
        });
      },
      error: function (erro) {
        mostraMensagem('Atenção!', erro.responseText, 'error');
      },
    });
  });
}

//Função do campo de busca
function buscaChamadoTabela() {
  const meuInput = $('#buscaChamado');
  let timeout;
  $('#buscaChamado').on('input', function () {
    meuInput.val() ? desabilitarPaginacao(true) : desabilitarPaginacao(false);
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      $.ajax({
        url: `/chamados/find`,
        data: {
          descricao: meuInput.val(),
        },
        dataType: 'json',
        success: function (data) {
          montaTabelaComPaginacao(data);
        },
        error: function (xhr, status, error) {
          mostraErro('Ocorreu um erro ao buscar os dados cadastrados!');
        },
      });
    }, 800);
  });
}

// Função responsável por montar a tabela com paginação
function montaTabelaComPaginacao(data) {
  var currentPage = 1;
  var itemsPerPage = 2;

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

// Função Responsável por exibir os dados com paginação
function exibirDados(data, currentPage, itemsPerPage) {
  const tabela = $('#tabelaChamados tbody');
  tabela.empty();

  if (data) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    for (var i = startIndex; i < endIndex && i < data.length; i++) {
      const dataOriginal = new Date(data[i].createdAt);
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      const row = $('<tr>');
      row.append(
        $('<td>').text(dataOriginal.toLocaleDateString('pt-BR', options))
      );
      row.append($('<td>').text(data[i]._id));
      row.append($('<td>').text(data[i].descricao));
      row.append($('<td>').text(data[i].local[0].nome));
      row.append(
        $(
          `<td><div class="d-inline-block"><form id="form-edita-${data[i]._id}" action="/chamados/atender/${data[i]._id}?_method=GET" method="GET"><button class="btn btn-link me-2"><i class="uil uil-file-check id='${data[i]._id}'><i
          class="uil uil-pen"></i></button></form>
          </div>
          `
        )
      );
      row.append(`<td hidden><div class="d-inline-block"><form id="form-excluir-${data[i]._id}" action="/chamados/deletar/${data[i]._id}?_method=DELETE" method="POST"><button type="button" class="btn btn-link btn-excluir" data-id=${data[i]._id}><i
      class="uil uil-trash"></i></button></form>
      </div>`);

      tabela.append(row);
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

// Função Para desabilitar botã de paginação na busca
function desabilitarPaginacao(desabilitar) {
  $('#pagina-anterior, #pagina-proxima').prop('disabled', desabilitar);
}

// Função Responsável por exibir erros quando não retornar os dados necessários
function mostraMensagem(Titulo, mensagem, icone) {
  Swal.fire({
    title: `${Titulo}`,
    text: `${mensagem}`,
    icon: `${icone}`,
    confirmButtonColor: '#6c757d',
    confirmButtonText: 'Ok',
    width: '22em',
  });
}

function setaDadosEditar(params) {
  const rotaAtual = window.location.pathname.slice(0, 18);
  if (rotaAtual === '/chamados/atender/') {
    $.ajax({
      url: '/chamados/setDados',
      data: {
        id: window.location.pathname.slice(18),
      },
      dataType: 'json',
      success: function (data) {
        data.forEach((dados) => {
          $('#descricao').val(dados.descricao);
          $('#local').val(dados.local[0].nome);
          $('#equipamento').val(dados.equipamento[0]);
          $('#descricao_detalhada').val(dados.descricao_detalhada);
          $('#status').val(dados.status);
          $('#descricao_atendimento').val(dados.descricao_atendimento);
        });
      },
      error: function (xhr, status, error) {
        mostraMensagem('Atenção!', error.responseText, 'error');
      },
    });
  }
}

function atenderChamado() {
  $(document).on('click', `.update`, function (event) {
    const status = $('#status').val();
    const descricao_atendimento = $('#descricao_atendimento').val();
    const idEquipamento = window.location.pathname.slice(18);
    const dados = [];
    dados.push(idEquipamento, status, descricao_atendimento);
    if ((status, descricao_atendimento)) {
      $.ajax({
        type: 'POST',
        url: '/chamados/atenderChamado',
        data: JSON.stringify(dados),
        contentType: 'application/json',
        success: function (resposta) {
          Swal.fire({
            title: 'Atendimento atualizado com sucesso!',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/chamados';
            }
          });
        },
        error: function (erro) {
          mostraMensagem('Atenção!', erro.responseText, 'error');
        },
      });
    } else {
      mostraMensagem(
        'Atenção!',
        'Preencha os componentes do equipamento',
        'warning'
      );
    }
  });
}
