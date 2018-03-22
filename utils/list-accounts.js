/**
 * Account lister
 */
"use strict";

var Contract = require( "../src/Contract.js" );

var Config = require( "../src/Config.js" );

var SheetMusic = new Contract( Config.getConfig().default_network );

var web = SheetMusic.getWeb();

console.log( web.eth.accounts );
