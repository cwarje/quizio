// User Application
$(function () {
    var model = new UserModel(),
        view = new UserView(model),
        controller = new UserController(model, view);
});