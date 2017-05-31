// ==UserScript==
// @name        Echo HTML5 player
// @namespace   org.sorz.lab.unimelb.echo
// @include     https://content.lecture.unimelb.edu.au/ess/echo/presentation/*
// @version     1.1
// @grant       GM_addStyle
// @require     http://code.jquery.com/jquery-3.1.1.min.js
// ==/UserScript==
GM_addStyle(`
  body { background: black; color: gray; }
  a:link { color: gray; }
  video { max-width: 1280px; width: 100%; margin: 0 auto; display: block; }
  p { display: none; }
`);

unsafeWindow.stopCounting = true;
let link = $('a').attr('href');
$('body > div').prepend(`
<video controls>
  <source src="${link}" type="video/mp4">
</video>
`);