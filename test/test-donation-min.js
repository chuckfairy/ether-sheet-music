/**
 * Donation min test
 */
"use strict";

var Contract = require( "../src/Contract.js" );

var SheetMusic = new Contract;

var web = SheetMusic.getWeb();

var Instance = SheetMusic.instance;

var Chai = require( "chai" );

var assert = Chai.assert;


//Main capture sequence

describe("Donation Min", function() {

    it( "Should revert on a bad minimum note creation donation", function( done ) {

        this.timeout( 6000 );

        var startingNotes = Instance.getNumberOfBeats();
        startingNotes = startingNotes.toNumber();

        var trans = {
            from: web.eth.accounts[ 0 ],
            value: 10,
            gas: 3000000
        };

        Instance.createBeat( [ 25 ], 1, trans, function( err, result ) {

            //Value will still be transfered no way around
            //Check if no note was created

            assert.equal( Instance.getNumberOfBeats(), startingNotes );

            done();

        });

    });

    it( "Should create on the minimum note creation donation", function( done ) {

        this.timeout( 6000 );

        var startingNotes = Instance.getNumberOfBeats();
        startingNotes = startingNotes.toNumber();

        var trans = {
            from: web.eth.accounts[ 0 ],
            value: web.toWei( 0.01, "ether" ),
            gas: 3000000
        };

        Instance.createBeat( [ 25, 50 ], 1, trans, function( err, result ) {

            //Value will still be transfered no way around
            //Check if no note was created

            assert.equal( Instance.getNumberOfBeats(), startingNotes + 1 );

            done();

        });

    });

});
