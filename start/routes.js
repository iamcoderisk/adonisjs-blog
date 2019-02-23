'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('home')
Route.get('/posts', 'PostController.index')
Route.post('/posts', 'PostController.store')
Route.get('/posts/add', 'PostController.add')
Route.get('/posts/edit/:id', 'PostController.edit')
Route.get('/post/:id', 'PostController.details')
Route.put('/posts/:id', 'PostController.update')
Route.delete('/posts/:id', 'PostController.destroy')

//register controller

Route.get('/register', 'Auth/RegisterController.showForm')
Route.post('/register', 'Auth/RegisterController.register')
Route.get('home', function () {
  return "You are logged in!";
})
Route.get('login', 'Auth/LoginController.showLogin')
Route.post('login', 'Auth/LoginController.login')
