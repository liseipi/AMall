require.config({
  baseUrl: '/js/',
  paths: {
    'libs': 'libs',
    'components': './semantic/components',
    'jquery': 'libs/jquery-3.3.1.min',
    'lozad': 'libs/lozad.min',
    'css': 'libs/css',
    'vue': 'libs/vue.min',
    'semantic': 'semantic/semantic.min',
    'ScrollReveal': 'libs/scrollreveal.min',

    'pace': 'libs/pace/pace.min',
    'swiper': 'libs/swiper/swiper.min',
    'swal': 'libs/swal/sweetalert.min'
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
    }
  }
});

require(['pace', 'semantic', 'lozad', 'swal'], function (pace, semantic, lozad, swal) {
  //
  pace.start({
    document: false
  });

  //
  const observer = lozad();
  observer.observe();

  $(function () {
    $('.destroyConfirm').on('click', function () {
      var _this = $(this);
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then(function (willDelete) {
          if(willDelete){
            var url = _this.attr('href');
            window.location = url;
          }
        });
      return false;
    })
  })


})



