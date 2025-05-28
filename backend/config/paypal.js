// config/paypal.js
import checkoutNodeJssdk from '@paypal/checkout-server-sdk'

const Environment = process.env.NODE_ENV === 'production'
  ? checkoutNodeJssdk.core.LiveEnvironment
  : checkoutNodeJssdk.core.SandboxEnvironment

const paypalClient = () => {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET
  const environment = new Environment(clientId, clientSecret)
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment)
}

export default paypalClient
