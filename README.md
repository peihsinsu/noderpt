Node Report Server (MySQL only now!)
=======
Simple MySQL DB SQL to JSON mapping module, and also provide web function to render table.

# Installation
```bash
npm install noderpt
```

# Useage
Few steps to build the report...
## Step1: Config the DB and SQL mapping file
The database config file's path need to export to environment and the config will like:
```json
{
  "host": "database.ip.address",
  "port": 3306,
  "user": "dbuser",
  "password": "dbpassword",
  "database": "dbname"
}
```
You need to create a config file inside your project, in our sample we create the report config in $project/report.

You can use json format config
```json
{
  "name": "queryUserInfo",
  "sql" : "select * from user where 1=1 ",
  "conditions": [
    {"field":"USERNAME", "condition":"and username = ?"},
    {"field":"USER_ID", "condition":"and user_id = ?"}
  ],
  "endsql": "order by 1"
}
```
Or using xml format config
```xml
<config>
  <name>queryUserInfo</name>
  <sql>select * from user where 1=1</sql>
  <conditions>
    <field>USERNAME</field> <condition>and username = ?</condition>
  </conditions>
  <conditions>
    <field>USER_ID</field> <condition>and user_id = ?</condition>
  </conditions>
  <endsql>
    order by 1
  </endsql>
</config>
```

In the configuration, the fields are:
* name: report name
* sql: the main sql block, that is static and will combined with conditions and endsql directly
* conditions: you can have many conditions to let query bring into query, in the api, if you specify a query string in the end of rest url and the parameter will combine the condition to sql
* endsql: the final sql, like "order by", "group by"..., that will combine to the end of sql statement

## Testing your configure (test.js)

```js
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
```

After run the test.js, you will get a query result of the configure file as a json array format.

# Other Documents

* [Form mashalling script](https://github.com/peihsinsu/noderpt/blob/master/doc/formMarshalling.md)
