// User Model
var UserModel = function () {
    this.submitEvent = new Event();
    this.noQuizEvent = new Event();
    this.retrievedQuizEvent = new Event();
    this.errorMessage = "Sorry, there are no quiz available at this time.";
    this.answers = [];
    this.quiz;
    this.completedQuiz;
};

UserModel.prototype = {

    // Retrieve the quiz from the local storage if it exists.
    retrieveQuiz: async function () {

        let response = await new Promise(resolve => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", URL, true);
            xhr.onload = function (e) {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                resolve(undefined);
                console.error("** An error occurred during the XMLHttpRequest");
            };
            xhr.send();
        });

        let respText = response;
        this.quiz = JSON.parse(respText);

        var parsed = this.quiz.quiz.replace(/'/g, '"');
        var obj = JSON.parse(parsed);
        let arr = [];
        arr.push(obj);
        this.quiz = arr[0];
        if(this.quiz.length === 0){
            this.noQuizEvent.notify();
        }
        this.retrievedQuizEvent.notify();
    },

    getQuiz: function () {
        return this.quiz;
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


