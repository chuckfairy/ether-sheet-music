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

        con.on( "note-created", function() {

            renderContent();

        });

        con.buildNotes( function() {

            callback();

        });

        con.setupListeners();

    }, function() {

        setupHTTP();
        renderContent();

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


//Setup http server

function setupHTTP() {

    HTTP = new HTTPResponse( HTML_CONTENT, {
        port: Config.getConfig().web_port
    });

}


/**
 * Content funcs
 */

function renderContent() {

    var vars = getContentArgs();

    HTML_CONTENT = Templater.getTemplate( "main.html", vars );

    HTTP.indexContent = HTML_CONTENT;

}

function getContentArgs() {

    var addresses = {},
        notes = {},
        stats = {};

    var cl = Contracts.length;

    for( var i = 0; i < cl; ++ i ) {

        var con = Contracts[ i ];
        var instance = con.instance;

        var conStats = instance.getDonationStats();

        var web = con.getWeb();

        conStats = {
            goal: web.fromWei( conStats[ 0 ].toNumber(), "ether" ),
            min: web.fromWei( conStats[ 1 ].toNumber(), "ether" ),
            current: parseFloat( web.fromWei( conStats[ 2 ].toNumber(), "ether" ) ),
            milestone: web.fromWei( conStats[ 3 ].toNumber(), "ether" ),
            donatee: conStats[ 4 ]
        };

        addresses[ con.network ] = instance.address;
        notes[ con.network ] = con.loadedNotes;
        stats[ con.network ] = conStats;

    }

    return {
        abi: JSON.stringify( Contracts[ 0 ].instance.abi ),
        addresses: addresses,
        Midi: Midi,
        Networks: Networks,
        notes: notes,
        stats: stats,
        config: Config.getConfig()
    };

}
