/**
 * Main setup
 *
 */
"use strict";


//init

EM.App = {
    Music: null,
    UI: null
};

function init() {

    EM.App.Music = new EM.Music;

    EM.App.UI = new EM.UI( EM.App.Music );


    // UI setup

    setupCreateForm();

}


//Create game form

function setupCreateForm() {


    //Create form

    var createForm = document.getElementById( "create-note-form" );

    var donation = document.getElementById( "donation" );
    var noteNumber = document.getElementById( "note" );
    var noteLength = document.getElementById( "note-length" );


    //Main submit

    createForm.onsubmit = function( e ) {

        e.preventDefault();

        EM.App.Music.createNote( donation.value, donation.value, noteNumber.value, noteLength.value );

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
