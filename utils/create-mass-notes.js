/**
 * Helper create test game
 */
"use strict";

var Contract = require( "../src/Contract.js" );

var web = Contract.getWeb();

var creator = Contract.getContract( "sheet-music" );

var trans = {
    from: web.eth.accounts[ 0 ],
    value: web.toWei( .1, "ether" ),
    gas: 3000000
};

for( var i = 0; i < 100; ++ i ) {

    createNote();

}

function createNote() {

    var midi = ( Math.random() * 100 ) + 25;
    midi = Math.floor( midi );

    var length = ( Math.random() * 8 );
    length = Math.floor( length );

    console.log( "CREATING", midi, length );

    creator.createNote( midi, length, trans, function( err, game ) {

        if( err ) {

            throw err;

        }

        console.log( game );

    });

}

