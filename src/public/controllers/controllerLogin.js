$(document).ready(function () {
  getDadosLogin();
});

function getDadosLogin() {
  $('#login').on('click', function (event) {
    // Evita que o clique no botão cause a página a ser recarregada
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener(
        'click',
        function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        },
        false
      );
    });
    dados = [];
    const email = codificaDados($('#validationCustom01').val());
    const senha = codificaDados($('#validationCustom02').val());
    $.ajax({
      type: 'POST',
      url: '/login',
      data: { email: email, senha: senha },
      contentType: 'text/html',
      success: function (resposta) {
        window.location.href = '/';
      },
      error: function (xhr, status, error) {
        $('#mensagemValidacao').text(
          'Erro no login. Verifique suas credenciais.'
        );
      },
    });
  });
}

function codificaDados(dados) {
  var base64String = btoa(dados);
  return base64String;
}
