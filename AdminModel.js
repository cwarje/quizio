var AdminModel = function () {
    this.questions = [{
        description: "",
        answers:
        {
            ans1: "",
            ans2: "",
            ans3: "",
            ans4: ""
        },
        correctAnswer: ""
    }];
    this.addQuestionEvent = new Event();
    this.removeQuestionEvent = new Event();
    // there will be a save quiz event here later.
    //maybe keep a global variable of the number of questions, changing when delete is pressed and when add is pressed, to make the iterating easier? we'll see.
};

AdminModel.prototype = {
    addQuestion: function () {
        this.questions.push({
            description: "",
            answers:
                {
                    ans1:"",
                    ans2:"",
                    ans3:"",
                    ans4:""
                },
            correctAnswer:""
        });
        this.addQuestionEvent.notify();
    },

    removeQuestion: function () {
        this.questions.pop();
        this.removeQuestionEvent.notify();
    },

    getQuestions: function () {
        console.log(this.questions);
        return this.questions;
    }


}


