var start = document.getElementById('start'),
  breaktime = document.getElementsByClassName('break');

var alert1 = function () {
  var ask = window.confirm('You have been working for 25 minutes. You should take a short break');
  if (ask === true) {
    window.open('breaktime', "Enjoy your break!");
    }
  // else {
  //   setTimeout(alert1,)
  // }
};

var alert2 = function () {
  alert('Back to work');
}

start.addEventListener('click', function() {
  setTimeout(alert1, 1500);
})

breaktime[0].addEventListener('click', function() {
  setTimeout(alert2, 150);
})
