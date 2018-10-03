var AdminController = function (model, view) {
    this.model = model;
    this.view = view;

    this.init();
};

AdminController.prototype = {
    init: function () {
        this.setupHandlers()
            .enable();
    },

    setupHandlers: function () {
        this.addQuestionHandler = this.addQuestion.bind(this);
        this.removeQuestionHandler = this.removeQuestion.bind(this);
        this.saveHandler = this.save.bind(this);
        return this;
    },

    enable: function () {
        this.view.addQuestionEvent.attach(this.addQuestionHandler);
        this.view.removeQuestionEvent.attach(this.removeQuestionHandler);
        this.view.saveEvent.attach(this.saveHandler);
        return this;
    },

    addQuestion: function (sender, args) {
        this.model.addQuestion(args);
    },

    removeQuestion: function () {
        if (this.model.getCount() > 0){ // nothing should happen when you try to remove zero questions.
            this.model.removeQuestion();
        }
    },

    save: function (sender, args) {
        // just save the whole thing
        this.model.save(args);
    },

}
