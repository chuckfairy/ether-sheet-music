/**
 * App starter
 */
"use strict";

const PORT = 9090;

var Contract = require( "./Contract.js" );

var Templater = require( "./Templater.js" );

var HTTPResponse = require( "./HTTPResponse.js" );

var HTML_CONTENT;

var Midi = require( "./Midi.js" );


//Main

init();

function init() {

    setupContent();

    setupHTTP();

}


//Setup template

function setupContent() {

    var contract = Contract.getContract( "sheet-music" );

    var vars = {
        abi: JSON.stringify( contract.abi ),
        contract: contract,
        Midi: Midi
    };

    HTML_CONTENT = Templater.getTemplate( "main.html", vars );

}


//Setup http server

function setupHTTP() {

    var HTTP = new HTTPResponse( HTML_CONTENT );

}
