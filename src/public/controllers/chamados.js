$(document).ready(function () {
  buscaChamadoTabela();
  getDadosCampoLocal();
  getDadosCampoEquipamento();
  cadastraNovoChamado();
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
      console.error('Erro ao buscar os local: ' + error);
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
      console.error('Erro ao buscar os local: ' + error);
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
        window.location.href = '/chamados';
      },
      error: function (erro) {
        console.error('Erro na solicitação:', erro);
      },
    });
  });
}
//Função do campo de busca
function buscaChamadoTabela() {
  $('#buscaChamado').on('keyup', function () {
    var value = $(this).val().toLowerCase();
    $('#tabela tbody tr').filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
}
