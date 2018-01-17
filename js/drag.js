$(document).ready(function(){
	$('.answer-wrapper').find('.draggable.answer').each(function(i){
		$(this).draggable({appendTo:'body'});
	})
});