/**
 * MIDI valid test
 */
"use strict";

var Contract = require( "../src/Contract.js" );

var SheetMusic = new Contract;

var web = SheetMusic.getWeb();

var Instance = SheetMusic.instance;

var Chai = require( "chai" );

var assert = Chai.assert;


//Main capture sequence

describe("MIDI Valid", function() {

    it( "Should not create a note on bad midi value", function( done ) {

        this.timeout( 6000 );

        var startingNotes = Instance.getNumberOfNotes();
        startingNotes = startingNotes.toNumber();

        var trans = {
            from: web.eth.accounts[ 0 ],
            value: web.toWei( 0.01, "ether" ),
            gas: 3000000
        };

        Instance.createNote( 1, 1, trans, function( err, result ) {

            //Value will still be transfered no way around
            //Check if no note was created

            assert.equal( Instance.getNumberOfNotes().toNumber(), startingNotes );

            done();

        });

    });

});
