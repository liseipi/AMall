require(['main'], function () {
  require(['semantic', 'pagination'], function (semantic) {

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
          var url = '/member/list?' + $.param(query);
          window.location.href = url;
        }
      });

    });

  });
});
