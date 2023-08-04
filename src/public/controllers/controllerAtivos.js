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
});

function getDadosCampoLocal() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/ativos/local',
    dataType: 'json',
    success: function (data) {
      const selectElement = document.getElementById('local_instalacao');
      if (selectElement !== null) {
        while (selectElement.firstChild) {
          selectElement.removeChild(selectElement.lastChild);
        }
        if (Object.keys(data).length !== 0) {
          data.locais.forEach((local) => {
            const nome = local.nome;
            const optionElement = document.createElement('option');
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
      console.error('Erro ao buscar os local: ' + error);
    },
  });
}

function getDadosCampoSo() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/ativos/so',
    dataType: 'json',
    success: function (data) {
      const selectElement = document.getElementById('so');
      if (selectElement !== null) {
        while (selectElement.firstChild) {
          selectElement.removeChild(selectElement.lastChild);
        }
        if (Object.keys(data).length !== 0) {
          data.so.forEach((so) => {
            const nome = so.nome;
            const optionElement = document.createElement('option');
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
      console.error('Erro ao buscar os Sistema Operacional: ' + error);
    },
  });
}

function getDadosCampoPlacaMae() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/ativos/placaMae',
    dataType: 'json',
    success: function (data) {
      const selectElement = document.getElementById('placa_mae');
      if (selectElement !== null) {
        while (selectElement.firstChild) {
          selectElement.removeChild(selectElement.lastChild);
        }
        if (Object.keys(data).length !== 0) {
          data.placaMae.forEach((placa) => {
            const nome = placa.nome;
            const optionElement = document.createElement('option');
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
    url: '/ativos/processador',
    dataType: 'json',
    success: function (data) {
      const selectElement = document.getElementById('processador');
      if (selectElement !== null) {
        while (selectElement.firstChild) {
          selectElement.removeChild(selectElement.lastChild);
        }
        if (Object.keys(data).length !== 0) {
          data.cpu.forEach((cpu) => {
            const nome = cpu.nome;
            const optionElement = document.createElement('option');
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
      console.error('Erro ao buscar os processadores: ' + error);
    },
  });
}

function getDadosCampoMemorias() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/ativos/memoria',
    dataType: 'json',
    success: function (data) {
      const selectElement = document.getElementById('memoria');
      if (selectElement !== null) {
        while (selectElement.firstChild) {
          selectElement.removeChild(selectElement.lastChild);
        }
        if (Object.keys(data).length !== 0) {
          data.memori.forEach((cpu) => {
            const nome = cpu.nome;
            const optionElement = document.createElement('option');
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
      console.error('Erro ao buscar as memorias: ' + error);
    },
  });
}

function getDadosCampoArmazenamento() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/ativos/armazenamento',
    dataType: 'json',
    success: function (data) {
      const selectElement = document.getElementById('armazenamento');
      if (selectElement !== null) {
        while (selectElement.firstChild) {
          selectElement.removeChild(selectElement.lastChild);
        }
        if (Object.keys(data).length !== 0) {
          data.ssdHDD.forEach((cpu) => {
            const nome = cpu.nome;
            const optionElement = document.createElement('option');
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
      console.error('Erro ao buscar os Armazenamentos: ' + error);
    },
  });
}
function getDadosCampoFonte() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/ativos/fonte',
    dataType: 'json',
    success: function (data) {
      const selectElement = document.getElementById('fonte');
      if (selectElement !== null) {
        while (selectElement.firstChild) {
          selectElement.removeChild(selectElement.lastChild);
        }
        if (Object.keys(data).length !== 0) {
          data.fontes.forEach((cpu) => {
            const nome = cpu.nome;
            const optionElement = document.createElement('option');
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
      console.error('Erro ao buscar as Fontes: ' + error);
    },
  });
}
function getDadosCampoPlacaVideo() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/ativos/placaVideo',
    dataType: 'json',
    success: function (data) {
      const selectElement = document.getElementById('placaVideo');
      if (selectElement !== null) {
        while (selectElement.firstChild) {
          selectElement.removeChild(selectElement.lastChild);
        }
        if (Object.keys(data).length !== 0) {
          data.Placas.forEach((cpu) => {
            const nome = cpu.nome;
            const optionElement = document.createElement('option');
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
      console.error('Erro ao buscar as Fontes: ' + error);
    },
  });
}
function getDadosCampoMonitores() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/ativos/monitor',
    dataType: 'json',
    success: function (data) {
      const selectElement = document.getElementById('monitor');
      if (selectElement !== null) {
        while (selectElement.firstChild) {
          selectElement.removeChild(selectElement.lastChild);
        }
        if (Object.keys(data).length !== 0) {
          data.monitores.forEach((cpu) => {
            const nome = cpu.nome;
            const optionElement = document.createElement('option');
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
      console.error('Erro ao buscar as Fontes: ' + error);
    },
  });
}
function getDadosCampoCooler() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/ativos/cooler',
    dataType: 'json',
    success: function (data) {
      const selectElement = document.getElementById('cooler');
      if (selectElement !== null) {
        while (selectElement.firstChild) {
          selectElement.removeChild(selectElement.lastChild);
        }
        if (Object.keys(data).length !== 0) {
          data.coler.forEach((cpu) => {
            const nome = cpu.nome;
            const optionElement = document.createElement('option');
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
      console.error('Erro ao buscar as Fontes: ' + error);
    },
  });
}
function getDadosCampoGabinete() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/ativos/gabinete',
    dataType: 'json',
    success: function (data) {
      const selectElement = document.getElementById('gabinete');
      if (selectElement !== null) {
        while (selectElement.firstChild) {
          selectElement.removeChild(selectElement.lastChild);
        }
        if (Object.keys(data).length !== 0) {
          data.gabinet.forEach((cpu) => {
            const nome = cpu.nome;
            const optionElement = document.createElement('option');
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
      console.error('Erro ao buscar as Fontes: ' + error);
    },
  });
}

//Função do campo de busca
function buscaUsuarioTabela() {
  $('#buscaLocal').on('keyup', function () {
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
        'Você está prestes a excluir este local. Esta ação não pode ser desfeita.',
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
