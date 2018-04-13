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

        return HAS_WEB3
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

    },


    /**
     * Unique array
     */

    arrayUnique: function( arr ) {

        if( typeof( Set ) !== "undefined" && Array.from ) {

            return Array.from( new Set( arr ) );

        }

        return arr.reduce(function(p, c) {

            if (p.indexOf(c) < 0) p.push(c);

            return p;

        }, []);

    }

};
