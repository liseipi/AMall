require(['main'], function () {
  require(['semantic'], function () {
    //头像选择
    $('.ui.ev_dropdown').dropdown();

    //注册验证表单
    if(page=='add'){
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
    }

    //选择权限
    $("#user_role").change(function () {
      var roleOption = $(this).val();
      $(".selMenu input[type='checkbox']").prop("checked", false).prop("disabled", false);
      if(roleOption>0){
        for(var r in roles){
          if(roles[r].ni_id==roleOption){
            //console.log(roles[r].menus)
            //$(".selMenu input[type='checkbox']").prop("disabled", false);
            for(var m in roles[r].menus){
              //console.log(roles[r].menus[m].ni_id)
              if($(".selMenu input[value="+ roles[r].menus[m].ni_id +"]")){
                $(".selMenu input[value="+ roles[r].menus[m].ni_id +"]").prop("checked", true).prop("disabled", true);
              }
            }
          }
        }
      }

      if(menus.length>0){
        $(".selMenu input[type='checkbox']").each(function (i) {
          if(menus.indexOf(parseInt($(this).val()))>=0){
            $(this).prop("checked", true)
          }
        })
      }

    })

    //编辑时 默认点击
    $('#user_role').trigger("change");
    if(menus.length>0){
      $(".selMenu input[type='checkbox']").each(function (i) {
        if(menus.indexOf(parseInt($(this).val()))>=0){
          $(this).prop("checked", true)
        }
      })
    }

  });
});
