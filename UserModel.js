var UserModel = function () {
    this.submitEvent = new Event();
    this.quiz;
    this.completedQuiz;
    this.answers = [];
};

UserModel.prototype = {

    retrieveQuiz: function () {
        if (typeof(Storage) !== "undefined") {
            let stringQuiz = localStorage.getItem("quiz");
            this.quiz = JSON.parse(stringQuiz);
            return this.quiz;
        } else {
            console.log("Browser does not support local storage.")
        }
    },

    submitQuiz: function (completedQuiz) {
        console.log(completedQuiz);
        console.log(this.quiz);
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
    }

}


