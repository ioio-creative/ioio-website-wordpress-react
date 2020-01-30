jQuery(document).ready(function($) {
      reloadJS();
  //#Sidebar
  $(".menu-close").click(function(e) {
    $("#sidebar").toggleClass("active");
    $("#menu-canvas").remove();
    reloadJS();
  });

  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar").toggleClass("active");
    $("#menu-canvas").remove();
    $('<canvas id="menu-canvas" width="1000px" height="500px"></canvas>').insertAfter($("#sidebar").parent().find('.menu-item').last());
    menuCanvas();

  });
})
