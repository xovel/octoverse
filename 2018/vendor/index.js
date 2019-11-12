$(document).ready(function() {
  // MOBILE NAV
  $('.nav-button').click(function () {
    // Open nav
    if ($('.nav').is(':hidden')) {
      $('.nav-button').addClass('js-navOpen');
      $('.nav').slideDown(400);

    // Close nav
    } else {
      $('.nav-button').removeClass('js-navOpen');
      $('.nav').slideUp(400);
    }
  });

  // On mobile, close nav if clicking on a section link on the page user is already on
  // i.e. On People page and click link to Location section, mobile nav should close
  function closeMobileNavForSamePageLinks() {
    $('.nav-sectionlink').click(function() {
      var clickedLink = $(this).attr("href");
      var currentPage = window.location.pathname;
      if (clickedLink.includes(currentPage)) {
        $('.nav-button').removeClass('js-navOpen');
        $('.nav').slideUp(400);
      }
    });
  }

  function checkMobileNav() {
    var vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (vw < 1012) {
      closeMobileNavForSamePageLinks();
    }
  }
  checkMobileNav();

  // DESKTOP NAV
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;

  checkDesktopNavScroll();

  // ** Function calls checkDesktopNavScroll() again if window is resized
  $(window).resize(function() {
    checkDesktopNavScroll();
    checkMobileNav();
  });

  // ** Function checks if we need to call hasScrolled()
  // Helps to not call the function every pixel scrolled
  function checkDesktopNavScroll() {
    var vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    // Only check scroll event on desktop
    if (vw >= 1012) {
      // show nav initially when page loads
      $('.nav').removeClass('nav-up').addClass('nav-down');

      $(window).scroll(function(event){
        didScroll = true;
      });

      setInterval(function() {
        if (didScroll) {
          hasScrolled();
          didScroll = false;
        }
      }, 250);
    }
  };

  // ** Function adds/removes classes to show/hide desktop nav
  // This only expands the nav "half way" with .nav-down
  function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
      return;

    if (st > lastScrollTop){
      // Scroll Down
      $('.nav').removeClass('nav-down nav-allDown').addClass('nav-up');
    } else {
      // Scroll Up
      if(st + $(window).height() < $(document).height()) {
          $('.nav').removeClass('nav-up').addClass('nav-down');
      }
    }
    lastScrollTop = st;
  }

  // ** Function expands the nav "all of the way" on hover on desktop
  $('.nav-wrapper').hover(function() {
    var vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if(vw >= 1012) {
      $('.nav').removeClass('nav-up').addClass('nav-allDown');
    }
  }, function() {
    var vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if(vw >= 1012) {
      $('.nav').removeClass('nav-allDown');
    }
  });
});
