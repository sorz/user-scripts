// ==UserScript==
// @name        HD Avatar for Tweetdeck
// @namespace   org.sorz.lab.tweetdeck
// @include     https://tweetdeck.twitter.com/
// @version     0.1
// @grant       none
// @require     https://cdn.rawgit.com/jpillora/xhook/1.3.5/dist/xhook.min.js
// ==/UserScript==

const REGEX_AVATAR_URL = /(\/profile_images\\\/\d+\\\/[\w-]+_)(normal)(\.)/g
const NEW_SIZE = 'bigger';

xhook.after((request, response) => {
  if (request.url.match(/\/\w+\.json/)) {
    response.text = response.text.replace(REGEX_AVATAR_URL, `$1${NEW_SIZE}$3`);
  }
});
