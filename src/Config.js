/**
 * Config helper
 */
"use strict";

var FS = require( "fs" );

const configData = FS.readFileSync( __dirname + "/../config/config.json" );

const config = JSON.parse( configData );

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

        return netConfig.server + (
            ( netConfig.port )
                ? ":" + netConfig.port
                : ""
        );

    },

    getNetworkConfig: function( network ) {

        return config.networks[ network ];

    },

    getDefaultLocation: function() {

        return Config.getEthLocation( config.default_network );

    }

};


module.exports = Config;
