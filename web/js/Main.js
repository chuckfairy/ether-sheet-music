/**
 * Main setup
 *
 */
"use strict";


//init

EC.App = {
    Game: null,
    UI: null
};

function init() {

    // UI setup

    EC.App.Game = new EC.Game();
    EC.App.UI = new EC.UI( EC.App.Game );

    setupCreateForm();

}


//Create game form

function setupCreateForm() {


    //Create form

    var createForm = document.getElementById( "create-game-form" );

    var gameBet = document.getElementById( "game-bet" );
    var gameWaitTime  = document.getElementById( "game-wait-time" );
    var gameTimePerRound = document.getElementById( "game-time-per-round" );


    //Main submit

    createForm.onsubmit = function( e ) {

        e.preventDefault();

        EC.App.Game.createGame( gameBet.value );

    }

}


// Window load

window.addEventListener( "load", function() {

    //Check if even installed

    if( typeof( web3 ) === "undefined" ) {

        alert( "Meta Mask not installed" );

        throw new Error( "Meta Mask not Installed" );

    }

    // Check if logged in

    web3 = new Web3( web3.currentProvider );

    web3.eth.getAccounts( function( err, accounts ) {

        web3.eth.defaultAccount = web3.eth.accounts[ 0 ];

        if( err || ! accounts || ! accounts.length ) {

            return alert( "Please login to Metamask and connect to ropsten test net" );

        }

        init();

    });

});
