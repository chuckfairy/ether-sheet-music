/**
 * Min donation changer
 */
"use strict";

var Contract = require( "../src/Contract.js" );

var RandomNote = require( "./lib/random-note.js" );

var SheetMusic = new Contract;

var web = SheetMusic.getWeb();

var creator = SheetMusic.instance;

var trans = {
    from: web.eth.accounts[ 0 ]
};


//Main

init();

function init() {

    var minDonation = process.argv[ 2 ];

    if( ! minDonation ) {

        console.log( "Pass the min donation in ETHER as an argument" );
        return;

    }

    var minWei =  web.toWei( minDonation, "ether" );

    creator.setMinDonation( minWei, trans, function( err, tx ) {

        if( err ) {

            throw err;

        }

        console.log( tx );

    });

}
