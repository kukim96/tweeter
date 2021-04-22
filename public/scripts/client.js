/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // event listener and prevent default 
  $('.new-tweet form').submit(function(event) {
    event.preventDefault();
    
    const newTweetText = $(this).children('textarea').val();
    const $errorMessage = $(this).children('h4');

    $errorMessage.hide();

    if (!newTweetText) {
      $('.tweet-error').text('Please enter in a text!');
      $errorMessage.slideDown(300);
    } else if (newTweetText.length > 140) {
      $('.tweet-error').text('Please make your tweet under 140 characters!');
      $errorMessage.slideDown(300);
    } else {
      // ajax post
      $.ajax('/tweets', {
        data: $(this).serialize(),
        method: 'POST',
        success: function() {
          loadTweets();
          $('#tweet-text').val('');
          $("#tweet-text").parent().find("output").text('140')
        },
        error: (data, text, error) => console.error(error)
    })
   } 
  })
  
  // load new tweets
  const loadTweets = function() {
    $.ajax('/tweets', {
      method: 'GET',
      dataType: 'JSON'
    })
    .then(function(tweets) {
      renderTweets(tweets)
    })
    .catch(function(error) {
      console.error(error)
    })
  }
  loadTweets();

  const renderTweets = function(tweetsDatabase) {
    $('.tweet-container').empty();
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
      <span>${tweetData.user.name}</span>
    </div>
    <div1>  
      <span>${tweetData.user.handle}</span>
    </div1>
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

});

