require(['main'], function () {
  require(['semantic', 'public', 'jquery'], function (semantic, public, $) {

    $(".user_ip").each(function (k, v) {
      var ip = $(this).data('ip');
      var _this = $(this);
      if (public.isValidIP(ip)) {
        $.ajax({
          url: 'http://api.map.baidu.com/location/ip?ip=' + ip + '&ak=ID1G8fGMKeX80k6QH3NpYtDGyGwEnDh6',
          type: 'POST',
          dataType: 'jsonp',
          success: function (data) {
            if (data.status == 0) {
              _this.children("span").html("[" + data.content.address + "]");
            }
          }
        });
      }
    });

  });
});
