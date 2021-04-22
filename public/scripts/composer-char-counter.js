$(document).ready(function() {
  
  // updating number of characters after input
  $("#tweet-text").on("keyup", function() {
    const numOfChar = $("#tweet-text").val();
    console.log(numOfChar, numOfChar.length);

    const tweetLength = 140 - numOfChar.length;
    $("#tweet-text").parent().find("output").val(tweetLength);


    if (tweetLength < 0) {
      $("#tweet-text").parent().find('output').addClass('over-char-limit');
    } else {
      $("#tweet-text").parent().find('output').removeClass('over-char-limit');
    }
  });
});