require(['main'], function () {
  require(['semantic'], function () {
    
    $('.ui.accordion').accordion();

    $('.ui.accordion>.item').on('click', function(){
      $('.ui.accordion>.item').removeClass('active');
      $(this).addClass('active');
    })

  });
});




