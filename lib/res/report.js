(function($) {
$.fn.genReport = function(rptRoot, rpt, query, filterRule, replaceMap) {
  var url = rptRoot + '/' + rpt + '?ts=' + new Date().getTime() + getQueryString(query);
  var _this = $(this);
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
  if(!json) return '';
  var keyArr = Object.keys(json);
  var str = '';
  for(var i = 0 ; i < keyArr.length ; i++) {
    str += ('&' + keyArr[i] + '=' + json[keyArr[i]]);
  }
  return str;
}
