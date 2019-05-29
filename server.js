const config = require('./config');

//const Twit = require('twit');
const express = require('express');
const app = express();
const webhook = require("webhook-discord");
const request = require("request");
var bodyParser = require('body-parser');
const axios = require('axios');

const Hook = new webhook.Webhook(config.discordWebHookUrl);

const PORT = process.env.PORT || 3000;

/*const T = new Twit({
  consumer_key:         config.twitter.consumer_key,
  consumer_secret:      config.twitter.consumer_secret,
  access_token:         config.twitter.access_token,
  access_token_secret:  config.twitter.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
});*/

app.use(bodyParser.json()) // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true
  })
) // for parsing application/x-www-form-urlencoded

//This is the route the API will call
app.post('/new-message', function(req, res) {
  const { message } = req.body;

  //Each message contains "text" and a "chat" object, which has an "id" which is the chat id

  if (!message) {
    axios.post(
        `https://api.telegram.org/bot${config.telegramApiKey}/sendMessage`,
        {
          chat_id: message.chat.id,
          text: 'Your Telegram Chat ID : ' + message.chat.id
        }
      )
      .then(response => {
        // We get here if the message was successfully posted
        console.log('Message posted')
        res.end('ok')
      })
      .catch(err => {
        // ...and here if it was not
        console.log('Error :', err)
        res.end('Error :' + err)
      })
    // In case a message is not present, or if our message does not have the word marco in it, do nothing and return an empty response
  }

  // If we've gotten this far, it means that we have received a message containing the word "marco".
  // Respond by hitting the telegram bot API and responding to the approprite chat_id with the word "Polo!!"
  // Remember to use your own API toked instead of the one below  "https://api.telegram.org/bot<your_api_token>/sendMessage"
  return res.end()
})

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
  if (service == "telegram_chat_id"){
    request.get({uri:`https://api.telegram.org/bot${config.telegramApiKey}/getUpdates`}, function (error, response, body) {
      let result = JSON.parse(body);
      res.send(result);
    });
    return;
  }

  if(type === "" || name === "" || user === "" || lang === "" || hash === ""){
    res.send(": " + config.localization['missing-info'][lang]);
    return;
  }

  let message = " " + config.localization[type][lang].replace("{0}", name);
  console.log(message);
  if(service == "twitter"){
    res.send(": no more tweet alarm support");
    /*T.post('statuses/update', { status: "@" + user + message + " (" + hash.substring(0, 5) + ")" }, function(err, data, response) {
      console.log(data);
      if(data.created_at != "")
        res.send("0");
      else if(data.errors.length != 0)
        res.send("1");
    });*/
  }
  else if (service == "discord"){
    if((user+"").length != 18){
      res.send(": " + config.localization['wrong-discord-id'][lang]);
      return;
    }
    const msg = new webhook.MessageBuilder()
      .setName("NotifyBot")
      .setText("<@!" + user + ">" + message);
    try{
      Hook.send(msg);
      res.send("0");
    }
    catch (err) {
      res.send(": " + err);
    }
  }
  else if  (service == "telegram"){
    request.get({uri:`https://api.telegram.org/bot${config.telegramApiKey}/sendMessage?chat_id=${user}&text=${encodeURIComponent(message)}`}, function (error, response, body) {
      let result = JSON.parse(body);
      if(result.ok)
        res.send("0");
      else
        res.send(": " + result.description);
    });
  }
});

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT + '!');
});