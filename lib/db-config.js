var cfgutil = require('nodeutil').cfgutil;
/**
 * Config file path: $project/lib/.database.cfg
 * You need to export the config file to environment
 * EX: export DB_CFG_FILE=~/project/report/lib/.database.cfg
 * Sample of database config:
 * {
 *   host: 'your.database.ip.address',
 *   port: 3306,
 *   user: 'db.username',
 *   password: 'db.password',
 *   database: 'db.name'
 * }
 */
var db_options = cfgutil.readJsonCfg(process.env.DB_CFG_FILE);

var mysql = new require('mysql'), db = null;
if(mysql.createClient) {
    db = mysql.createClient(db_options);
}else if(mysql.createConnection){
  db = mysql.createConnection(db_options);
} else {
    db = new mysql.Client(db_options);
    db.connect(function(err) {
      if(err) {
        console.error('connect db ' + db.host + ' error: ' + err);
        process.exit();
      }
    });
}
exports.db = db;
