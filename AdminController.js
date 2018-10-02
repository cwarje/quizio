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
        return this;
    },

    enable: function () {
        this.view.addQuestionEvent.attach(this.addQuestionHandler);
        this.view.removeQuestionEvent.attach(this.removeQuestionHandler);
        return this;
    },

    addQuestion: function (sender, args) {
        this.model.addQuestion();
    },

    removeQuestion: function (params) {
        this.model.removeQuestion();
    },

}
