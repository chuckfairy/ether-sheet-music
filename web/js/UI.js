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
        "global-stats.html"
    ],

    statsDom: null,
    statsId: "music-stats",

    messagesDom: null,
    messagesId: "message-area",
    messageTime: 5000,


    /**
     * Main
     */

    init: function() {

        var scope = this;

        scope.waitingDom = document.getElementById( scope.waitingId );
        scope.messagesDom = document.getElementById( scope.messagesId );

        scope.templater = new Templater({
            templates: scope.templates
        });

        scope.templater.compile( function() {

            scope.setupStats();

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
     * Stats setup
     */

    setupStats: function() {

        var scope = this;

        scope.Music.getStats( function( stats ) {

            console.log( stats );

            var vars = {
                stats: {
                    goal: web3.fromWei( stats[ 0 ].toNumber(), "ether" ),
                    min: web3.fromWei( stats[ 1 ].toNumber(), "ether" ),
                    current: web3.fromWei( stats[ 2 ].toNumber(), "ether" )
                }
            };

            scope.templater.render( "global-stats.html", vars, function( template ) {

                var div = document.getElementById( "global-stats" );
                div.innerHTML = template;

            });

        });

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
