require(['main'], function () {
  require(['semantic'], function () {

    $(function () {

      //选择/取消 主项目时 操作子项
      $(".selMenu .parentItem .checkbox").on('click', function () {
        if(!$(this).find("input[type='checkbox']").is(':disabled')){

          if ($(this).find("input[type='checkbox']").is(':checked')) {
            $(this).parents('.selMenu').find(".subItems input[type='checkbox']").prop("checked", false);
          } else {
            $(this).parents('.selMenu').find(".subItems input[type='checkbox']").prop("checked", true);
          }

        }
      })

      // 选择子项是，默认选中上级项
      $(".selMenu .subItems .checkbox").not(':disabled').on('click', function () {
        if(!$(this).find("input[type='checkbox']").is(':disabled')){
          if (!$(this).find("input[type='checkbox']").is(':checked')) {
            $(this).parents('.selMenu').find(".parentItem input[type='checkbox']").prop("checked", true);
          }
        }
      });
    });

  });
});




