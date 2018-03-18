/**
 * ABC helpers
 */
"use strict";

var Path = require( "path" );

var FS = require( "fs" );

var Midi = require( "./Midi.js" );

var Templater = require( "./Templater.js" );


//Main

var ABC = new function() {

    var scope = this;

    scope.lastSharp = {};


    /**
     * Build ABC helper
     */

    scope.buildPiece = function( address, notes ) {

        var formattedNotes = [];
        var nl = notes.length;

        for( var noteId in notes ) {

            formattedNotes.push(
                scope.formatNote( noteId, notes[ noteId ] )
            );

        }

        var vars = {
            notes: formattedNotes
        };

        var template = Templater.getTemplate( "abc-piece.html", vars );

        var fileName = Path.resolve( __dirname, "../build/" + address + ".abc" );

        FS.writeFileSync( fileName, template );

        return fileName;

    };


    /**
     * Format note for UI
     */

    scope.formatNote = function( noteId, note ) {

        var midi = note[ 1 ];
        var length = note[ 2 ] | 0;

        var midiABC = scope.convertMidiToABC( midi, length );
        var lengthABC = Midi.ABC.NoteLength[ length ];

        var noteData = {
            id: noteId,
            maker: note[ 0 ],
            midi: midi,
            abc: {
                note: midiABC,
            }
        };

        return noteData;

    };

    /**
     * Conversion to midi / sheet music plugins
     */

    scope.convertMidiToABC = function( midiNotes, length ) {

        var abc = scope.convertMidisToABCChord( midiNotes );

        var lengthABC = Midi.ABC.NoteLength[ length ];

        abc = abc + lengthABC;

        return abc;

    };

    scope.convertMidisToABCChord = function( midiNotes ) {

        var out = [];

        var ml = midiNotes.length;

        if( ml === 0 ) {

            return "z";

        }

        for( var i = 0; i < ml; ++ i ) {

            var note = midiNotes[ i ];

            var abc = scope.convertMidiToABCNote( note );

            out.push( abc );

        }

        return "[" + out.join( "" ) + "]";

    }

    scope.convertMidiToABCNote = function( midi, fromChord ) {

        var midi = midi | 0;

        var midiName = Midi.NoteNumber[ midi ];
        midiName = midiName.midi;

        var midiLetter = midiName.replace( /(\w)\#?(\d+)/, "\$1" );
        var midiNumber = midiName.replace( /.*?(\d+)/, "\$1" ) | 0;
        var sharp = midiName.indexOf( "#" ) !== -1;

        var abc = midiLetter;

        //Uppercase if over middle 4
        var lowerCase = midiNumber > 4;
        var appendage;

        if( lowerCase ) {

            abc = abc.toLowerCase();
            appendage = "'".repeat( midiNumber - 5 );

        } else {

            appendage = ",".repeat( Math.abs( midiNumber - 4 ) );

        }

        abc += appendage;

        if( sharp ) {

            abc = "^" + abc;

        } else {

            //Natural note explicit

            var nextMidiNum = midi + 1;
            var nextMidi = Midi.NoteNumber[ nextMidiNum ];

            if( nextMidi ) {

                var nextMidiName = nextMidi.midi.replace( /(\w)\#?(\d+)/, "\$1" );

                if( nextMidiName === midiLetter && !! scope.lastSharp[ nextMidiNum ] ) {

                    scope.lastSharp[ nextMidiNum ] = false;
                    abc = "=" + abc;

                }

            }

        }

        scope.lastSharp[ midi ] = true;

        return abc;

    };


    /**
     * Convert array to ABC
     */

    scope.convertArrayToABC = function( arr ) {

        var al = arr.length;

        var output = "";

        for( var i = 0; i < al; ++ i ) {

            var beat = arr[ i ];

            output += scope.convertMidiToABC( beat.notes, beat.length );

        }

        return output;

    };

};


module.exports = ABC;
