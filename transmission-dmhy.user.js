// ==UserScript==
// @name        Transmission-DMHY
// @namespace   org.sorz.lab.transmission-dmhy
// @include     https://*/transmission/web/*
// @version     1
// @grant       GM_xmlhttpRequest
// @require     http://code.jquery.com/jquery-3.2.0.slim.min.js
// ==/UserScript==

if (!unsafeWindow.Transmission)
  return;

let jquery = jQuery;
jQuery.noConflict(true);
let $ = jquery;

const ICON = 'https://share.dmhy.org/favicon.ico';
const DMHY_URL_PATTERN = /^https?:\/\/share.dmhy.org\/topics\/view\/\w+\.html$/;

$().ready(() => {
  // add button
  $('<div id="toolbar-separator">').appendTo('#toolbar');
  let $btn = $('<div id="toolbar-dmhy" title="Add from dmhy.org">');
  $btn.css('background', `url('${ICON}') center no-repeat`);
  $btn.css('background-size', '25px 25px');
  $btn.appendTo('#toolbar');
  $btn.click(dmhyButtonClicked);
  
  function uploadTorrentFile(confirmed) {
    const args = cloneInto([confirmed], unsafeWindow);
    if (!confirmed)
      return unsafeWindow.Transmission.prototype.uploadTorrentFile.apply(this, args);
    const url = $('#torrent_upload_url').val().trim();
    if (url.match(DMHY_URL_PATTERN))
      torrentFromDmhyThread(url, torrentUrl => fetchAsBase64(torrentUrl, uploadTorrentFileBase64));
    else
      return unsafeWindow.Transmission.prototype.uploadTorrentFile.apply(this, args);
  }
  unsafeWindow.transmission.uploadTorrentFile = exportFunction(uploadTorrentFile, unsafeWindow);
});



function dmhyButtonClicked() {
  let threadUrl = prompt("Please type thread URL", "");
  if (threadUrl == null)
    return;
  torrentFromDmhyThread(threadUrl, (torrentUrl) => {
    fetchAsBase64(torrentUrl, uploadTorrentFileBase64);
  });
}

function torrentFromDmhyThread(threadUrl, callback) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: threadUrl,
    onerror: () => {alert(`Failed to load page ${threadUrl}.`);},
    onload: (resp) => {
      let html = $.parseHTML(resp.responseText);
      let page = $(html);
      let url = page.find('#tabs-1').find('a').first().attr('href');
      console.log('Torrent URL: ' + url);
      if (!url)
        alert(`Cannot fount torrent on page ${threadUrl}.`);
      else
        callback('https:' + url);
  }});
}

function fetchAsBase64(url, callback) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    binary: true,
    responseType: 'blob',
    onerror: () => {
      alert(`Failed to downlaod file ${threadUrl}.`);
    },
    onload: (resp) => {
      console.log('Downloaded file size:' + resp.response.size);
      let reader = new FileReader();
      reader.onload = (e) => {
        let contents = e.target.result;
        let key = "base64,";
        let index = contents.indexOf(key);
        if (index > -1)
          callback(contents.substring(index + key.length));
        else
          alert('Failed to encode torrent file.');
      };
      reader.readAsDataURL(resp.response);
    }
  });
}

function uploadTorrentFileBase64(torrent) {  
  let options = {
    'method': 'torrent-add',
     arguments: {
       'paused': false,
       'download-dir': $('input#add-dialog-folder-input').val(),
       'metainfo': torrent
     }
  };  
  let callback = (resp) => {
    if (resp.result != 'success')
      alert('Failed to upload torrent: ' + resp.result);
  };
  let clonedOptions = cloneInto(options, unsafeWindow);
  let exportedCallback = exportFunction(callback, unsafeWindow);
  unsafeWindow.transmission.remote.sendRequest(clonedOptions, exportedCallback);
}