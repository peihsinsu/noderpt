(function($) {
$.fn.genReport = function(rptRoot, rpt, query, filterRule) {
  var url = rptRoot + '/' + rpt + '?ts=' + new Date().getTime() + getQueryString(query);
  var _this = $(this);
  $.ajax({
      url: url,
      success: function(data) {
        var d = filterJson(data, filterRule);
        var jsonHtmlTable = ConvertJsonToTable(d, 'jsonTable', null, 'Download');
        _this.html(jsonHtmlTable);
      }
    }
  );
};
})(jQuery);

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
  var keyArr = Object.keys(json);
  var str = '';
  for(var i = 0 ; i < keyArr.length ; i++) {
    str += ('&' + keyArr[i] + '=' + json[keyArr[i]]);
  }
  return str;
}
