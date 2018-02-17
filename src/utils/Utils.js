/**
 * js Utils
 *
 */
var FS = require( "fs" );

var Utils = {

    //Highly used as an inheritance

    setDefaults: function( object, defaults ) {

        var defaults = typeof( defaults ) === "object" ? defaults: {};
        var object = typeof( object ) === "object" ? object : defaults;

        if( object === defaults ) { return object; }

        for( var defaultName in defaults ) {

            var defaultVal = defaults[ defaultName ];
            var objectVal = object[ defaultName ];

            if( typeof( defaultVal ) === "object" ) {

                object[ defaultName ] = Utils.setDefaults( objectVal, defaultVal );

            } else if( typeof( objectVal ) === "undefined" ) {

                object[ defaultName ] = defaults[ defaultName ];

            }

        }

        return object;

    },


    //get JSON helper

    getJSON: function( json ) {

        var obj = {};

        try {

            obj = JSON.parse( json ) || {};

        } catch( e ) {

            console.log( "JSON file failed to parse" );

        }

        return obj;

    },


    //Get config file

    getConfig: function( path, callback ) {

        FS.readFile( path, function( err, data ) {

            if( err ) { throw err; }

            var json = Utils.getJSON( data );

            callback && callback( json );

        });

    },



    //File exists sync

    fileExists: function( path ) {
        try {

            return FS.statSync( path ).isFile();

        } catch( e ) {

            return false;

        }

    },



    //Copy file sync

    copyFile: function( src, dest, encoding ) {

        var content = FS.readFileSync( src, encoding );

        FS.writeFileSync( dest, content, encoding );

    }

};

module.exports = Utils;
