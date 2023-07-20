const { MASTER_DIR } = require('../helpers/constants');

const index = function (request, response, next) {
  const jsFiles = ['layout.js'];
  return response.render('404', {
    layout: MASTER_DIR,
    jsFiles: { files: jsFiles },
  });
};

module.exports = { index };
