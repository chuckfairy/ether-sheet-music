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
