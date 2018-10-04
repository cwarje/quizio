// The admin view that displays the elements needed to create a quiz.
var AdminView = function (model) {
    this.model               = model;
    this.addQuestionEvent    = new Event(this);
    this.removeQuestionEvent = new Event(this);
    this.saveEvent           = new Event(this);

    this.init();
}

AdminView.prototype = {

    // Initializes the view.
    init: function () {
        this.createChildren()
            .setupHandlers()
            .enable()
            .updateGUI();
    },

    // Creates handles to elements on the DOM.
    createChildren: function () {
        this.$container            = $('.js-container');
        this.$questionsContainer   = this.$container.find('.questions-container');
        this.$addQuestionButton    = this.$container.find('.add-question-button');
        this.$removeQuestionButton = this.$container.find('.remove-question-button');
        this.$saveButton           = this.$container.find('.save-button');

        return this;
    },

    // Sets up handlers.
    setupHandlers: function () {
        this.addQuestionButtonHandler    = this.addQuestionButton.bind(this);
        this.removeQuestionButtonHandler = this.removeQuestionButton.bind(this);
        this.saveButtonHandler           = this.saveButton.bind(this);

        // Handlers from Event Dispatcher.
        this.addQuestionHandler    = this.addQuestion.bind(this);
        this.removeQuestionHandler = this.removeQuestion.bind(this);
        this.saveHandler           = this.save.bind(this);

        return this;
    },

    // Adds handlers to button events and model events.
    enable: function () {
        this.$addQuestionButton.click(this.addQuestionButtonHandler);
        this.$removeQuestionButton.click(this.removeQuestionButtonHandler);
        this.$saveButton.click(this.saveButtonHandler);

        // Event Dispatcher
        this.model.addQuestionEvent.attach(this.addQuestionHandler);
        this.model.removeQuestionEvent.attach(this.removeQuestionHandler);
        this.model.saveEvent.attach(this.saveHandler);

        return this;
    },

    // Refreshes the GUI.
    updateGUI: function () {
        this.show();
    },

    // Collects the user entered questions and triggers the
    // add question event listeners, providing the updated quiz.
    addQuestionButton: function () {
        let updatedQuiz = this.scrapeModifiedQuiz();
        this.addQuestionEvent.notify(updatedQuiz);
    },

    // Triggers the remove question event listeners.
    removeQuestionButton: function () {
        this.removeQuestionEvent.notify();
    },

    // Collects the user entered questions and triggeres the
    // save event listeners, providing the updated quiz.
    saveButton: function () {
        let updatedQuiz = this.scrapeModifiedQuiz();
        this.saveEvent.notify(updatedQuiz);
    },

    // Builds a JSON object from the current user visible values.
    scrapeModifiedQuiz: function () {
        let updatedQuiz = [];
        let quizSize = this.model.getCount();
        
        for (let i = 0; i < quizSize; i++) {
            let correctAnswer = "";

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

    // Shows the question list.
    show: function () {
        this.buildQuestionList();
    },

    // Builds the list of questions and adds them to the DOM.
    buildQuestionList: function () {
        let questions           = this.model.getQuestions();
        let $questionsContainer = this.$questionsContainer;

        $questionsContainer.html('');

        for (var index in questions) {

            let cardTemplate = `
            <div class='card'>
                <div class='card-body'>
                <form>
                    <div class="form-group">
                        <label for="description${index}">Question*</label><br>
                        <input type='text' id='description${index}' value='${questions[index].description}'>
                    </div>
                    <div class="form-group">
                        <label for="q${index}ans0">Answers*</label><br>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="q${index}radio" id="q${index}ans0">
                            <label class="form-check-label" for="q${index}ans0">
                                <input type="text" id="q${index}option0" value="${questions[index].answers.ans0}">
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="q${index}radio" id="q${index}ans1">
                            <label class="form-check-label" for="q${index}ans1">
                                <input type="text" id="q${index}option1" value="${questions[index].answers.ans1}">
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="q${index}radio" id="q${index}ans2">
                            <label class="form-check-label" for="q${index}ans2">
                                <input type="text" id="q${index}option2" value="${questions[index].answers.ans2}">
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="q${index}radio" id="q${index}ans3">
                            <label class="form-check-label" for="q${index}ans3">
                                <input type="text" id="q${index}option3" value="${questions[index].answers.ans3}">
                            </label>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
            `;

            $questionsContainer.append(cardTemplate);

            // To maintain the admin's correct answers
            radiobtn = document.getElementById(questions[index].correctAnswer);
            if (radiobtn != null){
                radiobtn.checked = true;
            }

        }
    },

    /* --------Handlers-From-Event-Dispatcher--------- */

    // Shows the result of adding a question.
    addQuestion: function () {
        this.show();
    },

    // Shows the result of removing a question.
    removeQuestion: function () {
        this.show();
    },

    // Shows the result of saving.
    save: function () {
        this.show();
    }
    /* --------End-Handlers-From-Event-Dispatcher--------- */

}