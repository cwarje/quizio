var UserController = function (model, view) {
    this.model = model;
    this.view = view;

    this.init();
};

UserController.prototype = {
    init: function () {
        this.setupHandlers()
            .enable();
    },

    setupHandlers: function () {
        this.submitHandler = this.submit.bind(this);
        return this;
    },

    enable: function () {
        this.view.submitEvent.attach(this.submitHandler);
        return this;
    },

    submit: function (sender, args) {
        this.model.submitQuiz(args);
    },

}