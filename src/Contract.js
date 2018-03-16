/**
 * Contract usage and creator
 */
"use strict";

var FS = require( "fs" );

var Async = require( "async" );

var Dispatcher = require( "./utils/EventDispatcher.js" );

var Config = require( "./Config.js" );

var Web3 = require( "web3" );

var EthNetworks = require( "./EthNetworks.js" );



/**
 * Contract grabbing
 */

var Contract = function( network ) {

    var scope = this;

    scope.network = network;
    scope.networkName = EthNetworks[ network ] || "unknown";

    var Web3Provider = new Web3.providers.HttpProvider( Config.getEthLocation( scope.network ) );

    scope.web = new Web3( Web3Provider );

    scope.factory = null;
    scope.instance = scope.getContract( "sheet-music" );

    scope.cacheFile = __dirname + "/../cache/" + scope.instance.address + ".json";

};

Contract.prototype = {

    /**
     * Props
     */

    instance: null,

    loadedNotes: {},

    cacheFile: "",

    network: "",
    networkName: "",

    web: null,


    /**
     * Main contract grabber
     */

    getContract: function( name, address ) {

        var scope = this;

        var netAdd = scope.network + "-";

        var interfaceFile = __dirname + "/../build/" + netAdd + name + "-contract-abi.json";
        var contractFile = __dirname + "/../build/" + netAdd + name + "-contract-deployed.txt";

        const CODE = JSON.parse( FS.readFileSync( interfaceFile ).toString() );

        const ADDR = FS.readFileSync( contractFile ).toString().trim();

        scope.factory = scope.web.eth.contract( CODE );

        var contract = scope.factory.at( ADDR );

        return contract;

    },


    /**
     * Get Eth lib
     */

    getWeb: function() {

        var scope = this;
        return scope.web;

    },


    /**
     * Build notes intial cache
     */

    buildNotes: function( callback ) {

        var scope = this;

        var cacheData = scope.getCache();

        if( cacheData ) {

            console.log( "LOADED FROM CACHE : " + scope.networkName );

            scope.loadedNotes = cacheData;

            scope.updateCache( callback );

            return;

        }

        var numNotes = scope.instance.getNumberOfBeats().toNumber();

        console.log( "Number of notes " + numNotes + " : " + scope.networkName );

        if( numNotes === 0 ) {

            callback();
            return;

        }

        var numArray = scope.createRange( 1, numNotes );

        Async.map( numArray, function( item, itemCallback ) {

            var note = scope.instance.getBeat( item );

            scope.loadedNotes[ item ] = note;

            console.log( "Loaded note " + item );

            itemCallback();

        }, function() {

            scope.saveCache();

            callback();

        });

    },


    setupListeners: function() {

        var scope = this;

        var createEvent = scope.instance.NoteCreated();

        createEvent.watch( function( err, response ) {

            var noteId = response.args.id.toNumber();

            //Note already loaded

            if( scope.loadedNotes[ noteId ] ) {

                return;

            }

            var note = scope.instance.getBeat( noteId );

            console.log( note );

            scope.loadedNotes[ noteId ] = note;

            scope.saveCache();

            scope.dispatch( { type: "note-created" } );

        });

    },

    createRange: function( start, end ) {

        return Array(end - start + 1).fill().map((_, idx) => start + idx)

    },



    /**
     * Save cache
     */

    saveCache: function() {

        var scope = this;

        var data = JSON.stringify( scope.loadedNotes );

        FS.writeFile( scope.cacheFile, data, function( err, res ) {

            if( err ) {

                console.log( "ERROR SAVING CACHE", err );

            }

        });

    },


    /**
     * Get cache
     */

    getCache: function() {

        var scope = this;

        if( ! FS.existsSync( scope.cacheFile ) ) {

            return false;

        }

        var data = FS.readFileSync( scope.cacheFile );

        return JSON.parse( data );

    },


    /**
     * Check for updated changes
     */

    updateCache: function( callback ) {

        var scope = this;

        var numNotes = scope.instance.getNumberOfBeats().toNumber();

        var loadedKeys = Object.keys( scope.loadedNotes );

        var lastKey = loadedKeys[ loadedKeys.length - 1 ];

        if( ( lastKey | 0 ) === ( numNotes | 0 ) ) {

            callback();

            return;

        }

        var numArray = scope.createRange( lastKey, numNotes );

        Async.map( numArray, function( item, itemCallback ) {

            var note = scope.instance.getBeat( item );

            scope.loadedNotes[ item ] = note;

            console.log( "Loaded note " + item );

            itemCallback();

        }, function() {

            scope.saveCache();

            callback();

        });

    }

};

Dispatcher.prototype.apply( Contract.prototype );

module.exports = Contract;
