// User Model
var UserModel = function () {
    this.submitEvent  = new Event();
    this.noQuizEvent  = new Event();
    this.errorMessage = "Sorry, there are no quiz available at this time.";
    this.answers      = [];
    this.quiz;
    this.completedQuiz;
};

UserModel.prototype = {

    // Retrieve the quiz from the local storage if it exists.
    retrieveQuiz: function () {

        if (typeof(Storage) !== "undefined") {
            let stringQuiz = localStorage.getItem("quiz");

            if (stringQuiz === null) {
                this.noQuizEvent.notify();
            }

            this.quiz = JSON.parse(stringQuiz);
            return this.quiz;

        } else {
            console.log("Browser does not support local storage.")
        }
    },
    
    // Saves the completed quiz.
    submitQuiz: function (completedQuiz) {
        this.completedQuiz = completedQuiz;
        this.submitEvent.notify();
    },

    // Gets the number of questions in the quiz.
    getCount: function () {
        return this.quiz.length;
    },

    // Gets the correct answer for the question at the specified index.
    getCorrectAnswer: function (index) {
        return this.quiz[index].correctAnswer;
    },

    // Get the answer chosen by the user for the question at the specified index.
    getChosenAnswer: function (index) {
        return this.completedQuiz[index].chosenAnswer;
    },

    // Gets the "No Quiz Available" error message.
    getErrorMessage: function () {
        return this.errorMessage;
    }
}


