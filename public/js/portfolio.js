//jQuery(document).ready(function($) {
console.log("portfolioJS Loaded")
portfolioJS()
function portfolioJS() {
  // Porfolio isotope and filter
  var portfolioIsotope = $('.portfolio-container').isotope({itemSelector: '.portfolio-item', layoutMode: 'fitRows'});

  $('#portfolio-flters li').on('click', function() {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    portfolioIsotope.isotope({filter: $(this).data('filter')});
  });

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
