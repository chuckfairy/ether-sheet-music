/**
 * Only owner should be allowed transfer
 */
"use strict";

var Contract = require( "../src/Contract.js" );

var Config = require( "../src/Config.js" );

var SheetMusic = new Contract( Config.getConfig().default_network );

var web = SheetMusic.getWeb();

var Instance = SheetMusic.instance;

var Chai = require( "chai" );

var assert = Chai.assert;


//Main capture sequence

describe("Only Owner Allowed", function() {

});
