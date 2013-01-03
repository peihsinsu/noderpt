var exports = module.exports;

exports.setup = function(app,cfg){
  //Setup configure files
  if(cfg.dbCfgFile)
    process.env.DB_CFG_FILE = cfg.dbCfgFile;
  if(cfg.rptConfigPath)
    process.env.RPT_CONFIG_PATH = cfg.rptConfigPath;
  if(!process.env.DB_CFG_FILE || !process.env.RPT_CONFIG_PATH) {
    log.error('Environment check error, please check DB_CFG_FILE and RPT_CONFIG_PATH setting...');
    process.exit(1);
  }
  
  //export modules when setup finish
  exports.router = require('./rpt-router');
  exports.generator = require('./db-manager');
}



String.prototype.endsWith = function (s) {
  return this.length >= s.length && this.substr(this.length - s.length) == s;
}

String.prototype.startsWith = function (str) {
  return this.indexOf(str) == 0;
};

String.prototype.includeOf = function(str) {
  return this.indexOf(str) >=0;
}
