/**
 * Helper create test game
 */
"use strict";

var Contract = require( "../src/Contract.js" );

var RandomNote = require( "./lib/random-note.js" );

var SheetMusic = new Contract;

var web = SheetMusic.getWeb();

var creator = SheetMusic.instance;

var trans = {
    from: web.eth.accounts[ 0 ],
    value: web.toWei( .1, "ether" ),
    gas: 3000000
};

for( var i = 0; i < 100; ++ i ) {

    createNote();

}

function createNote() {

    var note = RandomNote();

    console.log( "CREATING", note[ 0 ], note[ 1 ]);

    creator.createBeat( [ note[ 0 ] ], note[ 1 ], trans, function( err, note ) {

        if( err ) {

            throw err;

        }

        console.log( note );

    });

}
