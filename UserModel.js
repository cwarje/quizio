var UserModel = function () {
    this.submitEvent = new Event();
};

UserModel.prototype = {

    retrieveQuiz: function (quiz) {
        this.questions = quiz;
        localStorage.setItem('quiz', JSON.stringify(this.questions));
    },

    submitQuiz: function (completedQuiz) {
        console.log(completedQuiz);
    },

}


