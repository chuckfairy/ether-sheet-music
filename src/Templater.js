/**
 * Templater
 *
 */
"use strict";

var Nunjucks = require( "nunjucks" );

Nunjucks.configure( __dirname + "/../templates", { noCache: true } );

var Env = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader( __dirname + "/../templates" )
);



//Main class

var Templater = {

    /**
     * Main load
     */

    getTemplate: function( template, vars ) {

        return Env.render( template, vars );

    }

};

module.exports = Templater;

