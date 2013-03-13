var rpt = require('./lib');
rpt.setup(null, 
  {
    dbCfgFile: '/root/project/report/lib/.database.cfg',
    rptConfigPath: '/root/project/report/report/',
    reportRoot:'/report/rest',
    reportDoc: '/report/restdoc'
  }
);

rpt.getRptFromConfig('simple.rpt.xml', false, function(d){
  console.log(d);
});

rpt.datasource.end();
