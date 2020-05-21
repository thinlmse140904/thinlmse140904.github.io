function click(){
    document.getElementById("start-btn").onclick = function() {countdown()};
    populate();
}

function reset(){
    document.getElementById("enter-btn").onclick = function() {clean()};
}

var name = document.getElementById('popupname');
function clean(){
    document.getElementById('popupname').value = '';
    name.classList.remove('hide');
}

function populate() {
    if(quiz.isEnded()) {
        document.getElementById("quiz-area").classList.add('hide');
        document.getElementById("display-left").classList.add('hide');
        document.getElementById("restart-area").classList.remove('hide');
        document.getElementById("restart-btn").classList.remove('hide');
        document.getElementById("controls-01").classList.remove('hide');
        document.getElementById("nameconfirm").classList.remove('hide');
        document.getElementById("popupname").classList.remove('hide');
        document.getElementById("enter-btn").classList.remove('hide');
        showScores();

    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().description;
        var score = document.getElementById("show");
        score.innerHTML = quiz.score;

        // show options
        var choices = quiz.getQuestionIndex().answers;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i].text;
            guess("btn" + i, choices[i].text);

        }

        showProgress();
    }

};

//Choose answer
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};

//Show the process of making a question
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

//Show score
function showScores() {
    var gameOverHTML = "<h1>Your score: " + quiz.score + "</h1>";
    var element = document.getElementById("scores");
    element.innerHTML = gameOverHTML;
};

//Set up time
function countdown(){
    var count = 59;
    var interval = setInterval(function(){
        document.getElementById('timer').innerHTML=count;
        count--;
        if(count === 0){
            // document.getElementById("start-area").classList.add('hide');
            document.getElementById("quiz-area").classList.add('hide');
            document.getElementById("display-left").classList.add('hide');
            document.getElementById("restart-area").classList.remove('hide');
            document.getElementById("restart-btn").classList.remove('hide');
            document.getElementById("controls-01").classList.remove('hide');
            document.getElementById("nameconfirm").classList.remove('hide');
            document.getElementById("popupname").classList.remove('hide');
            document.getElementById("enter-btn").classList.remove('hide');
            showScores();
        }    
    }, 1000);
}


function resetGame(){
    console.log('reset');
    enterButton.classList.add('hide');  
    displayQuiz.classList.add('hide');
    restartButton.classList.add('hide');
    popname.classList.add('hide');
    startButton.classList.remove('hide');
}


//get questions
function suffle(array){
    for(let i=array.length-1;i>0;i--){
        var j= Math.floor(Math.random() * (i + 1));
        var temp = array[j];
        array[j]=array[i];
        array[i]=temp;
    }
}
var quiz;
var enterButton = document.getElementById('enter-btn');
var displayQuiz = document.getElementById('restart-area');
var restartButton = document.getElementById('controls-01');
var area = document.getElementById('restart-area');
var startButton = document.getElementById('start-btn');
var popname = document.getElementById('popupname');

let getQuestions = async () => {
    const content = document.getElementById("content_quiz").value.toLowerCase();
    const level = "beginer";
    const url = 'https://quizapimin.herokuapp.com/questions/key?level='+level+'&content='+content;
    try {
        let res = await fetch(url);
        let questions = await res.json();
        let result = [];
        questions.forEach(element => {
            var q = new Question(element.type,element.level,element.content,element.description,element.answers);
            suffle(q.answers); 
            result.push(q);
        });
        suffle(result);
        quiz = new Quiz(result);
        countdown();
        populate();
        getLeaderBoard();
    } catch (error) {
        console.error(error);
    }
};

var leaderboard;
let getLeaderBoard = async () => {
    const content = document.getElementById("content_quiz").value.toLowerCase();
    const level = "beginer";
    const url = 'https://quizapimin.herokuapp.com/leaderboard?level='+level+'&content='+content;
    try {
        let res = await fetch(url);
        leaderboard = await res.json();
        loadLeaderBoard(leaderboard.board);

    } catch (error) {
        console.error(error);
    }
};

let loadLeaderBoard = (board) => {
    for(let i = 0;i<board.length;i++){
        let name = document.getElementById('name'+i);
        let score = document.getElementById('score'+i);
        name.innerHTML = board[i].name;
        score.innerHTML = board[i].score;
    }
};


let saveLeaderBoard = async () => {
    const name = document.getElementById('popupname').value;
    const score = quiz.score;
    const data = {
        "name":name,
        "score":score
    };
    leaderboard.board.push(data)
    leaderboard.board.sort((a,b) => {return b.score - a.score});
    if(leaderboard.board.length > 5){
        leaderboard.board.pop()
    }
        
    loadLeaderBoard(leaderboard.board);
    const content = document.getElementById("content_quiz").value.toLowerCase();
    const level = "beginer";
    const url = 'https://quizapimin.herokuapp.com/leaderboard/'+leaderboard._id;
    try {
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(leaderboard),
        });
    } catch (error) {
        console.error(error);
    }
}

function reset(){
    const name = document.getElementById('popupname').value;
    document.getElementById("enter-btn").onclick = name.text('');

}

reset();

