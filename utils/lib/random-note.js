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

module.exports = RandomNote;
