ExpressJS report configure
=======

If you want to use noderpt for web, you can follow the steps to build a rest web. 

## Pre-configure
You need to done the configure settings that desctipt in [README](../README.md)

## Step1: Load report router in app.js
Create the express project and edit the app.js file.

Build the app.js for web start using express:
```js
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , log = require('nodeutil').logger.getInstance()
  , rpt = require('noderpt');
  
var app = express();

rpt.setup(app, {
  dbCfgFile: '/root/project/report/lib/.database.cfg',
  rptConfigPath: '/root/project/report/report/',
  reportRoot:'/report/rest',
  reportDoc: '/report/restdoc'
});

app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  log.debug("Express server listening on port " + app.get('port'));
});
```
The main block we need to add, only:
```js
var rpt = require('noderpt');
rpt.setup(app, {
    dbCfgFile: '/root/project/report/lib/.database.cfg',
    rptConfigPath: '/root/project/report/report/',
    reportRoot:'/report/rest',
    reportDoc: '/report/restdoc'
});
```
The rptRouter.setup help for setup the REST route url prefix (/report/rest) and the document page route (/report/restdoc).


## Step2: Using report.js to render in the html page
We create a test.html in the $project/public folder, that is the default folder for express static resource. 
And in our sample, your need to download the jquery.js for build the page
Edit the html page:
```html
<html>
<head>
<script type="text/javascript" language="javascript" src="/javascripts/jquery.js"></script>
<script type="text/javascript" language="javascript" src="/report.js"></script>
<script type="text/javascript" language="javascript" src="/underscore-min.js"></script>
<script type="text/javascript" language="javascript" src="/json-to-table.js"></script>

<script>
$(document).ready(function() {
  $('#data').genReport(
    '/report/rest',
    'simple.rpt.xml', 
    {"USERNAME":"SIMONSU"},
    ["USERNAME","USER_ID"]);
} );
</script>
</head>

<body>
<h1>TEST REPORT</h1>
<div id="data"> </div>
</body>
</html>
```

## Start the server
```bash
# cd $project
# node app.js
```

If the three steps are all OK, you can load report using REST:

http://localhost:8080/report/rest/[Report Config File Name]?[queryKey=queryValue]
```html
ex: http://localhost:8080/report/rest/simple.rpt?USER_ID=6666
```
PS: the path need to follow the configure in the app.js

And the test page will be:
```html
http://localhost:8080/test.html
```
