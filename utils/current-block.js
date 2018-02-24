/**
 * Helper create test game
 */
"use strict";

var Contract = require( "../src/Contract.js" );

var SheetMusic = new Contract;

var web = SheetMusic.getWeb();


console.log( web.eth.syncing );

console.log( web.eth.blockNumber );
