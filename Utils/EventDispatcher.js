var Event = function (sender) {
    this._sender = sender;
    this._listeners = [];
}

Event.prototype = {

    // Adds the specified function to an array of functions to be executed when notify is called.
    attach: function (listener) {
        this._listeners.push(listener);
    },

    // Runs all the functions in this._listeners.
    notify: function (args) {
        for (var i = 0; i < this._listeners.length; i += 1) {
            this._listeners[i](this._sender, args);
        }
    }

};