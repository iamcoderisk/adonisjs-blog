'use strict'
const {
  validate
} = use('Validator')

const User = use('App/Models/User')
const randomString = require('random-string')
const Mail = use('Mail')
class RegisterController {
  async showForm({
    view
  }) {
    return view.render('auth.register')
  }
  async register({
    request,
    session,
    response
  }) {
    const validation = await validate(request.all(), {
      username: 'required|unique:users,username',
      email: 'required|email|unique:users,email',
      password: 'required'
    })
    if (validation.fails()) {
      session.withErrors(validation.messages()).flashExcept(['password'])
      return response.redirect('back')
    }

    const user = await User.create({
      username: request.input('username'),
      email: request.input('email'),
      password: request.input('password')
      //   confirmation_token: randomString({
      //     length: 40
      //   })
    })
    await Mail.send('auth.emails.confirm_email', user.toJSON(), message => {
      message.to(user.email)
        .from('hello@princedarlington.com')
        .subject('Welcome to The Team')

    })
    session.flash({
      notification: {
        type: 'success',
        message: 'Registration succesful'
      }
    })
    return response.redirect('back')
    //validation form input
    //create the user
    //send confirmation email
    //display success message

  }
}

module.exports = RegisterController
