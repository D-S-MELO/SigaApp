$(document).ready(function () {
  getDadosCampoLocal();
  buscaAtivoTabela();
  editaExcluiUsuarios();
  getDadosCampoSo();
  getDadosCampoPlacaMae();
  getDadosCampoProcessadores();
  getDadosCampoMemorias();
  getDadosCampoArmazenamento();
  getDadosCampoFonte();
  getDadosCampoPlacaVideo();
  getDadosCampoMonitores();
  getDadosCampoGabinete();
  getDadosCampoCooler();
  selectOnChange();
  montaTabela();
  cadastraNovoAtivo();
  editaAtivo();
  getDadosAtivos();
});

//Responsável por retornar os dados de usuários
function getDadosAtivos() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/ativos/getDadosAtivos',
    dataType: 'json',
    success: function (data) {
      montaTabelaComPaginacao(data.ativos); // monta a tabela com os dados buscados
    },
    error: function (xhr, status, error) {
      mostraMensagem('Atenção!', error.responseText, 'error');
    },
  });
}

//Função responsável por retornar os dados do campo select de local
function getDadosCampoLocal() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/ativosAdd/local',
    dataType: 'json',
    success: function (data) {
      const selectElement = document.getElementById('local_instalacao');
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
          setaDadosAtivosEditar();
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

//Função responsável por retornar os dados do campo select de Sistemas Operacional
function getDadosCampoSo() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/ativosAdd/so',
    dataType: 'json',
    success: function (data) {
      const selectElement = document.getElementById('so');
      if (selectElement !== null) {
        while (selectElement.firstChild) {
          selectElement.removeChild(selectElement.lastChild);
        }
        if (Object.keys(data).length !== 0) {
          const defaultOption = document.createElement('option');
          defaultOption.textContent = '';
          defaultOption.value = ''; // Valor vazio para o campo default
          selectElement.appendChild(defaultOption);

          data.so.forEach((local) => {
            const nome = local.nome;
            const optionElement = document.createElement('option');
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

//Função responsável por retornar os dados do campo select de Placa Mãe
function getDadosCampoPlacaMae() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/ativosAdd/placaMae',
    dataType: 'json',
    success: function (data) {
      const selectElement = document.getElementById('placa_mae');
      if (selectElement !== null) {
        while (selectElement.firstChild) {
          selectElement.removeChild(selectElement.lastChild);
        }
        if (Object.keys(data).length !== 0) {
          const defaultOption = document.createElement('option');
          defaultOption.textContent = '';
          defaultOption.value = ''; // Valor vazio para o campo default
          selectElement.appendChild(defaultOption);

          data.placaMae.forEach((local) => {
            const nome = local.nome;
            const optionElement = document.createElement('option');
            optionElement.id = local._id;
            optionElement.textContent = nome;
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

//Função responsável por retornar os dados do campo select de Processadores
function getDadosCampoProcessadores() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/ativosAdd/processador',
    dataType: 'json',
    success: function (data) {
      const selectElement = document.getElementById('processador');
      if (selectElement !== null) {
        while (selectElement.firstChild) {
          selectElement.removeChild(selectElement.lastChild);
        }
        if (Object.keys(data).length !== 0) {
          const defaultOption = document.createElement('option');
          defaultOption.textContent = '';
          defaultOption.value = ''; // Valor vazio para o campo default
          selectElement.appendChild(defaultOption);

          data.cpu.forEach((local) => {
            const nome = local.nome;
            const optionElement = document.createElement('option');
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

//Função responsável por retornar os dados do campo select de Memória
function getDadosCampoMemorias() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/ativosAdd/memoria',
    dataType: 'json',
    success: function (data) {
      const selectElement = document.getElementById('memoria');
      if (selectElement !== null) {
        while (selectElement.firstChild) {
          selectElement.removeChild(selectElement.lastChild);
        }
        if (Object.keys(data).length !== 0) {
          const defaultOption = document.createElement('option');
          defaultOption.textContent = '';
          defaultOption.value = ''; // Valor vazio para o campo default
          selectElement.appendChild(defaultOption);

          data.memori.forEach((local) => {
            const nome = local.nome;
            const optionElement = document.createElement('option');
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

//Função responsável por retornar os dados do campo select de Armazenamento
function getDadosCampoArmazenamento() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/ativosAdd/armazenamento',
    dataType: 'json',
    success: function (data) {
      const selectElement = document.getElementById('armazenamento');
      if (selectElement !== null) {
        while (selectElement.firstChild) {
          selectElement.removeChild(selectElement.lastChild);
        }
        if (Object.keys(data).length !== 0) {
          const defaultOption = document.createElement('option');
          defaultOption.textContent = '';
          defaultOption.value = ''; // Valor vazio para o campo default
          selectElement.appendChild(defaultOption);

          data.ssdHDD.forEach((local) => {
            const nome = local.nome;
            const optionElement = document.createElement('option');
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

//Função responsável por retornar os dados do campo select de Fonte
function getDadosCampoFonte() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/ativosAdd/fonte',
    dataType: 'json',
    success: function (data) {
      const selectElement = document.getElementById('fonte');
      if (selectElement !== null) {
        while (selectElement.firstChild) {
          selectElement.removeChild(selectElement.lastChild);
        }
        if (Object.keys(data).length !== 0) {
          const defaultOption = document.createElement('option');
          defaultOption.textContent = '';
          defaultOption.value = ''; // Valor vazio para o campo default
          selectElement.appendChild(defaultOption);

          data.fontes.forEach((local) => {
            const nome = local.nome;
            const optionElement = document.createElement('option');
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

//Função responsável por retornar os dados do campo select de Placa de Vídeo
function getDadosCampoPlacaVideo() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/ativosAdd/placaVideo',
    dataType: 'json',
    success: function (data) {
      const selectElement = document.getElementById('placaVideo');
      if (selectElement !== null) {
        while (selectElement.firstChild) {
          selectElement.removeChild(selectElement.lastChild);
        }
        if (Object.keys(data).length !== 0) {
          const defaultOption = document.createElement('option');
          defaultOption.textContent = '';
          defaultOption.value = ''; // Valor vazio para o campo default
          selectElement.appendChild(defaultOption);

          data.Placas.forEach((local) => {
            const nome = local.nome;
            const optionElement = document.createElement('option');
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

//Função responsável por retornar os dados do campo select de Monitor
function getDadosCampoMonitores() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/ativosAdd/monitor',
    dataType: 'json',
    success: function (data) {
      const selectElement = document.getElementById('monitor');
      if (selectElement !== null) {
        while (selectElement.firstChild) {
          selectElement.removeChild(selectElement.lastChild);
        }
        if (Object.keys(data).length !== 0) {
          const defaultOption = document.createElement('option');
          defaultOption.textContent = '';
          defaultOption.value = ''; // Valor vazio para o campo default
          selectElement.appendChild(defaultOption);

          data.monitores.forEach((local) => {
            const nome = local.nome;
            const optionElement = document.createElement('option');
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

//Função responsável por retornar os dados do campo select de Cooler
function getDadosCampoCooler() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/ativosAdd/cooler',
    dataType: 'json',
    success: function (data) {
      const selectElement = document.getElementById('cooler');
      if (selectElement !== null) {
        while (selectElement.firstChild) {
          selectElement.removeChild(selectElement.lastChild);
        }
        if (Object.keys(data).length !== 0) {
          const defaultOption = document.createElement('option');
          defaultOption.textContent = '';
          defaultOption.value = ''; // Valor vazio para o campo default
          selectElement.appendChild(defaultOption);

          data.coler.forEach((local) => {
            const nome = local.nome;
            const optionElement = document.createElement('option');
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

//Função responsável por retornar os dados do campo select de Gabinete
function getDadosCampoGabinete() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/ativosAdd/gabinete',
    dataType: 'json',
    success: function (data) {
      const selectElement = document.getElementById('gabinete');
      if (selectElement !== null) {
        while (selectElement.firstChild) {
          selectElement.removeChild(selectElement.lastChild);
        }
        if (Object.keys(data).length !== 0) {
          const defaultOption = document.createElement('option');
          defaultOption.textContent = '';
          defaultOption.value = ''; // Valor vazio para o campo default
          selectElement.appendChild(defaultOption);

          data.gabinet.forEach((local) => {
            const nome = local.nome;
            const optionElement = document.createElement('option');
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

//Função do campo de busca
function buscaAtivoTabela() {
  const meuInput = $('#buscaequip');
  let timeout;
  $('#buscaequip').on('input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      $.ajax({
        url: `/ativos/findAtivos`,
        data: {
          nome: meuInput.val(),
        },
        dataType: 'json',
        success: function (data) {
          montaTabelaComPaginacao(data);
        },
        error: function (xhr, status, error) {
          mostraErro(
            'Ocorreu um erro ao buscar os dados dos usuários cadastrados!'
          );
        },
      });
    }, 800);
  });
}

// Função dos botões de ações
function editaExcluiUsuarios() {
  // Adicione um manipulador de eventos 'click' para o botão de excluir
  $('.btn-excluir').on('click', function (event) {
    // Evite que o clique no botão cause a página a ser recarregada
    event.preventDefault();
    // Use o SweetAlert2 para exibir a mensagem de confirmação
    Swal.fire({
      title: 'Tem certeza?',
      text:
        'Você está prestes a excluir este Equipamento. Esta ação não pode ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6c757d',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, exclua',
      width: '22em',
    }).then((result) => {
      if (result.isConfirmed) {
        const id = $(this).data('id');
        $('#form-excluir-' + id).submit();
      }
    });
  });
}

//Função responsável por controlar a visibilidade dos campos de componentes de hardware
function selectOnChange() {
  $('.hardware').on('change', function (event) {
    const selecionado = $('#hardware option:selected').val();
    if (selecionado) {
      $(`.${selecionado}`).removeAttr('hidden'); // REmove o Hidden do que foi selecionado
      $('.buttonAdd').removeAttr('hidden');
      const classe = getClassName();
      if (classe !== selecionado) {
        const exibido = $('.form-row.itemHardware').find('div').not('[hidden]');
        if (exibido.length > 0) {
          $.each(exibido, function (key, value) {
            const name = getClassDiv(exibido, key);
            if (name !== selecionado && name !== 'buttonAdd') {
              exibido[key].hidden = true;
            }
          });
        }
      } else {
        const exibido = $('.form-row.itemHardware').find('div').not('[hidden]');
        if (exibido.length > 0) {
          $.each(exibido, function (key, value) {
            const name = getClassDiv(exibido, key);
            if (name !== selecionado && name !== 'buttonAdd') {
              exibido[key].hidden = true;
            }
          });
        }
      }
    } else {
      const exibido = $('.form-row.itemHardware').find('div').not('[hidden]');
      if (exibido.length > 0) {
        $.each(exibido, function (key, value) {
          exibido[key].hidden = true;
        });
      }
    }
  });
}

//Função responsável por retornar nome da classe
function getClassName() {
  const exibido = $('.form-row.itemHardware').find('div').not('[hidden]');
  const parts = exibido[0].className.split(' ');
  const classe = parts[parts.length - 1];
  return classe;
}

//Função responsável por retornar a div de cada select
function getClassDiv(string, indice) {
  const clas = string[indice].className.split(' ');
  const name = clas[clas.length - 1];
  return name;
}

//Função responsável por montar a tabela de componentes de hardware ao adicionar um novo ativo
function montaTabela() {
  $('.buttonAdd').on('click', function () {
    const exibido = $('.form-row.itemHardware').find('div').not('[hidden]');
    if (!`${exibido.find('select').val()}`) {
      mostraMensagem(
        'Atenção!',
        'Informe um item para adicionar o componente',
        'Warning'
      );
    } else {
      const novaLinha = $(
        `<tr id= item-${exibido
          .find(':selected')
          .attr('id')} name =${getClassName()}  >`
      );
      const coluna1 = $(
        `<td id= item-${exibido
          .find(':selected')
          .attr('id')} name =${getClassName()} >`
      ).text(`${exibido.find('select').val()}`);
      const botaoExcluir = $('<button>')
        .attr({
          type: 'button',
          class: `btn btn-link btn-excluir-item-${exibido
            .find(':selected')
            .attr('id')}`,
          id: `${exibido.find(':selected').attr('id')}}`,
          onclick: `excluiItemTabela('${exibido
            .find(':selected')
            .attr('id')}')`,
        })
        .append($('<i>').attr('class', 'uil uil-trash'));

      novaLinha.append(coluna1);
      novaLinha.append(botaoExcluir);

      $('.tabela tbody').append(novaLinha);
      exibido.find('select').val('');
    }
  });
}

//Função responsável pelos campos de editar e excluir da tabela de componentes de hardware
function excluiItemTabela(id) {
  $(document).on('click', `.btn-excluir-item-${id}`, function () {
    const itemExcluir = $(`#item-${id}`);
    itemExcluir.remove();
  });
}

//Função responsável por prepagar os dados para adicionar um novo ativo
function cadastraNovoAtivo() {
  $(document).on('click', `.add`, function (event) {
    const nome = $('#nome').val();
    const local = $('#local_instalacao').val();
    const situacao = $('#situacao').val();
    const dataInstalacao = $('#dataInstalacao').val();
    const componentes = [];
    const dados = [];
    $('.tabela tbody tr').each(function () {
      const linha = $(this);
      const colunas = linha
        .find('td')
        .map(function () {
          const id = $(this).attr('id');
          const valor = $(this).text();
          return componentes.push({ id: id.split('-')[1], item: valor });
        })
        .get();
    });
    dados.push(nome, local, situacao, dataInstalacao, componentes);
    if (componentes.length) {
      $.ajax({
        type: 'POST',
        url: '/ativos/cadastro',
        data: JSON.stringify(dados),
        contentType: 'application/json',
        success: function (resposta) {
          Swal.fire({
            title: 'Equipamento Cadastrado com Sucesso!',
            confirmButtonText: 'Ok',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              window.location.href = '/ativos';
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

//Função responsável por preparar os dados para editar um novo ativo
function editaAtivo() {
  $(document).on('click', `.edit`, function (event) {
    const nome = $('#nome').val();
    const local = $('#local_instalacao').val();
    const situacao = $('#situacao').val();
    const dataInstalacao = $('#dataInstalacao').val();
    const componentes = [];
    const dados = [];
    $('.tabela tbody tr').each(function () {
      const linha = $(this);
      const colunas = linha
        .find('td')
        .map(function () {
          const id = $(this).attr('id');
          const valor = $(this).text();
          return componentes.push({ id: id.split('-')[1], item: valor });
        })
        .get();
    });
    dados.push(nome, local, situacao, dataInstalacao, componentes);
    if (componentes.length) {
      const id = window.location.pathname;
      $.ajax({
        type: 'PUT',
        url: `${window.location.pathname}`,
        data: JSON.stringify(dados),
        contentType: 'application/json',
        success: function (resposta) {
          Swal.fire({
            title: 'Equipamento atualizado com sucesso!',
            text: 'Deseja voltar?',
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Voltar',
            cancelButtonText: 'Continuar Editando',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = 'http://localhost:3000/ativos';
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
        'Warning'
      );
    }
  });
}

//Função responsável setar os dados quando entra para editar um novo ativo
function setaDadosAtivosEditar() {
  const rotaAtual = window.location.pathname.slice(0, 14);
  if (rotaAtual === '/ativos/editar') {
    const local = $('#local_instalacao').data('id');
    const situacao = $('#situacao').data('id');
    $('#situacao').val(situacao);
    $('#local_instalacao').val(local);
    $.ajax({
      url: '/ativos/getDadosAtivos',
      dataType: 'json',
      success: function (data) {
        data.ativos[0].hardware[0].componentes.forEach((dados) => {
          const novaLinha = $(`<tr id= item-${dados.id}>`);

          const coluna1 = $(`<td id= item-${dados.id}>`).text(`${dados.item}`);
          const botaoExcluir = $('<button>')
            .attr({
              type: 'button',
              class: `btn btn-link btn-excluir-item-${dados.id}`,
              id: `${dados.id}}`,
              onclick: `excluiItemTabela('${dados.id}')`,
            })
            .append($('<i>').attr('class', 'uil uil-trash'));

          novaLinha.append(coluna1);
          novaLinha.append(botaoExcluir);

          $('.tabela tbody').append(novaLinha);
        });
      },
      error: function (xhr, status, error) {
        mostraMensagem('Atenção!', erro.responseText, 'error');
      },
    });
  }
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

// Função responsável por montar a tabela com paginação
function montaTabelaComPaginacao(data) {
  var registrosPorPagina = 8;
  var paginaAtual = 0;
  $('#pagina-anterior').click(function () {
    paginaAtual = paginaAnterior(paginaAtual);
    exibirDados(
      data,
      (paginaAtual - 1) * registrosPorPagina,
      paginaAtual * registrosPorPagina
    );
  });

  $('#pagina-proxima').click(function () {
    paginaAtual = paginaProxima(paginaAtual, registrosPorPagina, data);
    exibirDados(
      data,
      paginaAtual * registrosPorPagina > registrosPorPagina
        ? registrosPorPagina
        : paginaAtual * registrosPorPagina,
      data.length < registrosPorPagina ? registrosPorPagina : data.length
    );
  });

  // Exibir dados iniciais
  exibirDados(
    data,
    0,
    registrosPorPagina < data.length ? registrosPorPagina : data.length
  );
}

//Função Responsável por exibir os dados com paginação
function exibirDados(data, startIndex, endIndex) {
  var tabela = $('#tabelaAtivos tbody');
  tabela.empty();
  console.log(startIndex, endIndex);
  if (data) {
    for (var i = startIndex; i < endIndex; i++) {
      var row = $('<tr>');
      row.append($('<td>').text(data[i]._id));
      row.append($('<td>').text(data[i].nome));
      row.append($('<td>').text(data[i].local));
      row.append(
        $(
          `<td><div class="d-inline-block"><form id="form-edita-${data[i]._id}" action="/ativos/editar/${data[i]._id}?_method=GET" method="GET"><button class="btn btn-link me-2"><i class='bx bxs-edit' id='${data[i]._id}'><i
          class="uil uil-pen"></i></button></form>
          </div>
          `
        )
      );
      row.append(`<td><div class="d-inline-block"><form id="form-excluir-${data[i]._id}" action="/ativos/deletar/${data[i]._id}?_method=DELETE" method="POST"><button type="button" class="btn btn-link btn-excluir" data-id=${data[i]._id}><i
      class="uil uil-trash"></i></button></form>
      </div>`);

      tabela.append(row);
    }
  }
}

// Função Responsável pelos botões avançar e voltar da tabela
function paginaAnterior(paginaAtual) {
  console.log(paginaAtual);
  if (paginaAtual > 0) {
    paginaAtual--;
    return paginaAtual;
  } else {
    return paginaAtual;
  }
}

// Função Responsável pelos botões avançar e voltar da tabela
function paginaProxima(paginaAtual, endIndex, data) {
  if (paginaAtual * endIndex < data.length) {
    paginaAtual++;
    return paginaAtual;
  } else {
    return paginaAtual;
  }
}
