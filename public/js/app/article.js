require(['main'], function () {
  require(['semantic', 'ckeditor'], function (semantic) {

    CKEDITOR.replace('summary_content');
    CKEDITOR.replace('content', {
      "height": 500
    });

  });
});
