/**
 * Sequencer note picker
 */
"use strict";

EM.Sequencer = function() {

    var scope = this;

    scope.beats = [];

    scope.init();

};

EM.Sequencer.prototype = {

    construct: EM.Sequencer,


    /**
     * Props
     */

    beats: [],

    areaId: "sequencer-area",
    area: null,

    beatId: "sequencer-beat",
    beatClass: "sequencer-beat",
    beatArea: null,
    beatHTML: "",

    beatAddId: "sequencer-add-beat",

    noteClass: "sequencer-note",
    noteActiveClass: "sequencer-note-active",
    noteArea: null,
    noteHTML: "",


    /**
     * Main setup
     */

    init: function() {

        var scope = this;

        scope.area = document.getElementById( scope.areaId );

        scope.beatArea = document.getElementById( scope.beatId );
        scope.beatHTML = scope.beatArea.outerHTML;

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
     * Add beat main
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
     * Set beat events
     */

    setBeatEvents: function( div ) {

        var scope = this;


        //Note clicks

        var notes = div.getElementsByClassName( scope.noteClass );
        var nl = notes.length;

        for( var i = 0; i < nl; ++ i ) {

            noteSetup( notes[ i ] );

        }

        function noteSetup( note ) {

            note.onclick = function() {

                if( note.className === scope.noteActiveClass ) {

                    var thisNoteClass = note.getAttribute( "data-class" );
                    note.className = scope.noteClass + " " + thisNoteClass;

                } else {

                    note.className = scope.noteActiveClass;

                }

                scope.dispatch({ type: "change" });

            };

        }


        //Note length selector

        var selector = div.getElementsByTagName( "select" );
        selector = selector[ 0 ];

        selector.onchange = function() {

            EM.EditorHelper.checkRandom( selector );

            scope.dispatch({ type: "change" });

        }

        scope.setCloseButtonEvents( div );

    },


    /**
     * Close button events
     */

    setCloseButtonEvents: function( div ) {

        var scope = this;

        var btns = div.getElementsByClassName( EM.EditorHelper.closeBtnClass );
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
     * ABC render
     */

    getABC: function() {

        var scope = this;

        var beatDivs = scope.area.getElementsByClassName( scope.beatClass );
        var beats = [];

        var bl = beatDivs.length;

        for( var i = 0; i < bl; ++ i ) {

            beats.push( scope.getABCFromBeat( beatDivs[ i ] ) );

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

        var lengthSelector = beat.getElementsByTagName( "select" );
        length = lengthSelector[ 0 ].value | 0;

        var activeNotes = beat.getElementsByClassName( scope.noteActiveClass );
        var al = activeNotes.length;

        for( var i = 0; i < al; ++ i ) {

            var note = activeNotes[ i ];

            notes.push( note.getAttribute( "data-id" ) | 0 );

        }

        return {
            length: length,
            notes: notes
        };

    },


    /**
     * Get args for final output to contract
     */

    getArgs: function( beats ) {

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


//Dispatcher extend

EventDispatcher.prototype.apply( EM.Sequencer.prototype );
