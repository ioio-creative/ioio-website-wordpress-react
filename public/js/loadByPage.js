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
  //var wow = new WOW();
  var wow = new WOW({
    boxClass: 'wow', // default
    animateClass: 'animated', // default
    offset: 0, // default
    mobile: true, // default
    live: true // default
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

  function sideBarLogoTransistion() {

    if ($(window).width() <= 767) {

      console.log("here")

      $(window).scroll(function() {
        let scrollVal = $(this).scrollTop();
        let val = convertRange(scrollVal, [
          0, 100
        ], [0, 1])

        if (val >= 1) {
          val = 1;
        }
        $('#sidebar .logo').css("top", (val * 10) + "px");

        $('#sidebar .logo').css("opacity", val);
        $('#sidebar-top-logo-text').css("opacity", 1 - val);
        $('#sidebar-top-logo-text').css("top", ((1 - val) * 20) + "px");
        if (scrollVal < 100) {
          $('#sidebar').css("border-bottom", "0px solid #FFFFFF");
        } else {
          $('#sidebar').css("border-bottom", "2px solid #E6E6E6");
        }
      })
    }
  }
  sideBarLogoTransistion();
  $(window).resize(function() {
    sideBarLogoTransistion();
  });

  /* Sidebar End */

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

  /* ===============  //footer =============== */

  $('.footer-back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
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
