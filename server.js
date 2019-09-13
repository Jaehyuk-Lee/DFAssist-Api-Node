const config = require('./config');

const express = require('express');
const app = express();
const app2 = express();
const webhook = require("webhook-discord");
const request = require("request");
const bodyParser = require('body-parser');
const axios = require('axios');

const Discord = require('discord.js');
const client = new Discord.Client();

const Sentry = require('@sentry/node');
Sentry.init({ dsn: config.sentryDSN });

const Hook = new webhook.Webhook(config.discordWebHookUrl);

const PORT = process.env.PORT || 3000;

// 디스코드 ID 알려주는 봇
client.on('ready', () => { console.log(`Logged in as ${client.user.tag}!`); });
client.on('message', msg => {
  if (msg.content === '!id') {
    msg.reply(`Your ID: ${msg.author.id}`);
    // 디스코드 ID가 18자리를 넘는 경우 Sentry에 기록. (발생 시 프로그램 업데이트 필요)
    if((""+msg.author.id).length > 18){
      console.log(msg.author.id);
      Sentry.captureException();
    }
  }
});
client.login(config.discordAPIKey);

app2.use(express.static(__dirname + '/public'));

app2.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});

app.use(bodyParser.json()) // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true
  })
) // for parsing application/x-www-form-urlencoded

app.get('/test-heartbeat', function(req, res) {
  res.status(200).end();
});

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
        console.log('Message posted');
        res.end('ok')
      })
      .catch(err => {
        // ...and here if it was not
        res.end('Error :' + err);
        console.log('Error :', err);
        Sentry.captureException(err);
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


  // 비번 걸고 싶을 떄 풀면 됨
  /*
  if(req.query.password != config.serverPassword)
  {
    Sentry.captureException('비밀번호 틀림');
    return;
  }
  */

  let service = req.query.service;
  let type = req.query.type;
  let name = req.query.name;
  let user = req.query.user;
  let lang = req.query.lang || 'en-us';

  if(!service || !type || !name || !user /*|| !password*/){
    res.end(config.localization[lang]['missing-info']);
    console.log("<GET data>\n" + JSON.stringify(req.query));
    Sentry.captureException(config.localization[lang]['missing-info']);
    return;
  }

  let message = config.localization[lang][type].replace("{0}", name);
  console.log(message);

  if (service == "discord"){
    if(!/^[0-9]{15}/.test(user)){
      res.send(config.localization[lang]['wrong-discord-id']);
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
        console.log(body);
        Sentry.captureException(result);
      }
    });
  }
});

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT + '!');
});