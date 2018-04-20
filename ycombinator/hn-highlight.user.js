// ==UserScript==
// @name        Highlight high points post for HN
// @namespace   org.sorz.lab.hn
// @include     /^https://news.ycombinator.com/(news)?(\?p=\d+)?$/
// @version     4
// @grant       none
// ==/UserScript==

const THRESHOLD = 200;
const SCALE = 50;

const sigmoid = t =>  1 / (1 + Math.exp(-t));

document.querySelectorAll('.score').forEach(elem => {
  const points = elem.textContent.match(/\d+/)[0];
  const line = elem.closest('tr').previousElementSibling;
  const title = line.querySelector('td.title:last-child');
  const score = sigmoid((points - THRESHOLD) / SCALE) * 100;
  const percent = Math.min(score, 98);
  title.style = `
    background: linear-gradient(
      to right,
      #ddd 0%,
      #ddd ${percent}%,
      rgba(0,0,0,0) ${percent + 2}%,
      rgba(0,0,0,0) 100%
    );`;
});
