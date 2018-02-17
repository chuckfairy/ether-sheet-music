/**
 * Watch events for creator
 */
"use strict";

var Contract = require( "../src/Contract.js" );

var web = Contract.getWeb();

var creator = Contract.getContract( "sheet-music" );

var event = creator.allEvents( {}, { fromBlock: "latest", toBlock: "latest" } );

event.watch(function( err, results ) {

    if( err ) {

        throw err;

    }

    console.log( "EVENT : " + results.event );

    console.log( results.args );

});

console.log( "Watching all events" );
