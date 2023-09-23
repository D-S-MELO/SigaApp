$(document).ready(function () {
  buscaDadosTabelas();
  habilitaAbas();
  verificarUltimaAbaAberta();
});

// Função para habilitar as abas
function habilitaAbas() {
  // Adiciona um evento de clique a cada aba
  $('.tab-item').on('click', function () {
    const tabId = $(this).data('tab');
    $('.tab-content').hide(); // Oculta todos os conteúdos das abas
    $('#' + tabId).show(); // Mostra o conteúdo da aba clicada
    localStorage.setItem('latTabOpeb', `${tabId}`);
  });
}

// Função para verificar ultima aba aberta, para permanecer ela em aberta
function verificarUltimaAbaAberta() {
  let tabID = localStorage.getItem('latTabOpeb');
  $('#' + tabID).show();
}

function buscaDadosTabelas() {
  $(
    '#buscaArmazenamento ,#buscaCooler,#buscaFonte,#buscaMemoria,#buscaMonitor,#buscaPlaca,#buscaPlaca,#buscaProcessador,#buscaLocal'
  ).on('keyup', function () {
    var value = $(this).val().toLowerCase();
    $('#tabela tbody tr').filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
}
