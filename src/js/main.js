'use strict';
(function () {
  var burger = document.querySelector('.burger');

  burger.addEventListener('click', function() {
    if (burger.classList.contains('burger--closed')) {
      burger.classList.remove('burger--closed');
    } else {
      burger.classList.add('burger--closed');
    }
  });


  var sidebar = document.querySelector('.sidebar');

  sidebar.classList.remove('sidebar--nojs');

  burger.addEventListener('click', function() {
    if (sidebar.classList.contains('sidebar--opened')) {
      sidebar.classList.remove('sidebar--opened');
      sidebar.classList.add('sidebar--closed');
    } else {
      sidebar.classList.add('sidebar--opened');
      sidebar.classList.remove('sidebar--closed');
    }
  });
})();
