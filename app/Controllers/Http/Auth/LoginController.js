'use strict'
const User = use("App/Models/User")
const Hash = use('Hash')
class LoginController {
  async showLogin({
    view
  }) {
    return view.render('auth.login')
  }
  async login({
    request,
    response,
    session,
    auth
  }) {
    const {
      email,
      password,
      remember
    } = request.all()
    const user = await User.query().where('email', email).first()

    if (user) {
      const passwordVerified = await Hash.verify(password, user.password)
      //   console.log(passwordVerified)
      if (passwordVerified) {
        // await auth.remember(!!remember).login()
        await auth.attempt(email, password)
        return response.route('home')
      }
    }
    //display error message
    session.flash({
      notification: {
        type: 'danger',
        message: 'We could not verify your email address'
      }
    })
  }
}

module.exports = LoginController
