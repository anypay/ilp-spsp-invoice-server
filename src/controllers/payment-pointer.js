const InvoiceModel = require('../models/invoice')
//const Receiver = require('../lib/receiver')
const { v4 } = require('uuid');

const http = require('superagent');

class PaymentPointerController {
  constructor (deps) {
    this.invoices = deps(InvoiceModel)
    //this.receiver = deps(Receiver)
  }

  async init (router) {
    //await this.receiver.listen()

    router.get('/:invoice_id', async ctx => {
      if (ctx.get('Accept').indexOf('application/spsp+json') === -1) {
        return ctx.throw(404)
      }

      const invoice = await http.get(`https://api.anypay.global/invoices/${ctx.params.invoice_id}`);

      if (!invoice) {
        return ctx.throw(404, 'Invoice not found')
      }

      const sharedSecret = v1();

      const segments = destinationAccount.split('.')
      const resultAccount = segments.slice(0, -2).join('.') +
        '.' + ctx.params.invoice_id +
        '.' + segments.slice(-2).join('.')

      ctx.set('Content-Type', 'application/spsp+json')
      ctx.body = {
        destination_account: invoice.address,
        shared_secret: sharedSecret,
        balance: {
          current: invoice.status === 'unpaid' ? '0' : String(invoice.amount_paid),
          maximum: String(invoice.amount)
        },
        receiver_info: {
          reason: invoice.reason
        }
      }
    })
  }
}

module.exports = PaymentPointerController
