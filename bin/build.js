#!/usr/bin/env node

var FS = require( "fs" );

//Eth depends

var Web3 = require( "web3" );

var Web3Provider = new Web3.providers.HttpProvider( "http://localhost:8545" );

var web = new Web3( Web3Provider );

var Solc = require( "solc" );


const MAIN_ADDRESS = web.eth.accounts[ 0 ];


//Code

const GAME_SOL = __dirname + "/../contracts/sheet-music.sol";

const GAME_CODE = FS.readFileSync( GAME_SOL ).toString();


//Main

var compiled = Solc.compile( GAME_CODE );

if( compiled.errors ) {

    console.log( "ERRORS/WARNINGS:" );
    console.log( compiled.errors );

}

if( compiled.contracts[ ":SheetMusic" ] ) {

    compile( compiled.contracts[ ":SheetMusic" ], "sheet-music" );

} else {

    throw new Error( "Failed to compile" );

}


//Compile func

function compile( contract, name ) {

    var interfaceFileName = name + "-contract-abi";
    var contractFileName = name + "-contract";

    var interfaceFile = __dirname + "/../build/" + interfaceFileName + ".json";
    var interfaceHistoryFile = __dirname + "/../build/history/" + interfaceFileName + Date.now() + ".json";
    var contractFile = __dirname + "/../build/deployed-" + contractFileName + ".txt";
    var contractHistoryFile = __dirname + "/../build/history/deployed-" + contractFileName + Date.now() + ".txt";

    FS.writeFileSync( interfaceFile, contract.interface );
    FS.writeFileSync( interfaceHistoryFile, contract.interface );

	var abi = JSON.parse( contract.interface );

    var creator = web.eth.accounts[ 0 ];
    var weiBet = 1000;
    var secondsPerMove = 500;
    var waitTime = 500;

	var data = {
		from: web.eth.accounts[0],
		data: "0x" + contract.bytecode,
		gas: 3000000
	};


	// create contract

	web.eth.contract( abi ).new( data, function (err, contract ) {

		if( err ) {

			console.error(err);

		} else if(contract.address){

			myContract = contract;

            console.log( "address: " + myContract.address );

            FS.writeFileSync( contractFile, myContract.address );
            FS.writeFileSync( contractHistoryFile, myContract.address );

		}

	});

}
