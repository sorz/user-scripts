// ==UserScript==
// @name        Auto light/dark switch for TweetDeck
// @namespace   Violentmonkey Scripts
// @match       https://tweetdeck.twitter.com/
// @grant       none
// @inject-into content
// @version     1.0
// ==/UserScript==

const PREFERS_LIGHT = "(prefers-color-scheme: light)";
const PREFERS_DARK = "(prefers-color-scheme: dark)";

function handleMediaChange(mediaQueryList) {
  if (!mediaQueryList.matches) return;
  const classes = document.children[0].classList;
  if (mediaQueryList.media === PREFERS_LIGHT) {
    classes.remove("dark");
  } else if (mediaQueryList.media === PREFERS_DARK) {
    classes.add("dark");
  }
}

window.addEventListener("DOMContentLoaded", (event) => {
  [PREFERS_LIGHT, PREFERS_DARK].forEach((query) => {
    const media = window.matchMedia(query);
    media.addListener(handleMediaChange);
    handleMediaChange(media);
  })
});

