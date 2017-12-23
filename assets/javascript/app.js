
// ======================================== GLOBAL VARIABLES ======================================== //

var startScreen;
var gameUI;
var timeCounter = 30;
var questionArray = ["What are the most common galaxies in the universe?", "What is the coldest place in the universe?", "The hottest place in the universe is located in which constellation?", "How old is the universe in light years?", "What percent of the universe is dark matter?", "How many planets are in the Solar System?", "What is the largest planet in our solar system?", "What is the closest star to the Sun?"];
var answerArray = [["Elliptical Galaxies", "Spiral Galaxies", "Barred Galaxies", "Irregular Galaxies"], ["Orion's Nebula","Boomerang Nebula","Ursa Major II","Centaurus Neutron Cluster"], ["The Constellation Sagittarius", "The Constellation Capricorn", "The Constellation Virgo", "The Constellation Leo"], ["7.3 Billion","12 Billion","13.8 Billion","25 Billion"], ["7%", "13%", "22%", "27%"], ["8","9","10","11"], ["Venus", "Jupiter", "Saturn", "Uranus"], ["Alpha Centauri","Barnard's Star","Wolf 359","Proxima Centauri"]];
var correctAnswers = ["Elliptical Galaxies", "Boomerang Nebula", "The Constellation Virgo", "13.8 Billion", "27%", "8", "Jupiter", "Proxima Centauri"];
var questionCounter = 0;
var correctCounter = 0;
var incorrectCounter = 0;
var unansweredCounter = 0;
var thirtySecondTimer;




// ======================================== JQUERY BUTTONS ======================================== //

//jQuery Wapper for creating game UI
$(document).ready(function() {

	
	// Creates the start button and start screen

	function initialScreen() {
		startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
		$(".mainArea").html(startScreen);
	}
	initialScreen();


	//When user clicks START, call the showQuestion and startTimer functions to begin gameplay

	$("body").on("click", ".start-button", function(event){
		event.preventDefault();
		showQuestion();
		startTimer();
	});


	//When a user clicks an answer, determines if selectedAnswer is correct else incorrect

	$("body").on("click", ".answer", function(event){
		//Grabs text from button and stores it in selectedAnswer variable
		selectedAnswer = $(this).text();
		//If selectedAnswer matches one of the correctAnswers, reset timer and run the playerWon function
		if(selectedAnswer === correctAnswers[questionCounter]) {
			//Correct("FACT!");
			clearInterval(thirtySecondTimer);
			playerWon();
		}
		else {
			//Wrong("Y'all Need Science");
			clearInterval(thirtySecondTimer);
			playerLost();
		}
	});


	//Reset Game Function

	$("body").on("click", ".reset-button", function(event){
		resetGame();
	});

});  
//  End of jQuery wrapper




// ======================================== SHOWS NEW QUESTION ======================================== //

function showQuestion() {
	gameUI = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>" + answerArray[questionCounter][0] + "</p><p class='answer'>"+answerArray[questionCounter][1]+"</p><p class='answer'>"+answerArray[questionCounter][2]+"</p><p class='answer'>"+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameUI);
}




// ======================================== ALERTS CORRECT, INCORRECT, TIMEOUT ======================================== //


function playerWon() {
	correctCounter++;
	gameUI = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timeCounter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-feedback' src='assets/images/fact.png'>";
	$(".mainArea").html(gameUI);
	setTimeout(wait, 2500);
}

function playerLost() {
	incorrectCounter++;
	gameUI = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timeCounter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-feedback' src='assets/images/x.png'>";
	$(".mainArea").html(gameUI);
	setTimeout(wait, 2500)
}

function playerTimeExpires() {
	unansweredCounter++;
	gameUI = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timeCounter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-feedback' src='assets/images/x.png'>";
	$(".mainArea").html(gameUI);
	setTimeout(wait, 2500);
}

//Final screen displaying game stats
function finalScreen() {
	gameUI = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timeCounter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctCounter + "</p>" + "<p>Wrong Answers: " + incorrectCounter + "</p>" + "<p>Unanswered: " + unansweredCounter + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset!</a></p>";
	$(".mainArea").html(gameUI);
}


// ======================================== TIMERS ======================================== //

//Function called at the end of each round to determine whether game should reset clock or go to the final screen
function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	showQuestion();
	timeCounter = 30;
	startTimer();
	}
	else {
		finalScreen();
	}
}


//Timer that counts down from timeCounter value until zer, or resets after win or question timeout
function startTimer() {
	thirtySecondTimer = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (timeCounter === 0) {
			clearInterval(thirtySecondTimer);
			playerTimeExpires();
		}
		if (timeCounter > 0) {
			timeCounter--;
		}
		$(".timer").html(timeCounter);
	}
}



// ======================================== RESET ======================================== //

function resetGame() {
	questionCounter = 0;
	correctCounter = 0;
	incorrectCounter = 0;
	unansweredCounter = 0;
	timeCounter = 30;
	showQuestion();
	startTimer();
}

