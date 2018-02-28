/**
 * Contract usage and creator
 */
"use strict";

var FS = require( "fs" );

var Async = require( "async" );

var Dispatcher = require( "./utils/EventDispatcher.js" );

var Config = require( "./Config.js" );

var Web3 = require( "web3" );

var Web3Provider = new Web3.providers.HttpProvider( Config.getEthLocation() );

var web = new Web3( Web3Provider );

web.eth.defaultAccount = web.eth.accounts[ 0 ];


//Contract grabbing

var Contract = function() {

    var scope = this;

    scope.factory = null;
    scope.instance = scope.getContract( "sheet-music" );

};

Contract.prototype = {

    /**
     * Props
     */

    instance: null,

    loadedNotes: {},


    /**
     * Main contract grabber
     */

    getContract: function( name, address ) {

        var scope = this;

        var interfaceFile = __dirname + "/../build/" + name + "-contract-abi.json";
        var contractFile = __dirname + "/../build/deployed-" + name + "-contract.txt";

        const CODE = JSON.parse( FS.readFileSync( interfaceFile ).toString() );

        const ADDR = FS.readFileSync( contractFile ).toString().trim();

        scope.factory = web.eth.contract( CODE );

        var contract = scope.factory.at( ADDR );

        return contract;

    },


    /**
     * Get Eth lib
     */

    getWeb: function() {

        return web;

    },


    /**
     * Build notes intial cache
     */

    buildNotes: function( callback ) {

        var scope = this;

        var numNotes = scope.instance.getNumberOfNotes().toNumber();

        console.log( "Number of notes " +numNotes );

        if( numNotes === 0 ) {

            callback();
            return;

        }

        var numArray = scope.createRange( 1, numNotes );

        Async.map( numArray, function( item, itemCallback ) {

            var note = scope.instance.getNote( item );

            scope.loadedNotes[ item ] = note;

            console.log( "Loaded note " + item );

            itemCallback();

        }, function() {

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

            var note = scope.instance.getNote( noteId );

            console.log( note );

            scope.loadedNotes[ noteId ] = note;

            scope.dispatch( { type: "note-created" } );

        });

    },

    createRange: function( start, end ) {

        return Array(end - start + 1).fill().map((_, idx) => start + idx)

    }

};

Dispatcher.prototype.apply( Contract.prototype );

module.exports = Contract;
