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
        let updatedQuiz = this.scrapeModifiedQuiz();
        this.addQuestionEvent.notify(updatedQuiz);
    },

    removeQuestionButton: function () {
        this.removeQuestionEvent.notify();
    },

    saveButton: function () {
        let updatedQuiz = this.scrapeModifiedQuiz();
        this.saveEvent.notify(updatedQuiz);
    },

    // Builds the JSON object from the current user visible values.
    scrapeModifiedQuiz: function () {
        let updatedQuiz = [];
        let quizSize = this.model.getCount();
        
        for (let i = 0; i < quizSize; i++) {
            let correctAnswer = ""; // correct answer for each question
            //determine correct answer
            if (document.getElementById('q' + i + 'ans0').checked) {
                correctAnswer = document.getElementById('q' + i + 'ans0').id;
            } else if (document.getElementById('q' + i + 'ans1').checked) {
                correctAnswer = document.getElementById('q' + i + 'ans1').id;
            } else if (document.getElementById('q' + i + 'ans2').checked) {
                correctAnswer = document.getElementById('q' + i + 'ans2').id;
            } else if (document.getElementById('q' + i + 'ans3').checked) {
                correctAnswer = document.getElementById('q' + i + 'ans3').id;
            }


            updatedQuiz.push({
                description: document.getElementById("description" + i).value,
                answers:
                {
                    ans0: document.getElementById("q" + i + "option0").value,
                    ans1: document.getElementById("q" + i + "option1").value,
                    ans2: document.getElementById("q" + i + "option2").value,
                    ans3: document.getElementById("q" + i + "option3").value
                },
                correctAnswer: correctAnswer
            });
        }
        return updatedQuiz;
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
            $questionsContainer.append("Answers*<br>");
            $questionsContainer.append("<input type='radio' name='q" + index + "radio' id='q" + index + "ans0'><input type='text' id='" + "q" + index + "option0' value='" + questions[question].answers.ans0 + "'><br>");
            $questionsContainer.append("<input type='radio' name='q" + index + "radio' id='q" + index + "ans1'><input type='text' id='" + "q" + index + "option1' value='" + questions[question].answers.ans1 + "'><br>");
            $questionsContainer.append("<input type='radio' name='q" + index + "radio' id='q" + index + "ans2'><input type='text' id='" + "q" + index + "option2' value='" + questions[question].answers.ans2 + "'><br>");
            $questionsContainer.append("<input type='radio' name='q" + index + "radio' id='q" + index + "ans3'><input type='text' id='" + "q" + index + "option3' value='" + questions[question].answers.ans3 + "'>");
            index++;

            radiobtn = document.getElementById(questions[question].correctAnswer);
            if (radiobtn != null){
                radiobtn.checked = true;
            }
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