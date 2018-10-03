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
        this.show();
    }
    /* --------End-Handlers-From-Event-Dispatcher--------- */

}