/**
 * Helper create test game
 */
"use strict";

var Async = require( "async" );

var Config = require( "../src/Config.js" );

var Contract = require( "../src/Contract.js" );

var RandomNote = require( "./lib/random-note.js" );

var SheetMusic = new Contract( Config.getConfig().default_network );

var web = SheetMusic.getWeb();

var creator = SheetMusic.instance;

var stats = creator.getDonationStats();

var trans = {
    from: web.eth.accounts[ 0 ],
    value: stats[ 1 ],
    gas: 3000000
};

var NUM = process.argv[ 2 ] | 0 || 100;

var counter = 1;

Async.mapSeries( new Array( NUM ), createNote, console.log );

function createNote( item, callback ) {

    var note = RandomNote();

    console.log( "CREATING #" + counter, note[ 0 ], note[ 1 ]);

    ++ counter;

    creator.createBeat( [ note[ 0 ] ], note[ 1 ], trans, function( err, note ) {

        if( err ) {

            throw err;

        }

        console.log( note );

        callback();

    });

}
