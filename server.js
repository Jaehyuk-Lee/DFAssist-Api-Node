const config = require('./config');

const Twit = require('twit');
const express = require('express');
const app = express();
const webhook = require("webhook-discord");

const Hook = new webhook.Webhook(config.discordWebHookUrl);

const PORT = process.env.PORT || 3000;

const T = new Twit({
  consumer_key:         config.twitter.consumer_key,
  consumer_secret:      config.twitter.consumer_secret,
  access_token:         config.twitter.access_token,
  access_token_secret:  config.twitter.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
});

app.get("/", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers', 
  'Content-Type, Authorization, Content-Length, X-Requested-With');


  let service = req.query.service;
  let type = req.query.type;
  let name = req.query.name;
  let user = req.query.user;
  let lang = req.query.lang;
  let hash = req.query.hash;

  if(type === "" || name === "" || user === "" || lang === "" || hash === ""){
    res.send("1");
    return;
  }

  let message = " " + config.localization[type][lang].replace("{0}", name);
  console.log(message);
  if(service == "twitter"){
    T.post('statuses/update', { status: "@" + user + message + " (" + hash.substring(0, 5) + ")" }, function(err, data, response) {
      console.log(data);
      if(data.created_at != "")
        res.send("0");
      else if(data.errors.length != 0)
        res.send("1");
    });
  }
  else if (service == "discord"){
    if((user+"").length != 18){
      res.send("1");
      return;
    }
    const msg = new webhook.MessageBuilder()
      .setName("NotifyBot")
      .setText("<@!" + user + ">" + message);
    try{
      Hook.send(msg);
      res.send("0");
    }
    catch{
      res.send("1");
    }
  }
});

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT + '!');
});