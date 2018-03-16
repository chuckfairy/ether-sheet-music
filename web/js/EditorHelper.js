/**
 * Editor helper singleton
 */
"use strict";

EM.EditorHelper = new function() {

    var scope = this;

    /**
     * Props
     */

    scope.closeBtnClass = "close-btn";
    scope.closeNoteBtnClass = "close-note-btn";


    //Check random selector

    scope.checkRandom = function( input ) {

        if( input.value !== "random" ) {

            return;

        }

        var opts = input.options.length - 2;

        var index = Math.floor( ( Math.random() * opts ) + 2 );

        input.selectedIndex = index;

    }


    //Get args for contract

    scope.getArgs = function( beats ) {

        var midi = [];
        var dividers = [];
        var lengths = [];

        var bl = beats.length;

        var lastDivide = 0;

        for( var i = 0; i < bl; ++ i ) {

            var beat = beats[ i ];

            midi = midi.concat( beat.notes );

            dividers.push( lastDivide + beat.notes.length );
            lengths.push( beat.length );

            lastDivide += beat.notes.length;

        }

        return [
            midi,
            dividers,
            lengths
        ];

    }


    /**
     * Set inputs as required or not
     */

    scope.setRequired = function( area, required ) {

        var items = [];
        items = Array.prototype.concat.apply(items, area.getElementsByTagName("input"));
        items = Array.prototype.concat.apply(items, area.getElementsByTagName("select"));

        var il = items.length;

        for( var i = 0; i < il; ++ i ) {

            var item = items[ i ];

            required
                ? item.setAttribute( "required", true )
                : item.removeAttribute( "required" )

        }

    };


    /**
     * Remove parent
     */

    scope.removeNode = function( node ) {

        node.parentNode.removeChild( node );

    };

};
