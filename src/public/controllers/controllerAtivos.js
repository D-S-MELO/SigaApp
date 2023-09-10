$(document).ready(function () {
  getDadosCampoLocal();
  buscaUsuarioTabela();
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
});
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
      console.error('Erro ao buscar os local: ' + error);
    },
  });
}
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
      console.error('Erro ao buscar os Sistema Operacional: ' + error);
    },
  });
}
function getDadosCampoPlacaMae() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/ativosAdd/placaMae',
    dataType: 'json',
    success: function (data) {
      const selectElement = document.getElementById('placaMae');
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
      console.error('Erro ao buscar Placa Mãe: ' + error);
    },
  });
}
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
      console.error('Erro ao buscar os processadores: ' + error);
    },
  });
}
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
      console.error('Erro ao buscar as memorias: ' + error);
    },
  });
}
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
      console.error('Erro ao buscar os Armazenamentos: ' + error);
    },
  });
}
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
      console.error('Erro ao buscar as Fontes: ' + error);
    },
  });
}
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
      console.error('Erro ao buscar as Fontes: ' + error);
    },
  });
}
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
      console.error('Erro ao buscar as Fontes: ' + error);
    },
  });
}
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
      console.error('Erro ao buscar as Fontes: ' + error);
    },
  });
}
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
      console.error('Erro ao buscar as Fontes: ' + error);
    },
  });
}
//Função do campo de busca
function buscaUsuarioTabela() {
  $('#buscaequip').on('keyup', function () {
    var value = $(this).val().toLowerCase();
    $('#tabela tbody tr').filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
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

function getClassName() {
  const exibido = $('.form-row.itemHardware').find('div').not('[hidden]');
  const parts = exibido[0].className.split(' ');
  const classe = parts[parts.length - 1];
  return classe;
}

function getClassDiv(string, indice) {
  const clas = string[indice].className.split(' ');
  const name = clas[clas.length - 1];
  return name;
}

function montaTabela() {
  $('.buttonAdd').on('click', function () {
    const exibido = $('.form-row.itemHardware').find('div').not('[hidden]');
    console.log(`${exibido.find('select').val()}`);
    if (!`${exibido.find('select').val()}`) {
      Swal.fire('Informe um item para adicionar o componente');
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

function excluiItemTabela(id) {
  $(document).on('click', `.btn-excluir-item-${id}`, function () {
    const itemExcluir = $(`#item-${id}`);
    itemExcluir.remove();
  });
}

function cadastraNovoAtivo() {
  $(document).on('click', `.add`, function (event) {
    const fabricante = $('#fabricante').val();
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
    dados.push(fabricante, local, situacao, dataInstalacao, componentes);
    if (componentes.length) {
      $.ajax({
        type: 'POST',
        url: '/ativos/cadastro',
        data: JSON.stringify(dados),
        contentType: 'application/json',
        success: function (resposta) {
          window.location.href = '/ativos';
        },
        error: function (erro) {
          console.error('Erro na solicitação:', erro);
        },
      });
    } else {
      Swal.fire('Preencha os componentes do equipamento');
    }
  });
}
function editaAtivo() {
  $(document).on('click', `.edit`, function (event) {
    const fabricante = $('#fabricante').val();
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
    dados.push(fabricante, local, situacao, dataInstalacao, componentes);
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
          console.error('Erro na solicitação:', erro);
        },
      });
    } else {
      Swal.fire('Preencha os componentes do equipamento');
    }
  });
}

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
        console.log(data.ativos[0].hardware[0].componentes);
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
        console.error('Erro ao buscar os ativos: ' + error);
      },
    });
  }
}
