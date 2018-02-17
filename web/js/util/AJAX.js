/**
 * AJAX utils
 *
 * @requires [ XMLHttpRequest || ActiveX ]
 *
 */
"use strict";

var AJAX = new function() {

    var scope = this;


    //Cross browser XMLHttpRequest

    scope.xhr = function() {

        try { return new XMLHttpRequest(); }
        catch( e ) {}
        try { return new ActiveXObject( 'Msxml2.XMLHTTP.6.0' ); }
        catch (e) {}
        try { return new ActiveXObject( 'Msxml2.XMLHTTP.3.0' ); }
        catch (e) {}
        try { return new ActiveXObject( 'Microsoft.XMLHTTP' ); }
        catch (e) {}
        return false;

    };


    //Get page via XHR

    scope.get = function( url, callback, error, options ) {

    	var request = new scope.xhr();
    	request.open( "GET", url, true );
    	request.setRequestHeader("Content-Type", "application/html");

    	request.onreadystatechange = function() {

    		if(request.readyState === 4 && request.status===200) {

    			callback( this.responseText );

    		}

    	};

    	request.send( null );

    };


    //Post data via xhr

    scope.post = function( url, postData, callback, error, options ) {

    	var postData = "json=" + encodeURIComponent( JSON.stringify( postData ) );

    	var request = scope.createXHR();
    	request.open( "POST", url );

    	request.onreadystatechange = function() {

    		if(request.readyState === 4 && request.status===200) {

    			var responseText = this.response.trim();

    			if( typeof(callback) !== "undefined") {

    				callback(responseText);

    			}

    		}

    	};

    	request.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
    	request.send( postData );

    };

};

