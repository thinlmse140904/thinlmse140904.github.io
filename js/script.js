var startButton = document.getElementById('start-btn');
var startQuiz = document.getElementById('start-area');
var questionContainer = document.getElementById('quiz-area');
var scoreContainer = document.getElementById('display-left');
var scoreBoardContainer = document.getElementById('display-right');

startButton.addEventListener('click', startGame)

function startGame(){
	console.log('Started');
	startQuiz.classList.add('hide');	
	scoreContainer.classList.remove('hide');
	questionContainer.classList.remove('hide');
	scoreBoardContainer.classList.remove('hide');
}

function clean(){
	document.nameconfirm.popupname = "";
}





