/**
 * Remove a contract
 */
"use strict";

var Contract = require( "../src/Contract.js" );

var SheetMusic = new Contract;

var web = SheetMusic.getWeb();

var creator = SheetMusic.instance;


//Main

transfer();

function transfer() {

    var address = process.argv[ 2 ];

    if( ! address ) {

        console.log( "Pass an address for an argument" );
        return;

    }

    creator.transferAll( address, function( err, result ) {

        console.log( err, result );

    });

}
