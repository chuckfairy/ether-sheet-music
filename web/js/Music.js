/**
 * Music contract helper
 */
"use strict";

EM.Music = function() {

    var scope = this;

    scope.blockSearch = {
        fromBlock: "latest"
    };

    scope.notesLoaded = typeof( NOTES[ 1 ] ) !== "undefined" ? NOTES : null;

    scope.globalStats = GLOBAL_STATS || null;


    /**
     * Main note creator
     */

    scope.createNote = function( donation, note, noteLength ) {

        var trans = {
            value: web3.toWei( donation, "ether" )
        };

        instance.createNote( note, noteLength, trans, function( err, response ) {

            if( err ) {

                throw err;

            }

            scope.dispatch({
                type: "user-note-created",
                data: response
            });

        });

    }


    /**
     * Get stats helper
     */

    scope.getStats = function( callback ) {

        if( scope.globalStats ) {

            callback( scope.globalStats );
            return;

        }

        instance.getDonationStats( function( err, stats ) {

            scope.globalStats = {
                goal: web3.fromWei( stats[ 0 ].toNumber(), "ether" ),
                min: web3.fromWei( stats[ 1 ].toNumber(), "ether" ),
                current: parseFloat( web3.fromWei( stats[ 2 ].toNumber(), "ether" ) )
            };

            callback( scope.globalStats );

        });

    };


    /**
     * Load from cache or from web3 grabs
     */

    scope.setupComposers = function( callback ) {

        //Not from cache

        if( ! scope.notesLoaded ) {

            scope.notesLoaded = {};

            scope.getComposerStats( callback );

            return;

        }

        for( var noteId in scope.notesLoaded ) {

            var note = scope.notesLoaded[ noteId ];

            var noteData = scope.formatNote( noteId, note );

            scope.notesLoaded[ noteId ] = noteData;

        }

        callback( scope.notesLoaded );

    };


    /**
     * Composer stats
     */

    scope.getComposerStats = function( callback ) {

        instance.getNumberOfNotes( function( err, numNotes ) {

            var id = 1;

            var stats = [];

            var numNotes = numNotes.toNumber();

            async.eachSeries( new Array( numNotes ), function( item, itemCallback ) {

                scope.getNote( id, function( composer ) {

                    stats.push( composer );

                    ++ id;

                    itemCallback();

                });

            }, function() {

                callback && callback( stats );

            });

        });

    };


    /**
     * Main get note
     */

    scope.getNote = function( noteId, callback ) {

        if( scope.notesLoaded[ noteId ] ) {

            callback( scope.notesLoaded[ noteId ] );

        }

        instance.getNote( noteId, function( err, note ) {

            var noteData = scope.formatNote( noteId, note );

            scope.notesLoaded[ noteId ] = noteData;

            callback( noteData );

        });

    };


    /**
     * EVM listeners
     */

    scope.setupListeners = function() {

        var createEvent = instance.NoteCreated( {}, scope.blockSearch );

        createEvent.watch( function( err, note ) {

            note = note.args;

            var id = note.id.toNumber();


            //Already loaded

            if( scope.notesLoaded[ id ] ) {

                return;

            }

            var donation = parseFloat( web3.fromWei( note.donation.toNumber(), "ether" ) );

            scope.globalStats.current += donation;
            console.log( scope.globalStats.current, donation );

            scope.dispatch({
                type: "note-created",
                data: {
                    maker: note.maker,
                    id: id,
                    donation: donation
                }
            });

        });

    };


    /**
     * Format note for UI
     */

    scope.formatNote = function( noteId, note ) {

        var midi = note[ 1 ] | 0;
        var length = note[ 2 ] | 0;

        var midiData = Midi.NoteNumber[ midi ] || {};

        var midiABC = scope.convertMidiToABC( midiData.midi, length );
        var lengthABC = Midi.ABC.NoteLength[ length ];

        var noteData = {
            id: noteId,
            maker: note[ 0 ],
            midi: midi,
            midiData: midiData,
            abc: {
                note: midiABC,
            },
            length: length,
            lengthName: Midi.NoteLength[ length ],
            donation: EM.Shim.fromWei( note[ 3 ] )
        };

        return noteData;

    };


    /**
     * Conversion to midi / sheet music plugins
     */

    scope.convertMidiToABC = function( midiName, length ) {

        var abc = midiName.replace( /(\w)\#?(\d+)/, "\$1" );
        var midiNumber = midiName.replace( /.*?(\d+)/, "\$1" ) | 0;
        var sharp = midiName.indexOf( "#" ) !== -1;

        var lengthABC = Midi.ABC.NoteLength[ length ];


        //Uppercase if over middle 4
        var lowerCase = midiNumber > 4;
        var appendage;

        if( lowerCase ) {

            abc = abc.toLowerCase();
            appendage = EM.Shim.repeat( "'", midiNumber - 5 );

        } else {

            appendage = EM.Shim.repeat( ",", Math.abs( midiNumber - 4 ) );

        }

        abc += appendage;

        if( sharp ) {

            abc = "^" + abc;

        }


        //Dotted sixteenth remains to be found
        //Use a tying system

        if( length === 7 ) {

            abc = "(" + abc + Midi.ABC.NoteLength[ 8 ]
                + " " + abc + "/4)";

        } else {

            abc = abc + lengthABC;

        }

        return abc;

    };


    /**
     * Network helpers
     */

    scope.getNetworkEtherscan = function() {

        //Return ropsten default till config setup

        if( ! HAS_WEB3 ) {

            return "ropsten.";

        }

        var net = web3.version.network;

        if( net === "1" ) {

            return "";

        }

        if( Networks[ net ] ) {

            return Networks[ net ] + ".";

        }

        //console.warn( "No etherscan for network " + net );

        return "";

    };

    scope.getTransactionUrl = function( txHash ) {

        var network = scope.getNetworkEtherscan();

        var url = "https://" + network + "etherscan.io/tx/" + txHash;

        return url;

    };

};


EventDispatcher.prototype.apply( EM.Music.prototype );
