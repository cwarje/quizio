var AdminView = function (model) {
    this.model = model;
    this.addQuestionEvent = new Event(this);

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
        this.$questionsContainer = this.$container.find('.questions-container');
        this.$addQuestionButton = this.$container.find('.add-question-button');

        return this;
    },

    setupHandlers: function () {
        this.addQuestionButtonHandler = this.addQuestionButton.bind(this);

        /**
        Handlers from Event Dispatcher
        */
        this.addQuestionHandler = this.addQuestion.bind(this);

        return this;
    },

    enable: function () {
        this.$addQuestionButton.click(this.addQuestionButtonHandler);

        /**
        * Event Dispatcher
        */
        this.model.addQuestionEvent.attach(this.addQuestionHandler);

        return this;
    },

    updateGUI: function () {
        this.show();
    },

    addQuestionButton: function () {
        this.addQuestionEvent.notify();
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
            $questionsContainer.append(html + "<input type='checkbox' class='js-task' data-index='" + index + "' data-task-selected='false'>" + "<input type='text' name='description" + index + "' value='" + questions[question].description + "'></div>");
            // Delete button
            $questionsContainer.append("<button>Delete</button>")
            index++;
        }

    },

    /* --------Handlers-From-Event-Dispatcher--------- */
    addQuestion: function () {
        this.show();
    }
    /* --------End-Handlers-From-Event-Dispatcher--------- */

}