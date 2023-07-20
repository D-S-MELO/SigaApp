$(document).ready(function () {
  buscaUsuarioTabela();
  editaExcluiUsuarios();
});

function getDadosUsers() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/usuario/getUsuarios',
    dataType: 'json',
    success: function (data) {
      // Adiciona cada usuário como uma opção do select
      for (var i = 0; i < data.length; i++) {
        $('#users-select').append(
          '<option value="' + data[i]._id + '">' + data[i].nome + '</option>'
        );
      }
      $('.users-select').select2();
    },
    error: function (xhr, status, error) {
      console.error('Erro ao buscar os usuários: ' + error);
    },
  });
}

//Função do campo de busca
function buscaUsuarioTabela() {
  $('#buscauser').on('keyup', function () {
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
        'Você está prestes a excluir este usuário. Esta ação não pode ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6c757d',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, exclua-o!',
      width: '22em',
    }).then((result) => {
      if (result.isConfirmed) {
        const id = $(this).data('id');
        $('#form-excluir-' + id).submit();
      }
    });
  });
}
