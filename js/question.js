function Question(type,level,content,description,answers) {
    this.type = type;
    this.level = level;
    this.content = content;
    this.description = description;
    this.answers=answers;
    for(let i=0;i<4;i++){
        if(answers[i].isCorrect){
            this.correctAnswer = answers[i].text;
            break;
        }
    }
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.correctAnswer === choice;
}