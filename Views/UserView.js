var UserView = function (model) {
    this.model       = model;
    this.submitEvent = new Event(this);
    this.noQuizEvent = new Event(this);

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
        this.$container     = $('.js-container');
        this.$quizContainer = this.$container.find('.quiz-container');
        this.$submitButton  = this.$container.find('.submit-button');
        this.$errorMessage  = this.$container.find('.error-message');

        return this;
    },

    setupHandlers: function () {
        this.submitButtonHandler = this.submitButton.bind(this);

        // Handlers from Event Dispatcher
        this.submitHandler = this.submit.bind(this);
        this.noQuizHandler = this.noQuizError.bind(this);

        return this;
    },

    enable: function () {
        this.$submitButton.click(this.submitButtonHandler);

        // Event Dispatcher
        this.model.submitEvent.attach(this.submitHandler);
        this.model.noQuizEvent.attach(this.noQuizHandler);

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
        let finishedQuizAnswers = [];
        let quizSize            = this.model.getCount();

        for (let i = 0; i < quizSize; i++) {

            let chosenAnswer = "";
            
            if (document.getElementById('q' + i + 'ans0').checked) {
                chosenAnswer = document.getElementById('q' + i + 'ans0').id;
            } else if (document.getElementById('q' + i + 'ans1').checked) {
                chosenAnswer = document.getElementById('q' + i + 'ans1').id;
            } else if (document.getElementById('q' + i + 'ans2').checked) {
                chosenAnswer = document.getElementById('q' + i + 'ans2').id;
            } else if (document.getElementById('q' + i + 'ans3').checked) {
                chosenAnswer = document.getElementById('q' + i + 'ans3').id;
            }

            finishedQuizAnswers.push(
                {
                    correctAnswer: this.model.getCorrectAnswer(i),
                    chosenAnswer: chosenAnswer
                });
        }

        return finishedQuizAnswers;
    },
    
    show: function () {
        this.buildQuiz();
    },

    showNoQuizError: function () {
        let message                = this.model.getErrorMessage();
        let $errorMessageContainer = this.$errorMessage;
        let messageTemplate        = `<h4>${message}</h4>`;

        $errorMessageContainer.html('');
        $errorMessageContainer.append(messageTemplate);
    },

    buildMarkedQuiz: function () {
        let quiz           = this.model.retrieveQuiz();
        let numQuestions   = this.model.getCount();
        let $quizContainer = this.$quizContainer;

        $quizContainer.html('');

        for(let question = 0; question < numQuestions; question++){

            let correctAnswer = this.model.getCorrectAnswer(question);
            let chosenAnswer  = this.model.getChosenAnswer(question);

            let label0 = `<label class="form-check-label" for="q${question}ans0">`
            let label1 = `<label class="form-check-label" for="q${question}ans1">`
            let label2 = `<label class="form-check-label" for="q${question}ans2">`
            let label3 = `<label class="form-check-label" for="q${question}ans3">`

            if (chosenAnswer != correctAnswer && chosenAnswer === `q${question}ans0`) {
                label0 = `<label class="form-check-label" for="q${question}ans0" style="color:red">`
            } else if (chosenAnswer != correctAnswer && chosenAnswer === `q${question}ans1`) {
                label1 = `<label class="form-check-label" for="q${question}ans1" style="color:red">`
            } else if (chosenAnswer != correctAnswer && chosenAnswer === `q${question}ans2`) {
                label2 = `<label class="form-check-label" for="q${question}ans2" style="color:red">`
            } else if (chosenAnswer != correctAnswer && chosenAnswer === `q${question}ans3`) {
                label3 = `<label class="form-check-label" for="q${question}ans3" style="color:red">`
            }

            if (correctAnswer === `q${question}ans0`){
                label0 = `<label class="form-check-label" for="q${question}ans0" style="color:green">`
            } else if (correctAnswer === `q${question}ans1`) {
                label1 = `<label class="form-check-label" for="q${question}ans1" style="color:green">`
            } else if (correctAnswer === `q${question}ans2`) {
                label2 = `<label class="form-check-label" for="q${question}ans2" style="color:green">`
            } else if (correctAnswer === `q${question}ans3`) {
                label3 = `<label class="form-check-label" for="q${question}ans3" style="color:green">`
            }
            
            let cardTemplate = `
                <div class='card'>
                    <div class='card-body'>
                    <form>
                        <h5 class='card-title'>${quiz[question].description}</h5>
                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="q${question}radio" id="q${question}ans0">
                                ${label0}
                                    ${quiz[question].answers.ans0}
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="q${question}radio" id="q${question}ans1">
                                ${label1}
                                    ${quiz[question].answers.ans1}
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="q${question}radio" id="q${question}ans2">
                                ${label2}
                                    ${quiz[question].answers.ans2}
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="q${question}radio" id="q${question}ans3">
                                ${label3}
                                    ${quiz[question].answers.ans3}
                                </label>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            `;

            $quizContainer.append(cardTemplate);

            // To maintain the user's answers
            radiobtn = document.getElementById(chosenAnswer);
            if (radiobtn != null) {
                radiobtn.checked = true;
            }
        }
    },

    buildQuiz: function () {
        let quiz           = this.model.retrieveQuiz();
        let $quizContainer = this.$quizContainer;

        $quizContainer.html('');

        for(var question in quiz) {

            let cardTemplate = `
            <div class='card'>
                <div class='card-body'>
                <form>
                    <h5 class='card-title'>${quiz[question].description}</h5>
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="q${question}radio" id="q${question}ans0">
                            <label class="form-check-label" for="q${question}ans0">
                                ${quiz[question].answers.ans0}
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="q${question}radio" id="q${question}ans1">
                            <label class="form-check-label" for="q${question}ans1">
                                ${quiz[question].answers.ans1}
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="q${question}radio" id="q${question}ans2">
                            <label class="form-check-label" for="q${question}ans2">
                                ${quiz[question].answers.ans2}
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="q${question}radio" id="q${question}ans3">
                            <label class="form-check-label" for="q${question}ans3">
                                ${quiz[question].answers.ans3}
                            </label>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
            `;

            $quizContainer.append(cardTemplate);
        }
    },

    /* --------Handlers-From-Event-Dispatcher--------- */
    submit: function () {
        this.buildMarkedQuiz();
    },

    noQuizError: function () {
        this.showNoQuizError();
    },
    /* --------End-Handlers-From-Event-Dispatcher--------- */
}