var UserModel = function () {
    this.submitEvent = new Event();
    this.noQuizEvent = new Event();
    this.quiz;
    this.errorMessage = "Sorry, there's no quiz available at this time.";
    this.completedQuiz;
    this.answers = [];
};

UserModel.prototype = {

    retrieveQuiz: function () {
        if (typeof(Storage) !== "undefined") {
            let stringQuiz = localStorage.getItem("quiz");
            if(stringQuiz === null) {
                this.noQuizEvent.notify();
            }
            this.quiz = JSON.parse(stringQuiz);
            return this.quiz;
        } else {
            console.log("Browser does not support local storage.")
        }
    },

    submitQuiz: function (completedQuiz) {
        this.completedQuiz = completedQuiz;
        this.submitEvent.notify();
    },

    getCount: function () {
        return this.quiz.length;
    },

    getCorrectAnswer: function (index) {
        return this.quiz[index].correctAnswer;
    },

    getChosenAnswer: function (index) {
        return this.completedQuiz[index].chosenAnswer;
    },

    getErrorMessage: function () {
        return this.errorMessage;
    }
}

