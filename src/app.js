require('dotenv').config()

const Koa = require('koa')
const Router = require('koa-router')
const BodyParser = require('koa-bodyparser')

//const Config = require('./lib/config')
const InvoiceController = require('./controllers/invoice')
const PaymentPointerController = require('./controllers/payment-pointer')

class App {
  constructor (deps) {
    //this.config = deps(Config)
    this.koa = deps(Koa)
    this.router = deps(Router)

    this.paymentPointer = deps(PaymentPointerController)
    this.invoices = deps(InvoiceController)
  }

  async listen () {
    const app = this.koa
    const router = this.router

    await this.paymentPointer.init(router)
    //await this.invoices.init(router)

    app.use(BodyParser())
    app.use(router.routes())
    app.use(router.allowedMethods())

    const port = process.env.PORT || 1337;

    console.log(`listen on port ${port}`);
    app.listen(port)

  }
}

module.exports = App
