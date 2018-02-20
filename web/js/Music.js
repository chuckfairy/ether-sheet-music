/**
 * Music contract helper
 */
"use strict";

EM.Music = function() {

    var scope = this;


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

        instance.getDonationStats( function( err, response ) {

            callback( response );

        });

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

    scope.getNote = function( noteId, callback ) {

        instance.getNote( noteId, function( err, note ) {

            var midi = note[ 1 ].toNumber();
            var length = note[ 2 ].toNumber();

            var midiData = Midi.NoteNumber[ midi ];
            var midiVex = scope.convertMidiToVexTab( midiData.midi );

            var midiABC = scope.convertMidiToABC( midiData.midi, length );
            var lengthABC = Midi.ABC.NoteLength[ length ];

            var lengthVex = Midi.VexTab.NoteLength[ length ];

            callback({
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
                    length: lengthABC
                },
                length: length,
                lengthName: Midi.NoteLength[ length ],
                donation: web3.fromWei( note[ 3 ].toNumber(), "ether" )
            });

        });

    };

    scope.convertMidiToVexTab = function( midiName ) {

        var vexName = midiName.replace( /(\d.*)/, "\/\$1" );

        return vexName;

    };

    scope.convertMidiToABC = function( midiName, length ) {

        var abc = midiName.replace( /(\w)\#?(\d)/, "\$1" );
        var midiNumber = midiName.replace( /.*(\d.*)/, "\$1" ) | 0;
        var sharp = midiName.indexOf( "#" ) !== -1;

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

        return abc;

    };

};


EventDispatcher.prototype.apply( EM.Music.prototype );
