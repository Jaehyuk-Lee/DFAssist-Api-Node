const config = require('./config');

const express = require('express');
const app = express();
const webhook = require("webhook-discord");
const request = require("request");
const bodyParser = require('body-parser');
const axios = require('axios');

const Sentry = require('@sentry/node');
Sentry.init({ dsn: config.sentryDSN });

const Hook = new webhook.Webhook(config.discordWebHookUrl);
/* beta test */
const telegram_Hook = new webhook.Webhook("https://discordapp.com/api/webhooks/583288273888083988/aPXp27TwdV5V0A_91pBFpaASBpttwelVr1fd343IrGlzRmw7nVF8apCa--69Mn2pozhB");

const PORT = process.env.PORT || 3000;

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

  if (message) {
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
        /* beta test */
        const msg = new webhook.MessageBuilder()
          .setName("NotifyBot")
          .setText(message);
        try{
          telegram_Hook.send(msg);
        }
        catch (err) {
          Sentry.captureException(err);
        }
        /* beta test */
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
  let lang = req.query.lang || 'en-us';
  let hash = req.query.hash;

  if(!service || !type || !name || !user || !hash){
    res.end(config.localization['missing-info'][lang]);
    console.log("<GET data>\n" + (req.query || "GET-undefined"));
    Sentry.captureException(config.localization['missing-info'][lang]);
    return;
  }

  let message = config.localization[type][lang].replace("{0}", name);
  console.log(message);

  if (service == "discord"){
    if((user+"").length != 18){
      res.send(config.localization['wrong-discord-id'][lang]);
      console.log("user: " + (user || "user-undefined"));
      Sentry.captureException(config.localization['wrong-discord-id'][lang]);
      return;
    }
    const msg = new webhook.MessageBuilder()
      .setName("NotifyBot")
      .setText("<@!" + user + "> " + message);
    try{
      Hook.send(msg);
      res.send("0");
    }
    catch (err) {
      res.send(err);
      console.log(err);
      Sentry.captureException(err);
    }
  }
  else if  (service == "telegram"){
    request.get({uri:`https://api.telegram.org/bot${config.telegramApiKey}/sendMessage?chat_id=${user}&text=${encodeURIComponent(message)}`}, function (error, response, body) {
      let result = JSON.parse(body);
      if(result.ok)
        res.send("0");
      else{
        res.send(result.description);
        console.log(result);
        Sentry.captureException(result);
      }
    });
  }
  res.end();
});

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT + '!');
});