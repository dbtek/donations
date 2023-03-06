
export default function paymentGW(req, res) {
  const errorMessage = [
    req.body['mdErrorMsg'], req.body['EXTRA.HOSTMSG'], req.body['ErrMsg'],
    // sipay
    req.body['error_code'], req.body['error'],
  ].filter(m => Boolean(m)).join(' - ');
  const name = req.body['tismi'];
  const redirectTo = `/fail?name=${name}&message=${errorMessage}`;

  res.send(`
    <html>
      <head>
        <meta http-equiv="refresh" content="0; url=${redirectTo}" />
      </head>
      <body>Yönlendiriliyor...</body>
    </html>
  `)
}