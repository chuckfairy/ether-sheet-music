/**
 * Only owner should be allowed transfer
 */
"use strict";

var Contract = require( "../src/Contract.js" );

var SheetMusic = new Contract;

var web = SheetMusic.getWeb();

var Instance = SheetMusic.instance;

var Chai = require( "chai" );

var assert = Chai.assert;


//Main capture sequence

describe("Only Owner Allowed", function() {

});
