require.config({
  baseUrl: '/js/',
  paths: {
    'libs': 'libs',
    'public': 'public',
    'components': './semantic/components',
    'jquery': 'libs/jquery-3.3.1.min',
    'lozad': 'libs/lozad.min',
    'css': 'libs/css',
    'vue': 'libs/vue.min',
    'semantic': 'semantic/semantic.min',
    'ScrollReveal': 'libs/scrollreveal.min',
    'ckeditor': 'libs/ckeditor/ckeditor',
    'pagination': 'libs/jquery.pagination',
    'pace': 'libs/pace/pace.min',
    'swiper': 'libs/swiper/swiper.min',
    'swal': 'libs/swal/sweetalert.min',
    'laydate': 'libs/laydate/laydate'
  },
  shim: {
    semantic: {
      deps: ['jquery']
    },
    pace: {
      deps: ['css!libs/pace/pace-theme-minimal.css', 'jquery']
    },
    swiper: {
      deps: ['css!libs/swiper/swiper.min.css', 'jquery']
    },
    laydate: {
      deps: ['css!libs/laydate/theme/default/laydate.css']
    },
    pagination: {
      deps: ['jquery']
    }
  }
});

require(['pace', 'semantic', 'lozad', 'swal'], function (pace, semantic, lozad, swal) {
  //加载条
  pace.start({
    document: false
  });

  //图片lozad
  const observer = lozad();
  observer.observe();

  $(function () {
    //删除确认
    $('.destroyConfirm').on('click', function () {
      var _this = $(this);
      swal({
        title: "确认删除?",
        text: "您确定需要删除当前项!",
        icon: "warning",
        buttons: ['取消', '删除'],
        dangerMode: true,
      })
        .then(function (willDelete) {
          if (willDelete) {
            var _url = _this.attr('href');
            var _csrf = _this.data('csrf');

            var formHtml = '<form id="deleteForm" action="' + _url + '?_method=DELETE" method="post"><input type="hidden" name="_csrf" value="' + _csrf + '"></form>'
            $('body').append(formHtml)
            $('#deleteForm').submit().remove();

          }
        });
      return false;
    })

    //checkbox
    $('.ui.checkbox').checkbox();

    //select
    $('select.dropdown').dropdown();

    //accordion
    $('.ui.accordion').accordion();

    //点击弹出资料浏览窗口
    $('button.SImage').on('click', function () {
      var SImage = $(this).data('labelledby');
      var screenH = window.screen.availHeight;
      var screenW = window.screen.availWidth;
      window.open(
        '/assets/browseServer?type=image&SImage=' + SImage,
        'imagesWin',
        'modal=yes,height=' + (screenH * 0.8) + '%,width=' + (screenW * 0.8) + '%,top=' + (screenH * 0.15) + '%,left=' + (screenW * 0.1) + '%,toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=yes,status=yes'
      );
    });

    //单个选择上传方式
    $('.ui.accordion.upload').accordion({
      onOpen: function () {
        $(this).find(".ui.input").removeClass('disabled');
        $(this).find("input, button").removeAttr('disabled');

        $(this).siblings(".content").find(".ui.input").addClass('disabled');
        $(this).siblings(".content").find("input, button").attr("disabled", "disabled");
      },
      onClose: function () {
        $(this).find(".ui.input").addClass('disabled');
        $(this).find("input, button").attr("disabled", "disabled");
      }
    });
    $('.sfUpload').on('change', '.selectImg', function () {
      var file = $(this).get(0).files[0];
      if (file) {
        var img = new Image();
        var imgUrl = window.URL.createObjectURL(file);
        $(".tempImages img").attr("src", imgUrl);
      }
    });
    //END - 单个选择上传方式

  });

});



