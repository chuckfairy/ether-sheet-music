/**
 * Music contract helper
 */
"use strict";

EM.Music = function() {

    var scope = this;

    scope.blockSearch = {
        fromBlock: "latest"
    };

    scope.notesLoaded = NOTES.length ? NOTES : null;

    scope.globalStats = null;;


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

            console.log( response );

        });

    }


    /**
     * Get stats helper
     */

    scope.getStats = function( callback ) {

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

        var midiData = Midi.NoteNumber[ midi ];
        var midiVex = scope.convertMidiToVexTab( midiData.midi );

        var midiABC = scope.convertMidiToABC( midiData.midi, length );
        var lengthABC = Midi.ABC.NoteLength[ length ];

        var lengthVex = Midi.VexTab.NoteLength[ length ];

        var noteData = {
            id: noteId,
            maker: note[ 0 ],
            midi: midi,
            midiData: midiData,
            vexTab: {
                midi: midiVex,
                length: lengthVex
            },
            abc: {
                note: midiABC,
            },
            length: length,
            lengthName: Midi.NoteLength[ length ],
            donation: web3.fromWei( note[ 3 ], "ether" )
        };

        return noteData;

    };

    /**
    * Conversion to midi / sheet music plugins
        */

        scope.convertMidiToVexTab = function( midiName ) {

            var vexName = midiName.replace( /(\d.*)/, "\/\$1" );

            return vexName;

        };

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
            appendage = "'".repeat( midiNumber - 5 );

        } else {

            appendage = ",".repeat( Math.abs( midiNumber - 4 ) );

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

};


EventDispatcher.prototype.apply( EM.Music.prototype );
