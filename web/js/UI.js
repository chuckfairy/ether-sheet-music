/**
 * UI setup
 *
 * @requires [ Templater, async ]
 *
 */
"use strict";

EM.UI = function( music ) {

    var scope = this;

    scope.Music = music;

    scope.init();

};

EM.UI.prototype = {

    /**
     * Props
     */

    Music: null,

    templater: null,

    templates: [
        "composer-note.html",
        "global-stats.html",
        "vextab-piece.html"
    ],

    pieceDom: null,
    pieceId: "music-piece",
    pieceMidiPlayId: "music-piece-midi",
    pieceMidiDownloadId: "music-piece-midi-download",

    statsDom: null,
    statsId: "global-stats",

    composersDom: null,
    composersId: "composer-stats",

    messagesDom: null,
    messagesId: "message-area",
    messageTime: 5000,

    newNoteCreated: false,


    /**
     * Main
     */

    init: function() {

        var scope = this;

        scope.pieceDom = document.getElementById( scope.pieceId );
        scope.statsDom = document.getElementById( scope.statsId );
        scope.composersDom = document.getElementById( scope.composersId );
        scope.messagesDom = document.getElementById( scope.messagesId );

        setTimeout( scope.setupAddressHeader, 250 );

        scope.setupCreateForm();

        scope.templater = new Templater({
            templates: scope.templates
        });

        scope.templater.compile( function() {

            scope.setupStats();
            scope.setupComposerStats();

        });


        //Game created event display

        scope.Music.on( "note-created", function( result ) {

            scope.setupNewNote( result.data.id );

        });


        //Game created message

        scope.Music.on( "user-note-created", function( result ) {

            scope.setMessage( "You created a note!" );

        });

    },


    /**
     * Address header
     */

    setupAddressHeader: function() {

        var header = document.getElementById( "address-section" );
        header.innerHTML = web3.eth.defaultAccount;

    },


    /**
     * Stats global setup
     */

    setupStats: function() {

        var scope = this;

        scope.Music.getStats( function( stats ) {

            var vars = {
                stats: {
                    goal: web3.fromWei( stats[ 0 ].toNumber(), "ether" ),
                    min: web3.fromWei( stats[ 1 ].toNumber(), "ether" ),
                    current: web3.fromWei( stats[ 2 ].toNumber(), "ether" )
                }
            };

            scope.templater.render( "global-stats.html", vars, function( template ) {

                scope.statsDom.innerHTML = template;

            });

            var percentRaised = Math.ceil( ( vars.stats.current / vars.stats.goal ) * 100 );
            var donationRaisedDiv = document.getElementById( "donation-top-raised" );
            donationRaisedDiv.innerHTML = percentRaised + "% Raised";

            var fillBar = document.getElementById( "donation-bar-fill" );
            fillBar.style.width = percentRaised + "%";

            //Create form min
            var minArea = document.getElementById( "donation-min-form" );
            minArea.innerHTML = vars.stats.min;

        });

    },


    /**
     * Setup composer stats
     */

    setupComposerStats: function() {

        var scope = this;

        scope.Music.getComposerStats( function( composers ) {

            scope.renderPiece( composers );

            scope.composersDom.innerHTML = "";

            scope.renderComposerNotes( composers );


            //Setup listeners after everything loaded

            scope.Music.setupListeners();

        });

    },


    /**
     * Create form event setup
     */

    setupCreateForm: function() {

        var scope = this;

        //Create form

        var createForm = document.getElementById( "create-note-form" );

        var donation = document.getElementById( "donation" );
        var noteNumber = document.getElementById( "note-midi" );
        var noteLength = document.getElementById( "note-length" );


        //Main submit

        createForm.onsubmit = function( e ) {

            e.preventDefault();

            //Launch contract call

            scope.Music.createNote(
                donation.value,
                noteNumber.value,
                noteLength.value
            );

        }

    },


    /**
     * New note event setup new piece and new composer add
     */

    setupNewNote: function( id ) {

        var scope = this;

        scope.setMessage( "A new note as been created #" + id + "!" );

        if( ! scope.newNoteCreated ) {

            var alertDiv = document.getElementById( "music-changed-alert" );
            alertDiv.style.display = "block"
            scope.newNoteCreated = true;

        }

        scope.Music.getNote( id, function( note ) {

            scope.renderComposerNotes( [ note ] );

            scope.renderPiece(
                Object.values( scope.Music.notesLoaded )
            );

        });

    },


    /**
     * Render the piece
     */

    renderPiece: function( notes ) {

        var scope = this;

        var vars = {
            notes: notes
        };

        scope.templater.render( "abc-piece.html", vars, function( template ) {

            //Render piece

            var pieceOpts = { responsive: "resize" };

            ABCJS.renderAbc( scope.pieceId, template, pieceOpts, pieceOpts, pieceOpts );


            //Midi setup

            var downloadOpts = {
                generateDownload: true,
                generateInline: false
            };

			ABCJS.renderMidi( scope.pieceMidiPlayId, template );
			ABCJS.renderMidi(
                scope.pieceMidiDownloadId,
                template,
                {},
                downloadOpts
            );

        });

    },


    /**
     * Individual composer notes
     */

    renderComposerNotes: function( composers ) {

        var scope = this;

        var vars = {
            composers: composers
        };

        scope.templater.render( "composer-note.html", vars, function( template ) {

            scope.composersDom.insertAdjacentHTML(
                "beforeend",
                template
            );

            scope.setupComposerVexTab();

        });

    },


    /**
     * Set vextab sheet music
     */

    setupComposerVexTab: function() {

        var scope = this;

        var notes = scope.composersDom.getElementsByClassName(
            "abc-composer-note"
        );
        notes = Array.prototype.slice.call( notes );
        var nl = notes.length;

        var opts = {};

        var width = 150;
        var height = 300;

        for( var i = 0; i < nl; ++ i ) {

            var note = notes[ i ];

            var abc = note.getAttribute( "data-note" );

            ABCJS.renderAbc( note, abc );

            note.className = "";

        }

    },


    /**
     * Main messages actions
     */

    setMessage: function( text ) {

        var scope = this;

        scope.messagesDom.innerHTML = text;
        scope.messagesDom.style.display = "block";

        setTimeout( function() {

            scope.messagesDom.innerHTML = "";
            scope.messagesDom.style.display = "none";

        }, scope.messageTime );

    }

};
