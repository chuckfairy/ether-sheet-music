/**
 * UI setup
 *
 * @requires [ Templater, async ]
 *
 */
"use strict";

EC.UI = function( game ) {

    var scope = this;

    scope.Game = game;

    scope.gamesAdded = {};

    scope.init();

};

EC.UI.prototype = {

    /**
     * Props
     */

    Game: null,

    templater: null,

    templates: [
        "move-viewer.html",
        "players-waiting.html"
    ],

    gamesAdded: {},

    waitingDom: null,
    waitingId: "games-waiting",

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

            scope.initGamesWaiting();

        });


        //Game created event display

        scope.Game.on( "game-created", function( result ) {

            scope.loadWaitingContent(
                result.data.args.gameId.toNumber()
            );

        });


        //Game created message

        scope.Game.on( "user-game-created", function( result ) {

            scope.setMessage( "You created a game" );

        });


        //Game accepted

        scope.Game.on( "game-accepted", function( result ) {

            scope.setMessage(
                "Your game has been accepted, have fun! # " + result.data
            );

        });


        //Waitin for game state

        scope.Game.on( "waiting-for-game", function( result ) {

            scope.setMessage( "You are waiting on a game # " + result.data );

        });

    },


    /**
     * Games waiting content
     */

    initGamesWaiting: function() {

        var scope = this;

        var games = instance.getWaitingGames( loadGames );
        var gamesClean = [];

        function loadGames( err, games ) {

            if( err ) {

                throw err;

            }

            scope.loadWaitingContents( games );

        }

    },

    loadWaitingContents: function( games ) {

        var scope = this;

        if( games.length === 0 ) {

            return;

        }

        console.log( "Games Found " + games.length );

        async.eachSeries( games, function( item, callback ) {

            var gameId = item.toNumber();

            //Returns 0 bug
            //@TODO fix on the contract side

            if( gameId === 0 ) {

                callback();

                return;

            }

            scope.loadWaitingContent( gameId, callback );

        });

    },


    /**
     * Load single waiting game content
     */

    loadWaitingContent: function( gameId, callback ) {

        var scope = this;

        if( scope.gamesAdded[ gameId ] ) {

            callback && callback();

            return;

        }

        scope.gamesAdded[ gameId ] = true;

        var game = instance.getGame( gameId, function( err, game ) {

            if( err ) {

                throw err;

            }

            var gamesClean = [];

            gamesClean.push({
                creator: game[ 0 ],
                bet: web3.fromWei( game[ 1 ], "ether" ),
                waitTime: game[ 2 ],
                secondsPerMove: game[ 3 ],
                id: gameId
            });

            var vars = {
                games: gamesClean
            };

            scope.templater.render( "players-waiting.html", vars, function( template ) {

                var dom = Utils.domParse( template );

                scope.setupPlayersWaiting( dom );

                callback && callback();

            });

        });

    },


    //Player waiting button setup

    setupPlayersWaiting: function( dom ) {

        var scope = this;

        var btns = dom.getElementsByClassName( "play-player" );

        var bl = btns.length;

        for( var i = 0; i < bl; ++ i ) {

            var btn = btns[ i ];

            setupBtn( btn );

        }

        function setupBtn( btn ) {

            var addr = btn.getAttribute( "data-creator" );

            if( addr === web3.eth.defaultAccount ) {

                btn.innerHTML = "This is you";

                return;

            }

            var gameId = btn.getAttribute( "data-id" );
            var gameBet = btn.getAttribute( "data-bet" );


            function play() {

                var trans = {
                    value: web3.toWei( gameBet, "ether" )
                };

                instance.play( gameId, trans, function( err, res ) {

                    if( err ) {

                        throw err;

                    }

                    scope.Game.init( gameId );

                });

            }

            btn.onclick = play;

        }

        scope.waitingDom.appendChild( dom );

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
