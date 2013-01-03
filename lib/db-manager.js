var config = require('./db-config')
  , db = config.db
  , fs = require('fs')
  , x2j = require('xml2json')
  , nutil = require('nodeutil')
  , log = nutil.logger.getInstance()
  , CONFIG_PATH = process.env.RPT_CONFIG_PATH;//initial by default

/**
 *  Help to initialize the environment 
 *  If user not init the function, they must setup the environment by export or set.
 *  ex: export RPT_CONFIG_PATH=$project/report/
 **/
exports.init = function(){
  CONFIG_PATH = process.env.RPT_CONFIG_PATH;
}

function getConfigure(xmlpath) {
  var confStr = fs.readFileSync(xmlpath, "utf8");
  var vo;
  if(xmlpath.endsWith('.xml')){
    vo = x2j.toJson(confStr,{object:true, trim:false});
    if(vo && vo.config) {
      return formatCfg(vo.config);
    } 
  } else {
    vo = JSON.parse(confStr);
  }
  log.debug(vo);
  return vo;
}

function formatCfg(cfg){
  return cfg;
}

/**
 * Generate documentation from config file
 */
exports.generateReportDoc = generateReportDoc;
function generateReportDoc(callback) {
  //1. list files in CONFIG_PATH
  var files = fs.readdirSync(CONFIG_PATH);

  //2. read the configure file
  var filesVo = new Array();
  for ( i in files ) {
    var vo = getConfigure(CONFIG_PATH + files[i], "utf8");
    vo.config_file = files[i];
    filesVo.push(vo);
  }

  //3. show json
  var err = null;
  callback(err, filesVo);
}

/**
 * module generateReport
 */
exports.generateReport = generateReport;
function generateReport(rpt, params, callback) {
  /* Get report configure file */
  var fileName = CONFIG_PATH + rpt;
  var conf = getConfigure(fileName, "utf8");

  /* Combine the report config to sql */
  var sql = conf.sql;
  var cond = new Array();
  if(conf.conditions) {
    conf.conditions.forEach(function(v){
      log.trace('field=%s, condition=%s', v.field, v.condition);
      log.trace('got field value:', params[v.field]);
      if(params[v.field]){
        log.debug('find field mapping, add to sql....');
        sql += (' ' + v.condition);
        cond.push(params[v.field]);
      }
    });
  }

  /* Send to DB query */
  log.info('[SQL] %s', sql);
  log.info('[COND]%s', cond);
  if(!sql)
    callback({"STATUS":"Error", "MSG":"sql not validate..."});
  else
  db.query(sql, cond, function(err, rows, fiels) {
    if(err) console.log(err);
    callback(err, rows, rows);
  });
}

