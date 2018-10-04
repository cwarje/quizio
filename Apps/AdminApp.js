// Admin Application
$(function () {
    var model = new AdminModel(),
        view = new AdminView(model),
        controller = new AdminController(model, view);
});