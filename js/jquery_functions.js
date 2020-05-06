(function ($) {
  'use strict';

  /* Preloader */
  $(window).on('load', function () {
    var preloaderFadeOutTime = 500;
    function hidePreloader() {
      var preloader = $('.spinner-wrapper');
      setTimeout(function () {
        preloader.fadeOut(preloaderFadeOutTime);
      }, 500);
    }
    hidePreloader();
  });

  /* Navbar Scripts */
  // jQuery to collapse the navbar on scroll
  $(window).on('scroll load', function () {
    if ($('.navbar').offset().top > 60) {
      $('.fixed-top').addClass('top-nav-collapse');
    } else {
      $('.fixed-top').removeClass('top-nav-collapse');
    }
  });

  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $(function () {
    $(document).on('click', 'a.page-scroll', function (event) {
      var $anchor = $(this);
      $('html, body')
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr('href')).offset().top,
          },
          600,
          'easeInOutExpo'
        );
      event.preventDefault();
    });
  });

  // closes the responsive menu on menu item click
  $('.navbar-nav li a').on('click', function (event) {
    if (!$(this).parent().hasClass('dropdown'))
      $('.navbar-collapse').collapse('hide');
  });

  /* Move Form Fields Label When User Types */
  // for input and textarea fields
  $('input, textarea').keyup(function () {
    if ($(this).val() != '') {
      $(this).addClass('notEmpty');
    } else {
      $(this).removeClass('notEmpty');
    }
  });

  /* Back To Top Button */
  // create the back to top button
  $('body').prepend(
    '<a href="body" class="back-to-top page-scroll">Back to Top</a>'
  );
  var amountScrolled = 700;
  $(window).scroll(function () {
    if ($(window).scrollTop() > amountScrolled) {
      $('a.back-to-top').fadeIn('500');
    } else {
      $('a.back-to-top').fadeOut('500');
    }
  });

  /* Removes Long Focus On Buttons */
  $('.button, a, button').mouseup(function () {
    $(this).blur();
  });

  /* Call upload file when click on UPLOAD button */
  $("button[id='image_upload']").click(function () {
    $("input[id='image_file']").click();
  });
})(jQuery);
