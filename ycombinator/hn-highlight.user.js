// ==UserScript==
// @name        Highlight high points post for HN
// @namespace   org.sorz.lab.hn
// @include     /^https://news.ycombinator.com/news(\?p=\d+)?$/
// @version     1
// @grant       none
// @require     https://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==

THRESHOLD = 100;

$(document).ready(function () {
  $('.score').each(function () {
    var $score = $(this);
    if ($score.text().match(/\d+/)[0] > THRESHOLD) {
      var $subtext = $score.closest('tr');
      var $title = $subtext.prev('tr');
      $title.css('background', 'lightgray');
    }
  });
});
