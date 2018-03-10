/**
 * Note picker UI
 */
"use strict";


EM.NotePicker = function() {

    var scope = this;

    scope.beats = [];

};

EM.NotePicker.prototype = {

    construct: EM.NotePicker,

    areaId: "note-picker-area",
    area: null,

    beats: [],

    noteLengthInputs: [],


    /**
     * Main
     */

    init: function() {

        var scope = this;

        scope.area = document.getElementById( scope.areaId );

    },


    //Render ABC notation

    render: function() {

    },


    /**
     * Get args for final output to contract
     */

    getArgs: function() {

        var midi = [];
        var dividers = [];
        var lengths = [];

        return [
            midi,
            dividers,
            lengths
        ];

    }

};
