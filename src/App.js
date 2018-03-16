/**
 * App starter
 */
"use strict";

var Async = require( "async" );

var Contract = require( "./Contract.js" );

var Templater = require( "./Templater.js" );

var HTTPResponse = require( "./HTTPResponse.js" );

var Midi = require( "./Midi.js" );

var Networks = require( "./EthNetworks.js" );

var Config = require( "./Config.js" );


//Globals

var HTTP,
    HTML_CONTENT,
    Contracts = [],
    SheetMusic;



//Main

init();

function init() {

    setupContracts();

    //setupContent();

}


//Setup contracts from config

function setupContracts() {

    var config = Config.getConfig();

    for( var net in config.networks ) {

        var contract = new Contract( net );
        Contracts.push( contract );

    }

    Async.map( Contracts, function( con, callback ) {

        con.buildNotes( function() {

            callback();

        });


    }, function() {

        //setupContent();

    });

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

    var stats = SheetMusic.instance.getDonationStats();

    var web = SheetMusic.getWeb();

    stats = {
        goal: web.fromWei( stats[ 0 ].toNumber(), "ether" ),
        min: web.fromWei( stats[ 1 ].toNumber(), "ether" ),
        current: parseFloat( web.fromWei( stats[ 2 ].toNumber(), "ether" ) ),
        milestone: web.fromWei( stats[ 3 ].toNumber(), "ether" ),
        donatee: stats[ 4 ]
    };

    var vars = {
        abi: JSON.stringify( contract.abi ),
        contract: contract,
        Midi: Midi,
        Networks: Networks,
        notes: SheetMusic.loadedNotes,
        globalStats: stats
    };

    HTML_CONTENT = Templater.getTemplate( "main.html", vars );

    HTTP.indexContent = HTML_CONTENT;

}

//Setup http server

function setupHTTP() {

    HTTP = new HTTPResponse( HTML_CONTENT, {
        port: Config.getConfig().web_port
    });

}
