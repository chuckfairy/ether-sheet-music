/**
 * Music contract helper
 */
"use strict";

EM.Music = function() {

    var scope = this;


    /**
     * Main note creator
     */

    scope.createNote = function( donation, note, noteLength ) {

        var trans = {
            value: web3.toWei( donation, "ether" )
        };

        instance.createNote( note, noteLength, trans, function( err, response ) {

            if( err ) {

                throw err;

            }

            console.log( response );

        });

    }


    /**
     * Get stats helper
     */

    scope.getStats = function( callback ) {

        instance.getDonationStats( function( err, response ) {

            callback( response );

        });

    };

};


EventDispatcher.prototype.apply( EM.Music.prototype );
