var Twit = require('twit')

var T = new Twit({
  consumer_key:         'jo2B51c4tclG7y3QPSJCmdIlT',
  consumer_secret:      'rX8e8mNnDl2T1LqbJJ25ki1LPPrSKal57FNWGJ3UKDENcKzUQB',
  access_token:         '1106925839290032128-N5AM43Q88vp8KJzukhLzD01zCPXCEv',
  access_token_secret:  '5ClHjc8VCeQn9W2qnw3yEEWbihpM35JuHMmBhkPT7amyN',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
});

T.post('statuses/update', { status: 'This is test Tweet!' }, function(err, data, response) {
  console.log(data)
})