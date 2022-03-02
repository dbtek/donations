
export default function paymentCbSuccess(req, res) {
  const amount = req.body['amount'];
  const name = req.body['tismi'];
  const recurringTimes = req.body['RecurringPaymentNumber'];
  const redirectTo = `/thanks?name=${name}&amount=${amount}${recurringTimes ? `&recurringTimes=${recurringTimes}` : ''}`;

  res.send(`
    <html>
      <head>
        <meta http-equiv="refresh" content="0; url=${redirectTo}" />
      </head>
      <body>Yönlendiriliyor...</body>
    </html>
  `)
}