/**
 * Remove a contract
 */
"use strict";

var Contract = require( "../src/Contract.js" );

var SheetMusic = new Contract;

var web = SheetMusic.getWeb();

var creator = SheetMusic.instance;

creator.kill( function( err, result ) {

    console.log( err, result );

});
