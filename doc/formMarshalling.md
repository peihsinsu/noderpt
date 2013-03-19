report.js - Form Marshalling Script
=======

If you building HTML page that need to setup a query result to a form that the fields mapping to the result object. You can use the following way to easily load the result to a form.

* Step 1: Create your form in html page

```html
<form id="myform">
<input type="text" id="userId"/>
<input type="text" id="userType"/>
<input type="text" id="userSex"/>
...
</form>
```

* Step 2: Add a script block to load from a report

```js
<script>
var query = {pk: 'the pk of the query'};
$('#myform').genReport2Form(
  '/report/rest', //that defined in the app.js
  'simple.xml', //the report name that load from $Project_Home/report/
  query //The query conditions
);
</script>
```

In the sample, we assumption the report like:

```xml
<config>
  <name>queryUserInfo</name>
  <sql>select USER_ID, USER_TYPE, USER_SEX from user where 1=1</sql>
  <conditions>
    <field>USER_ID</field> <condition>and user_id = ?</condition>
  </conditions>
  <endsql>
    order by 1
  </endsql>
</config>
```

That the query result fields will be translate like java method name. And this will let the function to load data from a configured report and the result (we assumpt that the result will only one row, and we get the first row only). 
