// Admin Controller
var AdminController = function (model, view) {
    this.model = model;
    this.view = view;

    this.init();
};

AdminController.prototype = {
    
    // Binds functions to handlers and sets up event handlers.
    init: function () {
        this.setupHandlers()
            .enable();
    },

    // Binds functions to event handlers.
    setupHandlers: function () {
        this.addQuestionHandler    = this.addQuestion.bind(this);
        this.removeQuestionHandler = this.removeQuestion.bind(this);
        this.saveHandler           = this.save.bind(this);
        return this;
    },

    // Adds handlers to view events.
    enable: function () {
        this.view.addQuestionEvent.attach(this.addQuestionHandler);
        this.view.removeQuestionEvent.attach(this.removeQuestionHandler);
        this.view.saveEvent.attach(this.saveHandler);
        return this;
    },

    // Passes the addQuestion arguments to the model.
    addQuestion: function (sender, args) {
        this.model.addQuestion(args);
    },

    // Removes a question from the quiz if there are questions to remove.
    removeQuestion: function () {
        if (this.model.getCount() > 0) { 
            this.model.removeQuestion();
        }
    },

    // Tells the model to save the quiz.
    save: function (sender, args) {
        this.model.storeQuiz(args);
    },
}