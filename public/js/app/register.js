require(['main'], function () {
  require(['semantic'], function () {
    $('.ui.ev_dropdown').dropdown();

    $('form').form({
      on: 'blur',
      fields: {
        username: {
          identifier: 'username',
          rules: [{
            type: 'empty',
            prompt: '用户名不为空'
          },
            {
              type: 'minLength[6]',
              prompt: '用户名不能少于6个字'
            }]
        },
        email: {
          identifier: 'email',
          rules: [{
            type: 'empty',
            prompt: '登录邮箱不为空'
          },
            {
              type: 'email',
              prompt: '请输入正确的邮箱地址'
            }]
        },
        password: {
          identifier: 'password',
          rules: [{
            type: 'empty',
            prompt: '请输入登录密码'
          }, {
            type: 'minLength[8]',
            prompt: '密码长度不小于{ruleValue}位'
          }]
        },
        repassword: {
          identifier: 'repassword',
          rules: [{
            type: 'empty',
            prompt: '请输入重复密码'
          }, {
            type: 'minLength[8]',
            prompt: '重复密码长度不小于{ruleValue}位'
          }]
        }
      },
      onSuccess: function () {
        $('#sendForm').addClass('loading');
      }
    });
  });
});
