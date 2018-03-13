/**
 * Note picker UI
 */
"use strict";


EM.NotePicker = function() {

    var scope = this;

    scope.beats = [];

    scope.init();

};

EM.NotePicker.prototype = {

    construct: EM.NotePicker,

    areaId: "note-picker-area",
    area: null,

    beatId: "note-picker-beat",
    beatArea: null,
    beatHTML: "",

    beatAddId: "note-picker-add-beat",

    noteId: "note-picker-note",
    noteArea: null,
    noteHTML: "",

    beats: [],

    noteLengthInputs: [],


    /**
     * Main
     */

    init: function() {

        var scope = this;

        scope.area = document.getElementById( scope.areaId );

        scope.beatArea = document.getElementById( scope.beatId );
        scope.beatHTML = scope.beatArea.outerHTML;

        scope.noteArea = document.getElementById( scope.noteId );
        scope.noteHTML = scope.noteArea.outerHTML;

        scope.setEvents();

        scope.setBeatEvents( scope.beatArea );

    },


    /**
     * Set global events
     */

    setEvents: function() {

        var scope = this;
        var btn = document.getElementById( scope.beatAddId );

        btn.onclick = function() {

            scope.addBeat();

        };

    },


    /**
     * Set beat specific events after add
     */

    setBeatEvents: function( div ) {

        var scope = this;

        var noteArea = div.getElementsByClassName( "note-picker-note-area" );
        noteArea = noteArea[ 0 ];

        var noteAddBtn = div.getElementsByClassName( "note-picker-add-note" );
        noteAddBtn = noteAddBtn[ 0 ];

        noteAddBtn.onclick = function() {

            var noteDiv = document.createElement( "div" );
            noteDiv.innerHTML = scope.noteHTML;

            scope.setChangeEvents( noteDiv );

            noteArea.appendChild( noteDiv );

        };

        scope.setChangeEvents( div );

        scope.beats.push( div );

    },


    /**
     * Change event dispatcher
     */

    setChangeEvents: function( div ) {

        var scope = this;

        var inputs = div.getElementsByTagName( "input" );
        var il = inputs.length;

        for( var i = 0; i < il; ++ i ) {

            changeSetup( inputs[ i ] );

        }

        function changeSetup( input ) {

            input.onchange = function() {

                scope.dispatch({ type: "change" });

            };

        }

    },


    /**
     * Render ABC notation
     */

    getABC: function() {

        var scope = this;

        var beats = [];

        var bl = scope.beats.length;

        for( var i = 0; i < bl; ++ i ) {

            var beat = scope.beats[ i ];
            beats.push( scope.getABCFromBeat( beat ) );

        }

        return beats;

    },


    /**
     * Get abc from beat div
     */

    getABCFromBeat: function( beat ) {

        var length = 0,
            notes = [];

        var inputs = beat.getElementsByTagName( "input" );
        var il = inputs.length;

        for( var i = 0; i < il; ++ i ) {

            var input = inputs[ i ];
            var val = input.value | 0;
            var name = input.getAttribute( "name" );

            if( name === "note-length" ) {

                length = val;

            } else {

                notes.push( val );

            }

        }

        return {
            length: length,
            notes: notes
        };

    },


    /**
     * Add beat
     */

    addBeat: function() {

        var scope = this;

        var div = document.createElement( "div" );
        div.innerHTML = scope.beatHTML;

        scope.setBeatEvents( div );

        scope.area.appendChild( div );

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

EventDispatcher.prototype.apply( EM.NotePicker.prototype );
