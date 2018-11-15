require(['main'], function () {
  require(['semantic', 'public', 'jquery'], function (semantic, public, $) {

    $(".user_ip").each(function (k, v) {
      var ip = $(this).data('ip');
      if (public.isValidIP(ip)) {
        $.ajax({
          type: "options",
          // dataType: "jsonp",
          // jsonp: "callback",
          // jsonpCallback: "success_jsonpCallback",
          // url: "https://ip.ws.126.net/ipquery?ip=119.130.70.55",
          url: "http://ip.taobao.com/service/getIpInfo.php?ip=119.130.70.55",
          success: function (res) {
            console.log(res)
          }
        });
      }
    });

  });
});
