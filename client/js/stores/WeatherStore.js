var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');


var state = {};

var WeatherStore = assign({}, EventEmitter.prototype, {
    
    emitChange : function() {
        this.emit('change');
    },

    addChangeListener : function(callback) {
        this.on('change', callback);
    },

    removeChangeListener : function(callback) {
        this.removeListener('change', callback);
    },

    getState : function() {
        return state;
    },

    _handleDataChange : function(data) {
        state = data;
        WeatherStore.emitChange();
    }
});

WeatherStore.dispatchToken = AppDispatcher.register(function(action) {

    switch(action.type) {
        case ActionTypes.ACTION_WEATHER:
            WeatherStore._handleDataChange(action.data);
            break;
    }

});

module.exports = WeatherStore;
