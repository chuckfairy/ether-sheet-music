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

    if( typeof( Web3 ) === "undefined" && typeof( web3 ) === "undefined" ) {

        alert( "MetaMask or Web3 enabled browser not installed, please install at http://metamask.io" );

        return init();

    }

    // Check if logged in

    init();

    web3 = new Web3( web3.currentProvider );

    contract = web3.eth.contract( abi );
    instance = contract.at( ADDRESS );

    web3.eth.getAccounts( function( err, accounts ) {

        if( err || ! accounts || ! accounts.length ) {

            return alert( "Please login to MetaMask and connect to ropsten test net" );

        }

        web3.eth.defaultAccount = web3.eth.accounts[ 0 ];

        web3.eth.getGasPrice( function( err, price ) {

            GAS_PRICE = price;

        });

    });


    //Bootstrap popovers

    $('[data-toggle="tooltip"]').tooltip();

});
