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

  // Skills section
  $('#skills').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {offset: '80%'});

  // jQuery counterUp (used in Facts section)
  $('[data-toggle="counter-up"]').counterUp({delay: 10, time: 1000});

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
  $(".slideshow-carousel").owlCarousel({autoplay: true, dots: true, loop: true, items: 1});

  //#Sidebar
  $("#menu-close").click(function(e) {
    e.preventDefault();
    $("#sidebar").toggleClass("active");
    // $("#menu-canvas").remove();
  });

  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar").toggleClass("active");
    // $("#menu-canvas").remove();
    // $('<canvas id="menu-canvas" width="1000px" height="500px"></canvas>').insertAfter($("#sidebar").parent().find('.menu-item').last());
    // menuCanvas();

  });

  // #the-Team
  var itemsMainDiv = ('.MultiCarousel');
  var itemsDiv = ('.MultiCarousel-inner');
  var itemWidth = "";

  $('.leftLst, .rightLst').click(function() {
    var condition = $(this).hasClass("leftLst");
    if (condition)
      click(0, this);
    else
      click(1, this)
  });

  ResCarouselSize();

  $(window).resize(function() {
    ResCarouselSize();
  });

  //this function define the size of the items
  function ResCarouselSize() {
    var incno = 0;
    var dataItems = ("data-items");
    var itemClass = ('.item');
    var id = 0;
    var btnParentSb = '';
    var itemsSplit = '';
    var sampwidth = $(itemsMainDiv).width();
    var bodyWidth = $('body').width();
    $(itemsDiv).each(function() {
      id = id + 1;
      var itemNumbers = $(this).find(itemClass).length;
      btnParentSb = $(this).parent().attr(dataItems);
      itemsSplit = btnParentSb.split(',');
      $(this).parent().attr("id", "MultiCarousel" + id);

      if (bodyWidth >= 1200) {
        incno = itemsSplit[3];
        itemWidth = sampwidth / incno;
      } else if (bodyWidth >= 992) {
        incno = itemsSplit[2];
        itemWidth = sampwidth / incno;
      } else if (bodyWidth >= 768) {
        incno = itemsSplit[1];
        itemWidth = sampwidth / incno;
      } else {
        incno = itemsSplit[0];
        itemWidth = sampwidth / incno;
      }
      $(this).css({
        'transform': 'translateX(0px)',
        'width': itemWidth * itemNumbers
      });
      $(this).find(itemClass).each(function() {
        $(this).outerWidth(itemWidth);
      });

      $(".leftLst").addClass("over");
      $(".rightLst").removeClass("over");

    });
  }

  //this function used to move the items
  function ResCarousel(e, el, s) {
    var leftBtn = ('.leftLst');
    var rightBtn = ('.rightLst');
    var translateXval = '';
    var divStyle = $(el + ' ' + itemsDiv).css('transform');
    var values = divStyle.match(/-?[\d\.]+/g);
    var xds = Math.abs(values[4]);
    if (e == 0) {
      translateXval = parseInt(xds) - parseInt(itemWidth * s);
      $(el + ' ' + rightBtn).removeClass("over");

      if (translateXval <= itemWidth / 2) {
        translateXval = 0;
        $(el + ' ' + leftBtn).addClass("over");
      }
    } else if (e == 1) {
      var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
      translateXval = parseInt(xds) + parseInt(itemWidth * s);
      $(el + ' ' + leftBtn).removeClass("over");

      if (translateXval >= itemsCondition - itemWidth / 2) {
        translateXval = itemsCondition;
        $(el + ' ' + rightBtn).addClass("over");
      }
    }
    $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
  }

  //It is used to get some elements from btn
  function click(ell, ee) {
    var Parent = "#" + $(ee).parent().attr("id");
    var slide = $(Parent).attr("data-slide");
    ResCarousel(ell, Parent, slide);
  }

});
