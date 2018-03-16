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

    web3.eth.getAccounts( function( err, accounts ) {

        NETWORK = web3.version.network;

        web3.eth.defaultAccount = accounts[ 0 ] || "Not logged in";

        contract = web3.eth.contract( abi );

        var adr = ADDRESSES[ NETWORK ];

        instance = contract.at( adr );

        init();

        if( err || ! accounts || ! accounts.length ) {

            return alert( "Please login to MetaMask and connect to ropsten test net" );

        }

        web3.eth.getGasPrice( function( err, price ) {

            GAS_PRICE = price;

        });

    });


    //Bootstrap popovers

    $('[data-toggle="tooltip"]').tooltip();

});
