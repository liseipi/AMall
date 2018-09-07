'use strict'

class AuthController {

    login({ view }) {
        return view.render('auth.login')
    }

    async InLogin({ request, response, auth, session }) {
        const { email, password } = request.post()
        try {
            const userInfo = await auth.attempt(email, password)
            if (userInfo.is_active != 1) {
                session.flash({
                    notification: {
                        title: 'Error',
                        type: 'warning',
                        message: '登录失败，邮箱地址未认证！'
                    }
                })
                await auth.logout()
                return response.redirect('back')
            }
            if (userInfo.user_status != 0) {
                session.flash({
                    notification: {
                        title: 'Error',
                        type: 'warning',
                        message: '登录失败，用户账号已暂停！'
                    }
                })
                await auth.logout()
                return response.redirect('back')
            }

            let saveData = {
                last_ip: userInfo.updated_ip,   //上次登录IP
                updated_ip: request.ip(),       //当前登录IP
                last_at: userInfo.updated_at,   //上次登录时间
                updated_at: new Date(),         //当前登录时间
                login_count: userInfo.login_count + 1
            }
            try {
                await User.query().where('ni_id', userInfo.ni_id).update(saveData)
            } catch (error) {
            }
            return response.redirect('/')
        } catch (error) {
            session.flash({
                notification: {
                    title: 'Error',
                    type: 'error',
                    message: '登录失败，用户名或密码错误！'
                }
            })
            return response.redirect('back')
        }
    }

    //退出
    async Logout({ response, session, auth }) {
        await auth.logout()
        session.clear()
        return response.redirect('/login')
    }

}

module.exports = AuthController
