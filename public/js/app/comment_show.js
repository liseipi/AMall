require(['main'], function () {
  require(['semantic', 'public', 'jquery', 'pagination'], function (semantic, public, $) {

    $(function () {
      //分页
      $('#pages').pagination({
        pageCount: lastPage,
        current: page,
        jump: true,
        coping: true,
        count: 7,
        // mode: 'fixed',
        homePage: '<i class="fast backward icon"></i>',
        endPage: '<i class="fast forward icon"></i>',
        prevContent: '<i class="chevron left icon"></i>',
        nextContent: '<i class="chevron right icon"></i>',
        callback: function (api) {
          //console.log(api.getCurrent())
          query.page = api.getCurrent()
          var url = '/article/list?' + $.param(query);
          window.location.href = url;
        }
      });

    });

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
