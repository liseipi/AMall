
require(['main'], function () {
  require(['semantic', 'laydate'], function (semantic, laydate) {

    $(function () {
      laydate.render({
        elem: '#birthday'
      });
    })

  });
});




