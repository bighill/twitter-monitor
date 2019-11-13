require("dotenv").config();
const Twitter = require("twitter");

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

//

const params = { screen_name: "nodejs" };

const cb = (error, tweets, response) => {
  if (error) return console.log(error);

  const filtered = tweets.map(t => ({ created: t.created_at, text: t.text }));
  console.log(filtered);
};

client.get("statuses/user_timeline", params, cb);
