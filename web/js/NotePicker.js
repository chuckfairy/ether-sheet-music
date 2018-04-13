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
    beatClass: "note-picker-beat",
    beatArea: null,
    beatHTML: "",

    beatAddId: "note-picker-add-beat",

    noteId: "note-picker-note",
    noteArea: null,
    noteHTML: "",

    beats: [],


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

        scope.setAddEvents();

        scope.setBeatEvents( scope.beatArea );

    },


    /**
     * Set global events
     */

    setAddEvents: function() {

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

            scope.setCloseButtonEvents(
                noteDiv,
                EM.EditorHelper.closeNoteBtnClass
            );

            noteArea.appendChild( noteDiv );

        };

        scope.setChangeEvents( div );

        scope.setCloseButtonEvents( div, EM.EditorHelper.closeBtnClass );
        scope.setBeatNoteEvents( div );

    },


    /**
     * Change event dispatcher
     */

    setChangeEvents: function( div ) {

        var scope = this;

        var inputs = div.getElementsByTagName( "select" );
        var il = inputs.length;

        for( var i = 0; i < il; ++ i ) {

            changeSetup( inputs[ i ] );

        }

        function changeSetup( input ) {

            input.onchange = function() {

                EM.EditorHelper.checkRandom( input );

                scope.dispatch({ type: "change" });

            };

        }

    },


    /**
     * Close button events
     */

    setCloseButtonEvents: function( div, className ) {

        var scope = this;

        var btns = div.getElementsByClassName( className );
        var bl = btns.length;

        for( var i = 0; i < bl; ++ i ) {

            setBtnEvent( btns[ i ] );

        }

        function setBtnEvent( btn ) {

            btn.onclick = function() {

                scope.removeBeat( div );

            };

        }

    },


    /**
     * Note close for initial beat creation
     */

    setBeatNoteEvents: function( div ) {

        var scope = this;

        var btns = div.getElementsByClassName( EM.EditorHelper.closeNoteBtnClass );

        scope.setCloseButtonEvents(
            btns[ 0 ].parentNode.parentNode.parentNode.parentNode,
            EM.EditorHelper.closeNoteBtnClass
        );

    },


    /**
     * Render ABC notation
     */

    getABC: function() {

        var scope = this;

        var beatDivs = scope.area.getElementsByClassName( scope.beatClass );
        var beats = [];

        var bl = beatDivs.length;

        for( var i = 0; i < bl; ++ i ) {

            var beat = beatDivs[ i ];
            beats.push( scope.getABCFromBeat( beat ) );

        }

        return beats;

    },


    /**
     * Get abc from beat div
     */

    getABCFromBeat: function( beat ) {

        var scope = this;

        var length = 0,
            notes = [];

        var inputs = beat.getElementsByTagName( "select" );
        var il = inputs.length;

        for( var i = 0; i < il; ++ i ) {

            var input = inputs[ i ];

            if( input.value === "" ) { continue; }

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

        scope.dispatch({ type: "change" });

    },


    /**
     * Remove beat helper
     */

    removeBeat: function( div ) {

        var scope = this;

        EM.EditorHelper.removeNode( div );

        scope.dispatch({ type: "change" });

    },


    /**
     * Get args for final output to contract
     */

    getArgs: function() {

        var scope = this;

        return EM.EditorHelper.getArgs( scope.getABC() );

    },


    /**
     * Inputs required changer
     */

    setRequired: function( required ) {

        var scope = this;

        EM.EditorHelper.setRequired( scope.area, required );

    }

};

EventDispatcher.prototype.apply( EM.NotePicker.prototype );
