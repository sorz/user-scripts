// ==UserScript==
// @name        IPN - Show list order & filter
// @namespace   org.sorz.lab.ipn
// @include     https://ipn.li/
// @version     1
// @grant       none
// @require     http://code.jquery.com/jquery-3.2.0.slim.min.js
// ==/UserScript==

const FILTERS = new Set([
  //'xuanmei/',
  //'itgonglun/',
]);
let link = (i) => $(i).children('a').attr('href');             
let items = $('.showList > li').toArray()
   .sort((a, b) => link(a) > link(b) ? 1 : -1)
   .filter((i) => !FILTERS.has(link(i)));
$('.showList').empty().append(items);
