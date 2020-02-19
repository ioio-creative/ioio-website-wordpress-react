//jQuery(document).ready(function($) {
console.log("Loadbypage script Loaded");
reloadJS();
function reloadJS() {

  //  trying()
  //  function trying() {
  //  if (!$(".carousel-item").size() && !$(".portfolio-item").size() && !$('.section-bg').size()) {
  //    console.log("wait for dom")
  //    window.requestAnimationFrame(trying);
  //  } else {
  console.log("DOM OK!");
  // Back to top button
  /*
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
*/
  // Helper function for add element box list in WOW
  WOW.prototype.addBox = function(element) {
    this.boxes.push(element);
  };
  // added .wow {opacity: 0;} in index.css, make it visible again after wow loaded
  function afterReveal( el ) {
    el.addEventListener('animationend', function( event ) {
      $('.wow').each(function(){
        $(this).css('opacity',1);
      });
    });
  }
  // Init WOW.js and get instance
  //var wow = new WOW();
  var wow = new WOW({
    boxClass: 'wow', // default
    animateClass: 'animated', // default
    offset: 0, // default
    mobile: true, // default
    live: true, // default
    callback: afterReveal // fix page flashing on load
  })

  wow.init();

  /*
  // Attach scrollSpy to .wow elements for detect view exit events,
  // then reset elements and add again for animation
  $('.wow').on('scrollSpy:exit', function() {
    $(this).css({'visibility': 'hidden', 'animation-name': 'none'}).removeClass('animated');
    wow.addBox(this);
  }).scrollSpy();
*/

  /* Sidebar */

  function sideBarLogoTransition() {
    if ($(window).width() <= 767) {} else {
      $('#sidebar #sidebar-top-logo-text,#dark-sidebar #sidebar-top-logo-text').css("opacity", 0);
      $('#sidebar .logo,#dark-sidebar .logo').css("opacity", 1);
      $('#sidebar .logo,#dark-sidebar .logo').css("top", "15px");
      $('#sidebar .logo,#dark-sidebar .logo').css("left", "8px");

    }
    $(window).scroll(function() {
      if ($(window).width() <= 767) {
        let scrollVal = $(this).scrollTop();
        let val = convertRange(scrollVal, [
          0, 400
        ], [0, 1])

        if (val >= 1) {
          val = 1;
        }

        let val2 = convertRange(scrollVal, [
          0, 180
        ], [0, 1])
        if (val2 >= 1) {
          val2 = 1;
        } else if (val2 <= 0) {
          val2 = 0;
        }

        let val3 = convertRange(scrollVal, [
          120, 300
        ], [0, 1])
        if (val3 >= 1) {
          val3 = 1;
        } else if (val3 <= 0) {
          val3 = 0;
        }

        $('#dark-sidebar .logo').css("transition", "none");

        $('#dark-sidebar #sidebar-top-logo-text').css("transition", "none");

        $('#dark-sidebar .logo').css("top", (val * 10) + "px");

        $('#dark-sidebar .logo').css("opacity", val3);
        $('#dark-sidebar #sidebar-top-logo-text').css("opacity", 1 - val2);
        $('#dark-sidebar #sidebar-top-logo-text').css("top", ((1 - val) * 17) + "px");
        if (scrollVal < 200) {
          $('#dark-sidebar').css("border-bottom", "0px solid #FFFFFF");
        } else {          
          $('#dark-sidebar').css("border-bottom", "2px solid #656565");
        }
      }
    })

  }
  sideBarLogoTransition();
  $(window).resize(function() {
    sideBarLogoTransition();
  });

  /* Sidebar End */

  $(window).scroll(function() {

    if ($(this).scrollTop() > 100) {
      $('#scroller').addClass('header-scrolled');
      $('body').addClass('scrolled');

    } else {
      $('#scroller').removeClass('header-scrolled');
      $('body').removeClass('scrolled');

      /*
            $('.wow').removeClass('animated');
            $('.wow').removeAttr('style');
            new WOW().init();
            console.log($(this).scrollTop());
      */
    }

    if ($(this).scrollTop() < 1500) {
      let rangeToScroll = convertRange($(this).scrollTop(), [
        0, 1500
      ], [0, 1])
      $('#about01').css('background-size', 50 + (rangeToScroll) * 700 + '%')
      $('#img-hotpot').css('top', rangeToScroll * 15 + 'vh')
      $('#img-meet').css('top', rangeToScroll * 55 + 'vh')
      $('#img-fish').css('top', -rangeToScroll * 25 + 'vh')

      $('#img-fish').css('-webkit-transform', 'rotate(' + (
      rangeToScroll) * 360 + 'deg)')
      $('#img-fish').css('transform', 'rotate(' + (
      rangeToScroll) * 360 + 'deg)')
      $('#img-fish').css('z-index', '100')
      $('#media').css('z-index', '1')

    }
  });

}

function convertRange(value, r1, r2) {
  return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
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
