// Admin Model
var AdminModel = function () {
    
    // Question object containing the quiz questions.
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
    this.addQuestionEvent    = new Event();
    this.removeQuestionEvent = new Event();
    this.saveEvent           = new Event();
};

AdminModel.prototype = {

    // Adds a blank new question to the question object.
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
        this.addQuestionEvent.notify();
    },

    // Removes the last quiz question from the list.
    removeQuestion: function () {
        this.questions.pop();
        this.removeQuestionEvent.notify();
    },

    // Gets the quiz object.
    getQuestions: function () {
        return this.questions;
    },

    // Stores the quiz object in the browser localstorage.
    storeQuiz: function (quiz) {
        this.questions = quiz;
        localStorage.setItem('quiz', JSON.stringify(this.questions));
    },

    // Gets the number of items in the quiz object.
    getCount: function () {
        return this.questions.length;
    }
}


