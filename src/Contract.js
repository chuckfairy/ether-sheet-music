/**
 * Contract usage and creator
 */
"use strict";

var FS = require( "fs" );

var Web3 = require( "web3" );

var Web3Provider = new Web3.providers.HttpProvider( "http://localhost:8545" );

var web = new Web3( Web3Provider );

web.eth.defaultAccount = web.eth.accounts[ 0 ];


//Contract grabbing

var Contract = {

    /**
     * Main contract grabber
     */

    getContract: function( name, address ) {

        var interfaceFile = __dirname + "/../build/" + name + "-contract-abi.json";
        var contractFile = __dirname + "/../build/deployed-" + name + "-contract.txt";

        const CODE = JSON.parse( FS.readFileSync( interfaceFile ).toString() );

        const ADDR = FS.readFileSync( contractFile ).toString().trim();

        var contract = web.eth.contract( CODE ).at( ADDR );

        return contract;

    },


    /**
     * Get Eth lib
     */

    getWeb: function() {

        return web;

    }

};

module.exports = Contract;
