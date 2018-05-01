/**
 * Main setup
 *
 */
"use strict";

var web3 = web3 || undefined;

//init

EM.App = {
    Music: null,
    UI: null
};

function init() {

    EM.App.Music = new EM.Music;

    EM.App.UI = new EM.UI( EM.App.Music );

}


// Check if logged in

function logIn() {

    web3.eth.getAccounts( function( err, accounts ) {

        console.log( err, accounts );

        if( web3.currentProvider.isPortis ) {

            NETWORK = DEFAULT_NETWORK;

        } else {

            NETWORK = web3.version.network;

        }

        web3.eth.defaultAccount = accounts[ 0 ] || "Not logged in";

        contract = web3.eth.contract( abi );

        var adr = ADDRESSES[ NETWORK ];

        if( ! adr ) {

            alert( "Network not configured for ethermusic.io (" + NETWORK + ") the piece will be displayed, but not contributable" );
            NETWORK = DEFAULT_NETWORK;
            adr = ADDRESSES[ NETWORK ];
            HAS_WEB3 = false;

        }

        ADDRESS = adr;

        NETWORK_NAME = Networks[ NETWORK ] || "Unknown";

        instance = contract.at( ADDRESS );

        init();

        if( err || ! accounts || ! accounts.length ) {

            return alert( "Please login to MetaMask and connect to mainnet or ropsten" );

        }

    });

}


// Window load

window.addEventListener( "load", function() {

    //Check if even installed

    if( typeof( Web3 ) === "undefined" && typeof( web3 ) === "undefined" ) {

        alert( "MetaMask or Web3 enabled browser not installed, please install at http://metamask.io" );

        return init();

    }

    if( typeof( web3 ) === "undefined" ) {

        web3 = new Web3(new exports.Provider({
            network: "ropsten",
            appName: "EtherMusic"
        }));

        HAS_WEB3 = true;

    }

    logIn();


    //Bootstrap popovers

    $('[data-toggle="tooltip"]').tooltip();

});
