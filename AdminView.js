var AdminView = function (model) {
    this.model = model;
    this.addQuestionEvent    = new Event(this);
    this.removeQuestionEvent = new Event(this);

    this.init();
}

AdminView.prototype = {

    init: function () {
        this.createChildren()
            .setupHandlers()
            .enable()
            .updateGUI();
    },

    createChildren: function () {
        this.$container = $('.js-container');
        this.$questionsContainer   = this.$container.find('.questions-container');
        this.$addQuestionButton    = this.$container.find('.add-question-button');
        this.$removeQuestionButton = this.$container.find('.remove-question-button');

        return this;
    },

    setupHandlers: function () {
        this.addQuestionButtonHandler    = this.addQuestionButton.bind(this);
        this.removeQuestionButtonHandler = this.removeQuestionButton.bind(this);

        /**
        Handlers from Event Dispatcher
        */
        this.addQuestionHandler = this.addQuestion.bind(this);
        this.removeQuestionHandler = this.removeQuestion.bind(this);

        return this;
    },

    enable: function () {
        this.$addQuestionButton.click(this.addQuestionButtonHandler);
        this.$removeQuestionButton.click(this.removeQuestionButtonHandler);

        /**
        * Event Dispatcher
        */
        this.model.addQuestionEvent.attach(this.addQuestionHandler);
        this.model.removeQuestionEvent.attach(this.removeQuestionHandler);

        return this;
    },

    updateGUI: function () {
        this.show();
    },

    addQuestionButton: function () {
        this.addQuestionEvent.notify();
    },

    removeQuestionButton: function () {
        this.removeQuestionEvent.notify();
    },

    show: function () {
        this.buildQuestionList();
    },

    buildQuestionList: function () {
        var questions = this.model.getQuestions();
        var html = "";
        var $questionsContainer = this.$questionsContainer;

        $questionsContainer.html('');

        var index = 0;
        for (var question in questions) {

            html = "<div>";
            $questionsContainer.append(html + "Question Text*<br><input type='text' name='description" + index 
            + "' value='" + questions[question].description + "'></div>");
            $questionsContainer.append();
            index++;
        }

    },

    /* --------Handlers-From-Event-Dispatcher--------- */
    addQuestion: function () {
        this.show();
    },

    removeQuestion: function () {
        this.show();
    }
    /* --------End-Handlers-From-Event-Dispatcher--------- */

}