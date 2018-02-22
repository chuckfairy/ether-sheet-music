/**
 * MIDI length valid test
 */
"use strict";

var Contract = require( "./../src/Contract.js" );

var web = Contract.getWeb();

var Instance = Contract.getContract( "sheet-music" );

var Chai = require( "chai" );

var assert = Chai.assert;


//Main capture sequence

describe("MIDI Length Valid", function() {

    it( "Should not create a note on bad length value", function( done ) {

        this.timeout( 6000 );

        var startingNotes = Instance.getNumberOfNotes();
        startingNotes = startingNotes.toNumber();

        var trans = {
            from: web.eth.accounts[ 0 ],
            value: web.toWei( 0.01, "ether" ),
            gas: 3000000
        };

        var BAD_LENGTH = 10000;

        Instance.createNote( 30, BAD_LENGTH, trans, function( err, result ) {

            //Value will still be transfered no way around
            //Check if no note was created

            assert.equal( Instance.getNumberOfNotes().toNumber(), startingNotes );

            done();

        });

    });

});

