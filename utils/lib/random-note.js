/**
 * Random note helper
 */
"use strict";

function RandomNote() {

    var midi = ( Math.random() * 87 ) + 21;
    midi = Math.floor( midi );

    var length = ( Math.random() * 8 );
    length = Math.floor( length );

    return [ midi, length ];

}

function RandomChord( maxNotes ) {

    maxNotes = ( maxNotes | 0 ) || 10;

    var notes = Math.floor( Math.random() * maxNotes );

    var midis = [];
    var length;

    for( var i = 0; i < maxNotes; ++ i ) {

        var note = RandomNote();
        midis.push( note[ 0 ] );
        length = note[ 1 ];

    }

    return [ midis, length ];

}

module.exports = RandomNote;
