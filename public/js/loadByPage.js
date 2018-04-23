//jQuery(document).ready(function($) {
  console.log("reloadJS Loaded")
  reloadJS()
function reloadJS() {

//  trying()
//  function trying() {



  //  if (!$(".carousel-item").size() && !$(".portfolio-item").size() && !$('.section-bg').size()) {
  //    console.log("wait for dom")
  //    window.requestAnimationFrame(trying);
  //  } else {
      console.log("DOM OK!")
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

      // Intro carousel
      var introCarousel = $(".carousel");
      var introCarouselIndicators = $(".carousel-indicators");
      introCarousel.find(".carousel-inner").children(".carousel-item").each(function(index) {
        (index === 0)
          ? introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "' class='active'></li>")
          : introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "'></li>");

        //  $(this).css("background-image", "url('" + $(this).children('.carousel-background').children('img').attr('src') + "')");
        //  $(this).children('.carousel-background').remove();
      });

      $(".carousel").swipe({
        swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
          if (direction == 'left')
            $(this).carousel('next');
          if (direction == 'right')
            $(this).carousel('prev');
          }
        ,
        allowPageScroll: "vertical"
      });

      // Porfolio isotope and filter
      var portfolioIsotope = $('.portfolio-container').isotope({itemSelector: '.portfolio-item', layoutMode: 'fitRows'});

      $('#portfolio-flters li').on('click', function() {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
      });

      // Clients carousel (uses the Owl Carousel library)
      $(".clients-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
          0: {
            items: 2
          },
          768: {
            items: 4
          },
          900: {
            items: 6
          }
        }
      });

      // Testimonials carousel (uses the Owl Carousel library)
      $(".testimonials-carousel").owlCarousel({autoplay: true, dots: true, loop: true, items: 1});






      //footer
    }

/*
    //ProjectPage
    if (!$('#video-landing').size()) $.loadScript('../lib/jqueryvide/jquery.vide.js', function(){
        //Stuff to do after someScript has loaded
        console.log("video-landing")
    });
*/
//  };


//}
//});

/*
jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
}
*/
