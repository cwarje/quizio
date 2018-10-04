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
        let finishedQuizAnswers = [];
        let quizSize = this.model.getCount();

        for (let i = 0; i < quizSize; i++) {
            let chosenAnswer = ""; // correct answer for each question
            //determine correct answer
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
                    correctAnswer: this.model.getCorrectAnswer(i), // get the correct answer at the index from the quiz that's in the model.
                    chosenAnswer: chosenAnswer
                });
        }
        return finishedQuizAnswers;
    },
    
    show: function () {
        this.buildQuiz();
    },

    showMarkedQuiz: function () {
        let quiz = this.model.retrieveQuiz();
        let numQuestions = this.model.getCount();
        
        let $quizContainer = this.$quizContainer;
        $quizContainer.html('');
        let index = 0;
        for(let question = 0; question < numQuestions; question++){

            let correctAnswer = this.model.getCorrectAnswer(index);
            console.log("Correct: " + correctAnswer);

            let chosenAnswer = this.model.getChosenAnswer(index);
            console.log("Chosen: " + chosenAnswer);

            let label0 = `<label class="form-check-label" for="q${index}ans0">`
            let label1 = `<label class="form-check-label" for="q${index}ans1">`
            let label2 = `<label class="form-check-label" for="q${index}ans2">`
            let label3 = `<label class="form-check-label" for="q${index}ans3">`

            if (chosenAnswer != correctAnswer && chosenAnswer === `q${index}ans0`) {
                label0 = `<label class="form-check-label" for="q${index}ans0" style="color:red">`
            
            } else if (chosenAnswer != correctAnswer && chosenAnswer === `q${index}ans1`) {
                label1 = `<label class="form-check-label" for="q${index}ans1" style="color:red">`

            } else if (chosenAnswer != correctAnswer && chosenAnswer === `q${index}ans2`) {
                label2 = `<label class="form-check-label" for="q${index}ans2" style="color:red">`

            } else if (chosenAnswer != correctAnswer && chosenAnswer === `q${index}ans3`) {
                label3 = `<label class="form-check-label" for="q${index}ans3" style="color:red">`

            }

            //determine the 4 variables.
            if (correctAnswer === `q${index}ans0`){
                label0 = `<label class="form-check-label" for="q${index}ans0" style="color:green">`


            } else if (correctAnswer === `q${index}ans1`) {
                label1 = `<label class="form-check-label" for="q${index}ans1" style="color:green">`


            } else if (correctAnswer === `q${index}ans2`) {
                label2 = `<label class="form-check-label" for="q${index}ans2" style="color:green">`


            } else if (correctAnswer === `q${index}ans3`) {
                label3 = `<label class="form-check-label" for="q${index}ans3" style="color:green">`


            }
            
            


            let cardTemplate = `
            <div class='card'>
                <div class='card-body'>
                <form>
                    <h5 class='card-title'>${quiz[question].description}</h5>
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="q${index}radio" id="q${index}ans0">
                            ${label0}
                                ${quiz[question].answers.ans0}
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="q${index}radio" id="q${index}ans1">
                            ${label1}
                                ${quiz[question].answers.ans1}
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="q${index}radio" id="q${index}ans2">
                            ${label2}
                                ${quiz[question].answers.ans2}
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="q${index}radio" id="q${index}ans3">
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
            index++;

            radiobtn = document.getElementById(chosenAnswer);
            if (radiobtn != null) {
                radiobtn.checked = true;
            }
        }
    },


    buildQuiz: function () {
        let quiz = this.model.retrieveQuiz();
        //console.log(quiz);
        let html = "";
        let $quizContainer = this.$quizContainer;

        $quizContainer.html('');

        let index = 0;
        for(var question in quiz) {

            let cardTemplate = `
            <div class='card'>
                <div class='card-body'>
                <form>
                    <h5 class='card-title'>${quiz[question].description}</h5>
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="q${index}radio" id="q${index}ans0">
                            <label class="form-check-label" for="q${index}ans0">
                                ${quiz[question].answers.ans0}
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="q${index}radio" id="q${index}ans1">
                            <label class="form-check-label" for="q${index}ans1">
                                ${quiz[question].answers.ans1}
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="q${index}radio" id="q${index}ans2">
                            <label class="form-check-label" for="q${index}ans2">
                                ${quiz[question].answers.ans2}
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="q${index}radio" id="q${index}ans3">
                            <label class="form-check-label" for="q${index}ans3">
                                ${quiz[question].answers.ans3}
                            </label>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
            `;

            $quizContainer.append(cardTemplate);

            index++;
        }
    },

    /* --------Handlers-From-Event-Dispatcher--------- */
    submit: function () {
        this.showMarkedQuiz();
    }
    /* --------End-Handlers-From-Event-Dispatcher--------- */

}