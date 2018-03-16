/**
 * Build piece
 *
 * @requires [ abc2midi, abc2svg, odt2pdf, timidity ]
 *
 */
"use strict";

var Path = require( "path" );

var ChildProcess = require( "child_process" );

var Config = require( "../src/Config.js" );

var ABC = require( "./../src/ABC.js" );

var Contract = require( "../src/Contract.js" );

var NETWORK = process.argv[ 2 ] || Config.getConfig().default_network;

var SheetMusic = new Contract( NETWORK );


//Main

init();

function init() {

    //Build initial ABC

    SheetMusic.buildNotes( function() {

        var addr = SheetMusic.instance.address;

        var filename = ABC.buildPiece( addr, SheetMusic.loadedNotes );

        buildPDF( addr, filename );
        buildSounds( addr, filename );

    });

}

function buildSounds( addr, file ) {

    var midiName = Path.resolve( __dirname + "/../build/" + addr + ".mid" );

    var abc2midi = "abc2midi " + file + " -o " + midiName;

    console.log( abc2midi );

    ChildProcess.exec( abc2midi, function() {

        var timCmd = "timidity " + midiName + " -Ow";

        console.log( "\n", timCmd, "\n" );

        ChildProcess.exec( timCmd, console.log );

    });

}

function buildPDF( addr, file ) {

    var odtName = __dirname + "/../build/" + addr + ".odt";

    var abc2odt = "abc2odt " + file + " -o " + odtName;

    ChildProcess.exec( abc2odt, function( err, out, derr ) {

        console.log( err, out, derr );

        var odt2pdf = "odt2pdf " + odtName;

        ChildProcess.exec( odt2pdf, function() {

        });

    });

}
