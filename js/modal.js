$.fn.expose = function(options) {
  
  var $modal = $(this),
      $trigger = $("a[href=" + this.selector + "]");
  
  $modal.on("expose:open", function() {
    
    $modal.addClass("is-visible");
    $modal.trigger("expose:opened");
  });
  
  $modal.on("expose:close", function() {
    
    $modal.removeClass("is-visible");
    $modal.trigger("expose:closed");
  });
  
  $trigger.on("click", function(e) {
    
    e.preventDefault();
    $modal.trigger("expose:open");
  });
  
  $modal.add( $modal.find(".close") ).on("click", function(e) {
    
    e.preventDefault();
    
    // if it isn't the background or close button, bail
    if( e.target !== this )
      return;
    
    $modal.trigger("expose:close");
  });
  
  return;
}

$("#Popup").expose();

// Example Cancel Button

$(".cancel").on("click", function(e) {
  
  e.preventDefault();
  $(this).trigger("expose:close");
});

// Example Callbacks
/*
$("#Popup").on("expose:opened", function() {
  
  alert("Modal Opened!");
});

$("#Popup").on("expose:closed", function() {
  
  alert("Modal Closed!");
});
*/