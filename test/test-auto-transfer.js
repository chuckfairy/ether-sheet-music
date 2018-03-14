/**
 * Auto transfer test
 */
"use strict";

var Contract = require( "../src/Contract.js" );

var SheetMusic = new Contract;

var web = SheetMusic.getWeb();

var Instance = SheetMusic.instance;

var Chai = require( "chai" );

var assert = Chai.assert;


//Main capture sequence

describe("Auto Transfer", function() {

    it( "Should transfer all funds after milestone goal reached", function( done ) {

        this.timeout( 6000 );

        var stats = Instance.getDonationStats();

        var milestone = stats[ 3 ];
        var donatee = stats[ 4 ];

        var trans = {
            from: web.eth.accounts[ 0 ],
            value: milestone,
            gas: 3000000
        };

        var contractBalance = web.eth.getBalance( Instance.address );

        var balance = web.eth.getBalance( donatee );

        Instance.createBeat( [ 25 ], 1, trans, function( err, result ) {

            var newBalance = web.eth.getBalance( donatee );

            var newContractBalance = web.eth.getBalance( Instance.address );

            assert.isFalse( balance.equals( newBalance ) );
            assert.isTrue( newContractBalance.equals( 0 ) );

            done();

        });

    });

});
