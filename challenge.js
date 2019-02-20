let paused = false;
let likes = {};

function counter(num = undefined) {
  const counter = document.querySelector('#counter');
  let count = parseInt(counter.innerText);

  if (typeof num !== 'undefined') {
    if (num === '+') {
      count++;
    } else if (num === '-') {
      count--;
    } else {
      count = num;
    }
    counter.innerText = count;
  }

  return count
}

function updateTimer() {
  if (!paused) counter('+');
}

function handleIncrement(evt) {
  counter('+');
}

function handleDecrement(evt) {
  counter('-');
}

function handleLike(evt) {
  const num = counter();
  likeNum(num);
  displayLike(num);
}

function handlePause(evt) {
  toggleGameplay();
}

function handleComment(evt) {
  evt.preventDefault();
  const input = document.querySelector('#comment-form input[type=text]');
  submitComment(input.value);
  input.value = '';
}

function likeNum(num) {
  if (!(num in likes)) {
    likes[num] = 1;
  } else {
    likes[num]++;
  }
}

function displayLike(num) {
  const li = document.createElement('li');
  li.innerText = `${num} has been liked ${likes[num]} time(s)`;
  document.querySelector('.likes').appendChild(li);
}

function toggleGameplay() {
  paused = !paused;
  document.querySelectorAll('button:not(#pause)').forEach(b => b.disabled = paused)
  document.querySelector('#pause').innerText = paused ? 'resume' : 'pause';
}

function submitComment(text) {
  const comment = document.createElement('p');
  comment.innerText = text;
  document.querySelector('#list.comments').appendChild(comment);
}

function main() {
  setInterval(updateTimer, 1000);

  document.getElementById('-').addEventListener('click', handleDecrement);
  document.getElementById('+').addEventListener('click', handleIncrement);
  document.getElementById('<3').addEventListener('click', handleLike);

  document.getElementById('pause').addEventListener('click', handlePause);
  document.getElementById('comment-form').addEventListener('submit', handleComment);
}

main();