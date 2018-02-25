/**
 * Watch events for creator
 */
"use strict";

var Contract = require( "../src/Contract.js" );

var SheetMusic = new Contract;

var web = SheetMusic.getWeb();

var creator = SheetMusic.instance;


//Setup logger

var Log = require( "../src/Log.js" );

var LOG_FILE = __dirname + "/../log/events.log";

var EventLog = new Log( LOG_FILE );


//Watch all events

var event = creator.allEvents( {}, { fromBlock: "latest", toBlock: "latest" } );

event.watch(function( err, results ) {

    if( err ) {

        throw err;

    }

    EventLog.logger.info( JSON.stringify( results ) );

});

console.log( "Watching all events" );
