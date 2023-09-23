$(document).ready(function () {
  getDadosGrafico();
});

function getDadosGrafico() {
  // Realiza uma requisição Ajax para buscar os dados do servidor
  $.ajax({
    url: '/ativos/getDadosGraficos',
    dataType: 'json',
    success: function (data) {
      console.log(data);
      criarGrafico(data);
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

// Um objeto para manter o registro das cores atribuídas
const coresAtribuidas = {};

function gerarCorAleatoria(id) {
  // Se já tivermos uma cor atribuída para este ID, retorná-la
  if (coresAtribuidas.hasOwnProperty(id)) {
    return coresAtribuidas[id];
  }

  // Caso contrário, vamos gerar uma nova cor aleatória e registrá-la
  const novaCor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)}, 0.2)`;
  coresAtribuidas[id] = novaCor;
  return novaCor;
}

function criarGrafico(data) {
  window.addEventListener('resize', () => {
    const container = document.getElementById('meuGraficoContainer');
    const maxWidth = container.offsetWidth;
    chart.resize();
    chart.canvas.parentNode.style.maxWidth = maxWidth + 'px';
  });
  // Use o objeto de dados para criar um gráfico com o Chart.js
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar', // Tipo de gráfico (pode ser bar, pie, line, etc.)
    data: {
      labels: data.ativos.map((item) => item._id),
      datasets: [
        {
          label: 'Quantidade de Ativos',
          data: data.ativos.map((item) => item.count),
          backgroundColor: data.ativos.map((item) =>
            gerarCorAleatoria(item._id)
          ), // Cores baseadas no ID
          borderColor: 'rgba(0, 0, 0, 5)', // Cor da borda das barras
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
}
