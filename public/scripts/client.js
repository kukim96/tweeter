/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function(tweetsDatabase) {
    for (const tweet of tweetsDatabase) {
      $('.tweet-container').append(createTweetElement(tweet));
    }
  }

  const createTweetElement = function(tweetData) {
    const $tweet = $('<article>').addClass('tweet');
    const daysSinceTweet = (Date.now() - tweetData.created_at) / 86400000;

    const htmlContent = `
    <div>
      <img src=${tweetData.user.avatars} alt="${tweetData.user.handle}-avatar">
    <div> 
      <span>${tweetData.user.name}</span>
      <span>${tweetData.user.handle}</span>
    </div>
    </div>
    <p>${tweetData.content.text}</p>
    <footer>
      ${Math.round(daysSinceTweet)} days ago
      <span>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </span>
    </footer>
  `;
  let tweetElement = $tweet.append(htmlContent);
  return tweetElement;
  };


  renderTweets(data);
});

