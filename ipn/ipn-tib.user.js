// ==UserScript==
// @name        IPN - Add Type is Beautiful episodes
// @namespace   org.sorz.lab.ipn
// @include     https://ipn.li/
// @include     http://ipn.li/
// @version     5
// @grant       GM_xmlhttpRequest
// @grant       GM_getResourceURL
// @grant       GM_addStyle
// @require     http://code.jquery.com/jquery-3.2.0.min.js
// @resource    logo http://www.typeisbeautiful.com/wp-content/uploads/2015/11/TypeChat-Cover-800px.jpg
// ==/UserScript==

const LIST_URL = "http://www.typeisbeautiful.com/category/podcast/";

GM_addStyle(`.tib { opacity: 0; }
             .tib-done { opacity: 1; transition: 0.2s; }`);

let $list = $('<li class="showList__item tib">')
  .append(`<a class="showList__item__head" href="${LIST_URL}">
          <img alt="字谈字畅" src="${GM_getResourceURL('logo')}">
          <div>字谈字畅</div></a>`)
  .appendTo('ul.showList');

GM_xmlhttpRequest({
  method: 'GET',
  url: LIST_URL,
  onload: function(resp) {
    let $page = $($.parseHTML(resp.response));
    let $eps = $page.find('.entry-title > a')
      .toArray().slice(0, 4)
      .map(t => [t.text.match(/(\d{3})：(.*)/).slice(1), t.href])
      .map(a => [parseInt(a[0][0]), a[0][1], a[1]])  // no, title, link
      .map(a => [a[0], $('<a>').text(a[1]).attr('href', a[2])])  // no, <a>
      .map(a => $('<li class="episodeList__item">').attr('value', a[0]).append(a[1]));
    $('<ol class="episodeList">').append($eps).appendTo($list);
    $list.addClass('tib-done');
  }
});
