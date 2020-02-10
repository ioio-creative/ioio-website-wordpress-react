jQuery(document).ready(function($) {

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Helper function for add element box list in WOW
  WOW.prototype.addBox = function(element) {
    this.boxes.push(element);
  };

  // Init WOW.js and get instance
  var wow = new WOW();
  wow.init();

  // Attach scrollSpy to .wow elements for detect view exit events,
  // then reset elements and add again for animation
  $('.wow').on('scrollSpy:exit', function() {
    $(this).css({'visibility': 'hidden', 'animation-name': 'none'}).removeClass('animated');
    wow.addBox(this);
  }).scrollSpy();

  $(window).scroll(function() {

    if ($(this).scrollTop() > 100) {
      $('#scroller').addClass('header-scrolled');
    } else {
      $('#scroller').removeClass('header-scrolled');
      /*
                  $('.wow').removeClass('animated');
                  $('.wow').removeAttr('style');
                  new WOW().init();
                  console.log($(this).scrollTop());
            */
    }
  });

  // Porfolio isotope and filter
  var portfolioIsotope = $('.portfolio-container').isotope({itemSelector: '.portfolio-item', layoutMode: 'fitRows'});

  $('#portfolio-flters li').on('click', function() {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    portfolioIsotope.isotope({filter: $(this).data('filter')});
  });


});
