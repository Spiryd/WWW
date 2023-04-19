const hamburger = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.top-menu');

hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('active');
  menu.classList.toggle('active');
});
