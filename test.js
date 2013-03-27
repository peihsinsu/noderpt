var rpt = require('./lib')
  , json2table = require('nodeutil').json2table;

rpt.setup(null, 
  {
    dbCfgFile: '/root/project/report/lib/.database.cfg',
    rptConfigPath: '/root/project/report/report/',
    reportRoot:'/report/rest',
    reportDoc: '/report/restdoc'
  }
);

rpt.getRptFromConfig('simple.rpt.xml', false, function(d){
  /* You can debug only */
  //console.log(d);
  /* You can use it as html table output */
  //console.log(json2table.ConvertJsonToTable(d));
  /* Or use for a mail notice report */
  sendMail('your_mail@xxx.com', 
    'Dear Receiver: <br/><br/> The report is here: <br/>' + json2table.ConvertJsonToTable(d) + '<br/><br/> Send from noderpt');
});

//For send mail use, please modify the mail setting before use
function sendMail(receiver, content){
  mailer.init(
    {"smtpOptions":
      {"service":"Gmail", 
        "auth": {"user": "your-account","pass": "your-password"}}, 
        "sender": "NO-REPLY <no-reply@micloud.tw>"}
  );

  mailer.sendNodeMailAsync(receiver,
    'test mail send...',
    'send mail OK!',
    true,
    function(){
      console.log('Send mail done...');
    }
  );
}

rpt.datasource.end();
