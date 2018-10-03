var UserView = function (model) {
    this.model = model;
    this.submitEvent = new Event(this);

    this.init();
}

UserView.prototype = {

    init: function () {
        this.createChildren()
            .setupHandlers()
            .enable()
            .updateGUI();
    },

    createChildren: function () {
        this.$container = $('.js-container');
        this.$quizContainer = this.$container.find('.quiz-container');
        this.$submitButton = this.$container.find('.submit-button');

        return this;
    },

    setupHandlers: function () {
        this.submitButtonHandler = this.submitButton.bind(this);

        /**
        Handlers from Event Dispatcher
        */
        this.submitHandler = this.submit.bind(this);

        return this;
    },

    enable: function () {
        this.$submitButton.click(this.submitButtonHandler);

        /**
        * Event Dispatcher
        */
        this.model.submitEvent.attach(this.submitHandler);

        return this;
    },

    updateGUI: function () {
        this.show();
    },

    submitButton: function () {
        let userAnswers = this.getUserAnswers();
        this.submitEvent.notify(userAnswers);
    },

    getUserAnswers: function () {
        // get the user answers from the UI document.getElementById().
    },
    

    show: function () {
        this.buildQuiz();
    },

    buildQuiz: function () {
        // var questions = this.model.getQuestions();
        // var html = "";
        // var $questionsContainer = this.$questionsContainer;

        // $questionsContainer.html('');

        // var index = 0;
        // for (var question in questions) {

        //     html = "<div>";
        //     $questionsContainer.append(html + "Question Text*<br><input type='text' id='description" + index
        //         + "' value='" + questions[question].description + "'></div>");
        //     $questionsContainer.append("Answers*<br>");
        //     $questionsContainer.append("<input type='radio' name='q" + index + "radio' id='q" + index + "ans0'><input type='text' id='" + "q" + index + "option0' value='" + questions[question].answers.ans0 + "'><br>");
        //     $questionsContainer.append("<input type='radio' name='q" + index + "radio' id='q" + index + "ans1'><input type='text' id='" + "q" + index + "option1' value='" + questions[question].answers.ans1 + "'><br>");
        //     $questionsContainer.append("<input type='radio' name='q" + index + "radio' id='q" + index + "ans2'><input type='text' id='" + "q" + index + "option2' value='" + questions[question].answers.ans2 + "'><br>");
        //     $questionsContainer.append("<input type='radio' name='q" + index + "radio' id='q" + index + "ans3'><input type='text' id='" + "q" + index + "option3' value='" + questions[question].answers.ans3 + "'>");
        //     index++;

        //     radiobtn = document.getElementById(questions[question].correctAnswer);
        //     if (radiobtn != null) {
        //         radiobtn.checked = true;
        //     }
        // }

    },

    /* --------Handlers-From-Event-Dispatcher--------- */
    submit: function () {
        this.show();
    }
    /* --------End-Handlers-From-Event-Dispatcher--------- */

}