/**
 * Logger
 */
"use strict";

var Winston = require( "winston" );

var Log = function( file ) {

    var scope = this;

    scope.logger = new Winston.Logger({
        transports: [
            new (Winston.transports.Console)(),
            new (Winston.transports.File)( { filename: file } )
        ]
    });

};


module.exports = Log;
