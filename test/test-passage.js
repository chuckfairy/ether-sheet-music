/**
 * MIDI valid test
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

describe("MIDI Passage Valid", function() {

    it( "Should not create a on bad min donation for multiple beats", function( done ) {

        this.timeout( 6000 );

        var stats = Instance.getDonationStats();

        var startingNotes = Instance.getNumberOfBeats();
        startingNotes = startingNotes.toNumber();

        var trans = {
            from: web.eth.accounts[ 0 ],
            value: stats[ 1 ],
            gas: 3000000
        };

        Instance.createPassage( [ 50, 50 ], [ 1 ], [ 1, 1 ], trans, function( err, result ) {

            //Value will still be transfered no way around
            //Check if no note was created

            assert.equal( Instance.getNumberOfBeats().toNumber(), startingNotes );

            done();

        });

    });

    it( "Should create a on min donation for multiple beats", function( done ) {

        this.timeout( 6000 );

        var stats = Instance.getDonationStats();

        var startingNotes = Instance.getNumberOfBeats();
        startingNotes = startingNotes.toNumber();

        var trans = {
            from: web.eth.accounts[ 0 ],
            value: stats[ 1 ].times( 2 ),
            gas: 3000000
        };

        var midi = [ 50, 51 ];
        var dividers = [ 1, 2 ];
        var lengths = [ 1, 1 ];

        Instance.createPassage( midi, dividers, lengths, trans, function( err, result ) {

            if( err ) {

                throw err;

            }

            assert.notEqual( Instance.getNumberOfBeats().toNumber(), startingNotes );

            done();

        });

    });

});

