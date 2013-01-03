var dbm //= require('./db-manager')
  , log = require('nodeutil').logger.getInstance()
  , express = require('express')
  , url = require('url');

/**
 * module getRestFromConfig
 */
function getRestFromConfig(req, res){
  log.debug('Do report of : %s', req.params.rpt);
  var url_parts = url.parse(req.url, true);
  log.debug('url_parts.query : %s', JSON.stringify(url_parts.query));
  dbm.generateReport(req.params.rpt, url_parts.query, function(err, rows, fiels){
    res.writeHead(200,{'Content-Type': 'application/json'} );
    res.end(JSON.stringify(rows));
  });
}
exports.getRestFromConfig = getRestFromConfig;

function getRestDoc(req, res){
  dbm.generateReportDoc(function(err, files){
    res.writeHead(200,{'Content-Type': 'application/json'} );
    res.end(JSON.stringify(files));
  });
}
exports.getRestDoc = getRestDoc;

exports.setup = function(app, cfg){
  app.get(cfg.reportRoot + '/:rpt', getRestFromConfig);
  app.get(cfg.reportDoc, getRestDoc);
  app.use(express.static(__dirname + '/res'));
  
  //Initialize the environment
  dbm = require('./db-manager');
  dbm.init();
}
