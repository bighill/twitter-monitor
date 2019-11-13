require("dotenv").config();
const Twitter = require("twitter");

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

//

const params = { track: "nodejs" };
const stream = client.stream("statuses/filter", params);

const errCb = err => console.log(err);

const dataCb = tweet => {
  if (!tweet.entities.hashtags.find(t => t.text === params.track)) return;

  const filtered = {
    created: tweet.created_at,
    text: tweet.text,
    hashtags: tweet.entities.hashtags
  };
  console.log(filtered);
};

stream.on("error", errCb);
stream.on("data", dataCb);
