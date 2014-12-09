/**
 * Generate report table using config, the result will translate to a html table as output to the caller object
 */
(function($) {
$.fn.genReport = function(rptRoot, rpt, query, filterRule, replaceMap) {
  var url = rptRoot + '/' + rpt + '?ts=' + new Date().getTime() + getQueryString(query);
  //alert(url);
  var _this = $(this);
  genReportFromUrl(_this, url, filterRule, replaceMap);
};
})(jQuery);

/**
 * Generate report from given url, the result will translate to a html table as output to the caller object
 */
(function($) {
$.fn.genReportFromUrl = function(url, filterRule, replaceMap) {
  var _this = $(this);
  genReportFromUrl(_this, url, filterRule, replaceMap) ;
};
})(jQuery);

function genReportFromUrl(_this, url, filterRule, replaceMap) {
  $.ajax({
      url: url,
      success: function(data) {
        if(data && data.length > 0) {
          var d = filterJson(data, filterRule);
          var jsonHtmlTable = ConvertJsonToTable(d, 'jsonTable', 'rpt', '<span class="btn">CLICK</span>');
          _this.html(jsonHtmlTable);
          
          if(replaceMap){
            $('th').each(function(i){
                var vv = replaceMap[$(this).html()]
                if(vv)
                    $(this).html(vv)
            });
          }
        } else {
          _this.html('<p id="rpt_msg" style="color:red">No data for present!</p>');
        }
        $('#jsonTable').genCsv();
      }
  });
}

/**
 * Using query result (the 0th row) to marshalling to the page input fields
 * The fields' name need to follow the java method naming rule
 * About naming: http://docs.oracle.com/javase/tutorial/java/javaOO/methods.html
 */
(function($) {
$.fn.genReport2Form = function(rptRoot, rpt, query, opt, fn) {
  var filterRule = opt ? opt.filterRule : null;
  var replaceMap = opt ? opt.replaceMap : null;
  var url = rptRoot + '/' + rpt + '?ts=' + new Date().getTime() + getQueryString(query);
  var _this = $(this);
  genReport2Form(_this, url, filterRule, replaceMap, fn);
};
})(jQuery);

function genReport2Form(_this, url, filterRule, replaceMap, fn) {
  $.ajax({
      url: url,
      success: function(data) {
        if(data && data.length > 0) {
          var d = filterJson(data, filterRule);
          var keys = Object.keys(d[0]);
          for(var i = 0 ; i < keys.length ; i++){
            var k = toBeanName(keys[i]);
            if($('#' + k).size())
              $('#' + k).val(d[0][keys[i]]);
            else if($('input[type=radio][name=' + k + ']').size())
              $('input[name=' + k + '][value='+d[0][keys[i]]+']').attr('checked',true);
          }
        } else {
          _this.append('<p id="rpt_msg" style="color:red">No data for present!</p>');
        }
        //do the callback
        fn(data);
      }
  });
}

function filterJson(jsonArr, rule){
  if(!rule)
    return jsonArr;

  var resultArr = new Array();
  for(var i = 0; i < jsonArr.length ; i++ ){
    var v = jsonArr[i];
    resultArr.push(_.pick(v, rule));
  }
  return resultArr;
}

function getQueryString(json){
  if(!json) return '';
  var keyArr = Object.keys(json);
  var str = '';
  for(var i = 0 ; i < keyArr.length ; i++) {
    str += ('&' + keyArr[i] + '=' + encodeURIComponent(json[keyArr[i]]));
  }
  return str;
}

function toBeanName(str){
  var strArr = str.split('_');
  var result = strArr[0].toLowerCase();
  for(var i = 1 ; i < strArr.length ; i++) {
    result += firstDigitUppercase(strArr[i]);
  }
  return result;
}

function firstDigitUppercase(str){
  var one = str.substring(0, 1);
  var other = str.substring(1);

  return one.toUpperCase() + other.toLowerCase();
}

function getURLParameter(name) {
  var u = decodeURI(
    (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
  );

  if(u == 'null' || u == 'NULL') 
    return null;
  else
    return u;
}
