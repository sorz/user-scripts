// ==UserScript==
// @name        Highlight high points post for HN
// @namespace   org.sorz.lab.hn
// @include     /^https://news.ycombinator.com/(news)?(\?p=\d+)?$/
// @version     2
// @grant       none
// ==/UserScript==

const MAX_POINTS = 800;

document.querySelectorAll('.score').forEach(elem => {
  const points = elem.textContent.match(/\d+/)[0];
  const line = elem.closest('tr').previousElementSibling;
  const title = line.querySelector('td.title:last-child');
  const score = Math.min(Math.round(points / MAX_POINTS * 100), 97);
  title.style = `
    background: linear-gradient(
      to right,
      #ddd 0%,
      #ddd ${score}%,
      rgba(0,0,0,0) ${score + 2}%,
      rgba(0,0,0,0) 100%
    );`;
});
