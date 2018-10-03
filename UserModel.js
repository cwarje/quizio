var UserModel = function () {
    this.submitEvent = new Event();
};

UserModel.prototype = {

    retrieveQuiz: function () {
        if (typeof(Storage) !== "undefined") {
            let stringQuiz = localStorage.getItem("quiz");
            return JSON.parse(stringQuiz);
        } else {
            console.log("Browser does not support local storage.")
        }
    },

    submitQuiz: function (completedQuiz) {
        console.log(completedQuiz);
    },

}


