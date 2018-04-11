/**
 * Min donation changer
 */
"use strict";

var Contract = require( "../src/Contract.js" );

var RandomNote = require( "./lib/random-note.js" );

var Config = require( "../src/Config.js" );

var SheetMusic = new Contract( Config.getConfig().default_network );

var web = SheetMusic.getWeb();

var creator = SheetMusic.instance;

const MAIN_ADDRESS = web.eth.accounts[ 0 ];

var trans = {
    from: MAIN_ADDRESS
};


//Main

init();

function init() {

    var milestone = process.argv[ 2 ];

    if( ! milestone ) {

        console.log( "Pass the min donation in ETHER as an argument" );
        return;

    }

    web.personal.unlockAccount( MAIN_ADDRESS, "" );

    var milestoneWei =  web.toWei( milestone, "ether" );

    creator.setMilestone( milestoneWei, trans, function( err, tx ) {

        if( err ) {

            throw err;

        }

        console.log( tx );

    });

}
