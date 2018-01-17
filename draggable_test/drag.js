$(document).ready(function(){
	$('.draggable').draggable({
		revert:'invalid'
	})
	$( ".droppable" ).droppable({
		accept:'.drag',
		drop: function( event, ui ) {
	    	$( this ).find( "p" ).html( "Dropped!" );
	  	}
	});
});