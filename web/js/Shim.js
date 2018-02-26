/**
 * Ether music utils shim
 */
"use strict";

EM.Shim = {

    /**
     * Repeat shim
     */

    repeat: function( str, num ) {

        return new Array( num + 1 ).join( str );

    },


    /**
     * From wei shim just for basic display
     */

    fromWei: function( val ) {

        return typeof( web3 ) !== "undefined"
            ? web3.fromWei( val, "ether" )
            : parseInt( val ) * 0.000000000000000001;

    },


    /**
     * Object.values shim
     */

    getValues: function( obj ) {

        if( typeof( Object.values ) !== "undefined" ) {

            return Object.values( obj );

        }

        var vals = [];

        for( var key in obj ) {

            vals.push( obj[ key ] );

        }

        return vals;

    }

};
