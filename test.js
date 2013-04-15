var rpt = require('./lib')
  , json2table = require('nodeutil').json2table
  , mailer = require('nodeutil').mailutil;

rpt.setup(null, 
  {
    dbCfgFile: '/root/project/report/lib/.database.cfg', //Where the database config file exist
    rptConfigPath: '/root/project/report/report/' //Where the simple.rpt.xml exist
  }
);

rpt.getRptFromConfig('simple.rpt.xml', false, function(d){
  /* You can debug only */
  //console.log(d);
  /* You can use it as html table output */
  //console.log(json2table.ConvertJsonToTable(d));
  /* Or use for a mail notice report */
  sendMail('receiver_mail@gmail.com', 
    'Dear Receiver: <br/><br/> The report is here: <br/>' + json2table.ConvertJsonToTable(d) + '<br/><br/> Send from noderpt');
});

//For send mail use, please modify the mail setting before use
function sendMail(receiver, content){
  mailer.init(
    {"smtpOptions":
      {"service":"Gmail", 
        "auth": {"user": "your_name","pass": "your_password"}}, 
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
