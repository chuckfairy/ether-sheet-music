/**
 * App starter
 */
"use strict";

const PORT = 9090;

var Contract = require( "./Contract.js" );

var Templater = require( "./Templater.js" );

var HTTPResponse = require( "./HTTPResponse.js" );

var Midi = require( "./Midi.js" );

//Globals

var HTTP, HTML_CONTENT, SheetMusic;



//Main

init();

function init() {

    setupContent();

}


//Setup template

function setupContent() {

    SheetMusic = new Contract;

    SheetMusic.buildNotes( function() {

        setupHTTP();

        renderContent();

    });

    SheetMusic.on( "note-created", function() {

        renderContent();

    });

    SheetMusic.setupListeners();

}

function renderContent() {

    var contract = SheetMusic.instance;

    var vars = {
        abi: JSON.stringify( contract.abi ),
        contract: contract,
        Midi: Midi,
        notes: SheetMusic.loadedNotes
    };

    HTML_CONTENT = Templater.getTemplate( "main.html", vars );

    HTTP.indexContent = HTML_CONTENT;

}

//Setup http server

function setupHTTP() {

    HTTP = new HTTPResponse( HTML_CONTENT );

}
