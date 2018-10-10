// User Controller
var UserController = function (model, view) {
    this.model = model;
    this.view = view;

    this.init();
};

UserController.prototype = {

    // Binds functions to handlers and sets up event handlers.
    init: function () {
        this.setupHandlers()
            .enable();
    },

    // Binds functions to event handlers.
    setupHandlers: function () {
        this.submitHandler = this.submit.bind(this);
        return this;
    },

    // Adds handlers to view events.
    enable: function () {
        this.view.submitEvent.attach(this.submitHandler);
        return this;
    },

    // Tells the model to submit the quiz for marking.
    submit: function (sender, args) {
        let score = this.determineScore(args);
        //let score = 3;
        this.model.setScore(score);
        this.model.submitQuiz(args);
    },

    determineScore: function (args) {
        console.log("args");
        console.log(args);
        let score = 0;
        for (arg in args) {
            console.log(args[arg]);
            let correct = args[arg].correctAnswer;
            let chosen = args[arg].chosenAnswer;
            if (correct === chosen) {
                score++
            }
        }
        return score;
    }
}