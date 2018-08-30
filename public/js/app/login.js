require(['main'], function () {
  require(['semantic'], function () {
    $(function () {
      $('form').form({
        inline: true,
        on: 'blur',
        fields: {
          email: {
            identifier: 'email',
            rules: [{
              type: 'empty',
              prompt: '请输入登录邮箱'
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
          }
        }
      });
    });
  });
});
