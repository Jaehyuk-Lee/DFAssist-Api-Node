var Twit = require('twit');
var express = require('express');
var app = express();

const PORT = process.env.PORT || 3000;

var T = new Twit({
  consumer_key:         'jo2B51c4tclG7y3QPSJCmdIlT',
  consumer_secret:      'rX8e8mNnDl2T1LqbJJ25ki1LPPrSKal57FNWGJ3UKDENcKzUQB',
  access_token:         '1106925839290032128-N5AM43Q88vp8KJzukhLzD01zCPXCEv',
  access_token_secret:  '5ClHjc8VCeQn9W2qnw3yEEWbihpM35JuHMmBhkPT7amyN',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
});

app.get("/", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 
  'Content-Type, Authorization, Content-Length, X-Requested-With');


  let m = req.query.m;
  let u = req.query.u;
  
  let message = "@" + u + " " + m;
  T.post('statuses/update', { status: message }, function(err, data, response) {
    console.log(data)
    if(data.created_at != "")
      res.send("0");
    else
      res.send("1");
  });

});

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT + '!');
});