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

    statsDom: null,
    statsId: "global-stats",

    composersDom: null,
    composersId: "composer-stats",

    messagesDom: null,
    messagesId: "message-area",
    messageTime: 5000,


    /**
     * Main
     */

    init: function() {

        var scope = this;

        scope.pieceDom = document.getElementById( scope.pieceId );
        scope.statsDom = document.getElementById( scope.statsId );
        scope.composersDom = document.getElementById( scope.composersId );
        scope.messagesDom = document.getElementById( scope.messagesId );

        scope.templater = new Templater({
            templates: scope.templates
        });

        scope.templater.compile( function() {

            scope.setupStats();
            scope.setupComposerStats();

        });


        //Game created event display

        scope.Music.on( "note-created", function( result ) {

        });


        //Game created message

        scope.Music.on( "user-note-created", function( result ) {

            scope.setMessage( "You created a note!" );

        });

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

            console.log( template );

            ABCJS.renderAbc( scope.pieceId, template );

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
            "vex-composer-note"
        );
        var nl = notes.length;

        var opts = {};

        var width = 150;
        var height = 300;

        for( var i = 0; i < nl; ++ i ) {

            var note = notes[ i ];
            note.setAttribute( "width", width );

            var tab = new VexTabDiv.Div( note, opts );

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
