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

    getEthLocation: function() {

        return config.server + ":" + config.port;

    }

};


module.exports = Config;
