var AdminModel = function () {
    this.questions = [{
        description: "",
        answers:
        {
            ans0: "",
            ans1: "",
            ans2: "",
            ans3: ""
        },
        correctAnswer: ""
    }];
    this.addQuestionEvent = new Event();
    this.removeQuestionEvent = new Event();
    this.saveEvent = new Event();
    this.count = 1; // number of quiz questions.
    //maybe keep a global variable of the number of questions, changing when delete is pressed and when add is pressed, to make the iterating easier? we'll see.
};

AdminModel.prototype = {
    addQuestion: function (potentiallyModifiedQuiz) {
        this.questions = potentiallyModifiedQuiz;

        this.questions.push({
            description: "",
            answers:
                {
                    ans0:"",
                    ans1:"",
                    ans2:"",
                    ans3:""
                },
            correctAnswer:""
        });
        this.count++;
        this.addQuestionEvent.notify();
    },

    removeQuestion: function () {
        this.questions.pop();
        this.count--;
        this.removeQuestionEvent.notify();
    },

    getQuestions: function () {
        //console.log(this.questions);
        return this.questions;
    },

    save: function (quiz) {
        //console.log(quiz);
        // set this.questiobs = quiz. and then store in local storage.
        this.questions = quiz;
        localStorage.setItem('quiz', JSON.stringify(this.questions));
    },

    getCount: function () {
        return this.count;
    },


}


