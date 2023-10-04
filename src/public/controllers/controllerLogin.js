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
      type: 'GET',
      url: '/login/validaUsuario',
      data: { email: email, senha: senha },
      contentType: 'application/json',
      success: function (resposta) {
        window.location.href = '/';
      },
      error: function (xhr, status, error) {
        $('#mensagemValidacao').text(xhr.responseText);
      },
    });
  });
}

function codificaDados(dados) {
  var base64String = btoa(dados);
  return base64String;
}
