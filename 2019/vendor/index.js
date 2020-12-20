$(document).ready(function () {
  // Site menu/nav
  $('.site-header__menu-button').click(function () {
    $("body").toggleClass("nav-is-open");
    $(this).toggleClass("site-header__menu-button--open");
  });

  // close nav once a link is clicked
  $('.site-nav a').click(function () {
    $("body").removeClass("nav-is-open");
  });

  // Escape key closes nav
  $(document).keyup(function (e) {
    if (e.keyCode == 27) {
      $("body").removeClass("nav-is-open");
    }
  });

  // open/close footnotes
  $('.footnote-anchor').on('click', function (e) {
    e.preventDefault(); // stop browser from following href
    var target = $(this).attr('href');
    $(".footnote").not(target).removeClass("js-footnote--active");
    $(".footnote-anchor").not(this).removeClass("js-footnote-anchor--active");
    $(this).toggleClass('js-footnote-anchor--active');
    $(target).toggleClass('js-footnote--active');
  })

  // on mobile, close footnote on scroll
  $(window).scroll(function () {
    if ($(window).width() < 768) {
      $(".footnote").removeClass("js-footnote--active");
      $(".footnote-anchor").removeClass("js-footnote-anchor--active");
    }
  });

  // add "visible" class to home page intro as soon as the doc loads
  $('.page-title--home, .hero__artwork--home, .article--homepage-intro').addClass('js-inview--visible');


  // // add "visible" class to other elements when they enter the viewport, via IntersectionObserver
  const items = document.querySelectorAll('.js-inview');
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        entry.target.classList.add('js-inview--visible');
        observer.unobserve(entry.target);
      }
    });
  });

  items.forEach(item => {
    observer.observe(item);
  });

});
