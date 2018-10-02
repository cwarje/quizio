var AdminView = function (model) {
    this.model = model;
    this.addQuestionEvent    = new Event(this);
    this.removeQuestionEvent = new Event(this);
    this.saveEvent = new Event(this);

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
        this.$saveButton           = this.$container.find('.save-button');

        return this;
    },

    setupHandlers: function () {
        this.addQuestionButtonHandler    = this.addQuestionButton.bind(this);
        this.removeQuestionButtonHandler = this.removeQuestionButton.bind(this);
        this.saveButtonHandler = this.saveButton.bind(this);

        /**
        Handlers from Event Dispatcher
        */
        this.addQuestionHandler = this.addQuestion.bind(this);
        this.removeQuestionHandler = this.removeQuestion.bind(this);
        this.saveHandler = this.save.bind(this);

        return this;
    },

    enable: function () {
        this.$addQuestionButton.click(this.addQuestionButtonHandler);
        this.$removeQuestionButton.click(this.removeQuestionButtonHandler);
        this.$saveButton.click(this.saveButtonHandler);

        /**
        * Event Dispatcher
        */
        this.model.addQuestionEvent.attach(this.addQuestionHandler);
        this.model.removeQuestionEvent.attach(this.removeQuestionHandler);
        this.model.saveEvent.attach(this.saveHandler);

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

    saveButton: function () {
        //build the whole json. pass it 
        let updatedQuiz = [];
        let quizSize = this.model.getCount();

        for (let i = 0; i < quizSize; i ++) {
            updatedQuiz.push({
                description: document.getElementById("description" + i).value,
                answers:
                {
                    ans1: "juan",
                    ans2: "dos",
                    ans3: "tres",
                    ans4: "quat"
                },
                correctAnswer: "yeep"
            });
        }
        this.saveEvent.notify(updatedQuiz);
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
            $questionsContainer.append(html + "Question Text*<br><input type='text' id='description" + index 
            + "' value='" + questions[question].description + "'></div>");
            $questionsContainer.append("Answers*<br><input type='radio' name='ans1radio'><input type='text' name='ans1' value='" + questions[question].answers.ans1 + "'>");
            $questionsContainer.append("<br><input type='radio' name='ans2radio'><input type='text' name='ans2' value='" + questions[question].answers.ans2 + "'>");
            $questionsContainer.append("<br><input type='radio' name='ans3radio'><input type='text' name='ans3' value='" + questions[question].answers.ans3 + "'>");
            $questionsContainer.append("<br><input type='radio' name='ans4radio'><input type='text' name='ans4' value='" + questions[question].answers.ans4 + "'>");
            index++;
        }

    },

    /* --------Handlers-From-Event-Dispatcher--------- */
    addQuestion: function () {
        this.show();
    },

    removeQuestion: function () {
        this.show();
    },

    save: function () {
        this.show();
    }
    /* --------End-Handlers-From-Event-Dispatcher--------- */

}