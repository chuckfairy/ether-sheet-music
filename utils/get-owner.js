/**
 * Account lister
 */
"use strict";

var Contract = require( "../src/Contract.js" );

var SheetMusic = new Contract;

var web = SheetMusic.getWeb();

var creator = SheetMusic.instance;

console.log( creator.getOwner() );
