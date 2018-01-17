'use strict'

$(document).ready(function(){
	const state = {
		'round':0,
		'images':{'burrito':{'pic':'images/burrito.jpeg','alt':'A Burrito','answer':'marry'},'pizza':{'pic':'images/pizza.jpeg','alt':'A Pizza','answer':'kill'},'chicken':{'pic':'images/fried_chicken.jpeg','alt':'Fried Chicken','answer':'fuck'},'crossfit':{'pic':'images/crossfit.jpeg','alt':'Someone who does crossfit','answer':'fuck'},'vegan':{'pic':'images/vegan.jpg','alt':'A Vegan','answer':'kill'},'bitcoin':{'pic':'images/bitcoin_trader.jpg','alt':'A Bitcoin Trader','answer':'marry'},'baldwin':{'pic':'images/baldwin_trump.jpeg','alt':"Alec Baldwin on SNL",'answer':'marry'},'garrison':{'pic':'images/garrison_trump.jpeg','alt':'Mr Garrison as Trump on SouthPark','answer':'fuck'},'cheeto':{'pic':'images/cheetoh_trump.jpeg','alt':'A Cheeto which is Orange, like Trump','answer':'kill'},'homer':{'pic':'images/homer.jpeg','alt':'Homer Simpson','answer':'kill'},'peter':{'pic':'images/family_guy.jpeg','alt':'Peter Griffin','answer':'fuck'},'randy':{'pic':'images/randy.jpeg','alt':'Randy Marsh','answer':'marry'},'kim':{'pic':'images/kim.jpeg','alt':'Kim Jung Un','answer':'fuck'},'hitler':{'pic':'images/hitler.jpeg','alt':'Hitler','answer':'kill'},'poop':{'pic':'images/poop.jpeg','alt':'A literal piece of poop','answer':'marry'}},
		'batches':[['burrito','pizza','chicken'],['crossfit','vegan','bitcoin'],['baldwin','garrison','cheeto'],['peter','randy','homer'],['kim','hitler','poop']],
		'category':['What could you eat for the rest of your life...','A crossfit athlete, a vegan, and a bitcoin trader walk into a bar...','Best Trump Impression...','Best Cartoon Dad...','A shitshow...'],
		'correct':0,
		'incorrect':0,
		'correctCount':0,
		'nextQuestion':true
	}

	function toggleDisplay(selector){
		$(selector).toggleClass('hide-it')
	}

	function toggleButton(selector, value, className){
		$(selector).unbind('click');
		$(selector).attr({"value":value,"class":className});
	}

	function tallyCorrect(){
		$('.js-tally-correct').html(state.correct);
	}

	function tallyIncorrect(){
		$('.js-tally-incorrect').html(state.incorrect);
	}

	function answerResponse (correct){
		if(correct){
			alert("Nice one, obviously you'd fuck the burrito here");
			state.correct += 1;
			tallyCorrect()
		} else {
			alert("I don't think we can be friends");
			state.incorrect += 1;
			tallyIncorrect();
		}
	}

    function checkAnswers(){
    	state.correctCount = 0;
    	$('.line-up').find('.card').each(function(){
    		var correct = $(this).find('.img').attr('data-answer');
    		correct = String(correct);
    		var userAnswer = $(this).find('.droppable .draggable').text();
    		userAnswer = String(userAnswer);
    		userAnswer = userAnswer.trim();
    		if(userAnswer===''){
    			console.log('made it here');
    			state.nextQuestion = false;
    			return false
    		} else {
	    		if(correct.toLowerCase()===userAnswer.toLowerCase()){
	    			state.correctCount += 1;
	    		} else{
	    			return false
	    		}
    		}
    	});
    	if(state.nextQuestion===true){
	    	if(state.correctCount===3){
	    		answerResponse(true);
	    	} else {
		    	answerResponse(false);
    		} 
    	}
    }

	function shuffleCards(){
		$('.title').html(state.category[state.round])
		var cards = [];
		var batch = state.batches[state.round];
		for (var key in batch){
			var card = state.images[batch[key]];
			card = renderCards(card);
			cards.push(card);
		}
		cards = cards.join("");
		$('.line-up').html(cards);
		state.round += 1;
		$( ".droppable" ).droppable({
			accept:'.draggable',
			drop: function( event, ui ) {
	    		ui.draggable.detach().appendTo($(this));
	  		}
		});
		toggleDisplay('.m-choice');
	}


	function renderCards(img){
		var card = 
			`<div class="col-4">
				<div class="card">
					<div class="image-wrapper">
						<span>${img.alt}</span>
						<img class="img" data-answer="${img.answer}" src="${img.pic}" alt="${img.alt}"/>
					</div>
					<div class="droppable answer-box">
						<p>Place your answer here!</p>
					</div>
				</div>
			</div>`	
        return card
        }

	function renderAnswers(img){
		var answers = 
			`<div class="draggable">
          		<span>Fuck</span>
        	</div>
        	<div class="draggable">
          		<span>Marry</span>
        	</div>
        	<div class="draggable">
          		<span>Kill</span>
        	</div>`	
        $('.answer-wrapper').html(answers);
        $('.draggable').draggable({
			helper:'clone',
			revert:'invalid'
		});
        }

    function renderEnd(){
    	var selectors = ['.correct.top','.correct.bottom','.incorrect','.answer-wrapper']
    	selectors.map((selector) => toggleDisplay(selector));
    	toggleButton('.submit-button', 'Play Again', 'play-button');
    	$('.play-button').on('click', function(){
    		toggleDisplay('.answer-wrapper');
    		state.round = 0;
    		state.correct = 0;
    		state.incorrect = 0;
    		tallyCorrect();
    		tallyIncorrect();
    		renderGamePlay();
    	});
    	if(state.correct === 5){
	  		var correctBackground = 
				`<div class="col-12">
					<div class="card">
						<div class="image-wrapper">
							<img class="answer-response" src="images/great_job.gif" alt="gif of a boy giving a thumbs up"/>
						</div>
					</div>
				</div>`	
			$('.line-up').html(correctBackground);
    	} else {
	  		var incorrectBackground = 
				`<div class="col-12">
					<div class="card">
						<div class="image-wrapper">
							<img class="answer-response" src="images/cannot_sit.gif" alt="gif of a girl not allowing you to sit with her"/>
						</div>
					</div>
				</div>`	
			$('.line-up').html(incorrectBackground);
    	}
    }

    function refreshCard(){
    	shuffleCards();
    	renderAnswers();
    }

	function renderGamePlay(){
		toggleButton('.play-button', 'Submit', 'submit-button');
		shuffleCards();
		renderAnswers();
		var selectors = ['.correct.top','.correct.bottom','.incorrect']
		selectors.map((selector) => toggleDisplay(selector));
		state.correct = 0;
		state.incorrect = 0;
		console.log(state.round);
		$('.submit-button').on('click', function(){
			checkAnswers();
			if(state.nextQuestion===true){
				if(state.round===5){
					renderEnd();
				} else {
					shuffleCards();
					renderAnswers();
				}
			} else {
				alert('Please select an option for each image')
				//NEED TO REFRESH ANSWERS AND RESTART AT CORRECT BATCH
				refreshCard();
			}
		})
	}

    function renderStart(){
		var randKeys = Object.keys(state.images);
		randKeys = randKeys.sort(() => .5 - Math.random()).slice(0,3);
		var cards = randKeys.map((key) => renderCards(state.images[key]));
		cards = cards.join("");
		$('.line-up').html(cards);
		$('.answer-box').addClass('hide-it');
		toggleDisplay('.instructions');
	}

	$('.play-button').on('click', function(){
		toggleDisplay('.instructions');
		renderGamePlay();
	})

	renderStart()
});


