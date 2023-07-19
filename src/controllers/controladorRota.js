const { MASTER_DIR } = require('../helpers/constants');

const index = function (request, response, next) {
  return response.render('home', { layout: MASTER_DIR });
};

module.exports = { index };
