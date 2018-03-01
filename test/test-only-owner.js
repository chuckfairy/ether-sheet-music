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

    it( "Should not allow non owner to transfer", function( done ) {

        this.timeout( 6000 );

        var startingVal = web.eth.getBalance( Instance.address ).toNumber();

        var address = "0x0000000000000000000000000000000000000000";

        var trans = {
            from: "0xf17f52151EbEF6C7334FAD080c5704D77216b732"
        };

        Instance.transferAll( address, trans, function( err, result ) {

            var newVal = web.eth.getBalance( Instance.address ).toNumber();

            console.log( startingVal, newVal );

            assert.equal( newVal, startingVal );

            done();

        });

    });

});
