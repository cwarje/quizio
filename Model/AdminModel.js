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
    this.addQuestionEvent = new Event();
    this.removeQuestionEvent = new Event();
    this.saveEvent = new Event();
};

AdminModel.prototype = {

    // Adds a blank new question to the question object.
    addQuestion: function (potentiallyModifiedQuiz) {
        this.questions = potentiallyModifiedQuiz;

        this.questions.push({
            description: "",
            answers:
            {
                ans0: "",
                ans1: "",
                ans2: "",
                ans3: ""
            },
            correctAnswer: ""
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
        // Need to convert here because the rest of the app
        // needs to use the double quoted version.
        let formattedQuiz = this.replaceDoubleQuotesWithSingleQuotes(quiz);

        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", URL, true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        var data = {};
        data.json = formattedQuiz;
        var jsonObj = JSON.stringify(data);

        xhttp.send(jsonObj);

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("model Saved!");
            }
        }
    },

    // Converts the quiz to a consumable JSON string with single quotes.
    replaceDoubleQuotesWithSingleQuotes: function (quiz) {
        // Convert to string
        let stringQuiz = JSON.stringify(quiz);

        // Replace double quotes with single quotes.
        var stringQuizReplacedQuotes = stringQuiz.replace(/"/g, "'");

        return (stringQuizReplacedQuotes);

    },

    // Gets the number of items in the quiz object.
    getCount: function () {
        return this.questions.length;
    }
}


