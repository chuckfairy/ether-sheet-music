/**
 * MIDI length valid test
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

describe("MIDI Length Valid", function() {

    it( "Should not create a note on bad length value", function( done ) {

        this.timeout( 6000 );

        var startingNotes = Instance.getNumberOfBeats();
        startingNotes = startingNotes.toNumber();

        var trans = {
            from: web.eth.accounts[ 0 ],
            value: web.toWei( 0.01, "ether" ),
            gas: 3000000
        };

        var BAD_LENGTH = 10000;

        Instance.createBeat( [ 30 ], BAD_LENGTH, trans, function( err, result ) {

            //Value will still be transfered no way around
            //Check if no note was created

            assert.equal( Instance.getNumberOfBeats().toNumber(), startingNotes );

            done();

        });

    });

});

