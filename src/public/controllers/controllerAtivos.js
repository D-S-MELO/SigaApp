$(document).ready(function () {
  getDadosCampoLocal();
  buscaUsuarioTabela();
  editaExcluiUsuarios();
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
        // console.log(data);
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
