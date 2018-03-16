/**
 * Config helper
 */
"use strict";

var FS = require( "fs" );

var config = FS.readFileSync( __dirname + "/../config/config.json" );
config = JSON.parse( config );

const Config = {

    /**
     * Get full config
     */

    getConfig: function() {

        return config;

    },


    /**
     * Get eth server
     */

    getEthLocation: function( network ) {

        var netConfig = config.networks[ network ];

        if( ! netConfig ) {

            throw new Error( "No network configured for " + network );

        }

        return netConfig.server + ":" + netConfig.port;

    },

    getDefaultLocation: function() {

        return Config.getEthLocation( config.default_network );

    }

};


module.exports = Config;
