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
          var url = '/article/list?' + $.param(query);
          window.location.href = url;
        }
      });

      //排序
      $('.articleSort').on('click', function () {
        var _this = $(this);
        var _url = _this.attr('href');
        var _csrf = _this.data('csrf');

        var formHtml = '<form id="sortForm" action="' + _url + '&_method=PUT" method="post"><input type="hidden" name="_csrf" value="' + _csrf + '"></form>'
        $('body').append(formHtml)
        $('#sortForm').submit().remove();
        return false;
      })
    });

  });
});
