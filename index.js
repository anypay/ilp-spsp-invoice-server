'use strict'

const reduct = require('reduct')
const App = require('./src/app')

if (require.main === module) {

  console.log('reduct app');

  const app = reduct()(App)

  console.log('got app', app);

  app.listen()



} else {
  module.exports = {
    App
  }
}
