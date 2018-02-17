/**
 * Global Misc util functions
 *
 */

var Utils = {

	/**
     * Set defaults of given object
     *
     * @param Object object
     * @param Object defaults
     *
     * @return object
     *
     */

	setDefaults: function( object, defaults ) {

        var defaults = typeof( defaults ) === "object" ? defaults : {};

		var object = typeof( object ) === "object" ? object : defaults;

        if( object === defaults ) { return defaults; }

		for( var name in defaults ) {

			if(
                typeof( object[ name ] ) === "undefined"
                && object[ name ] !== defaults[ name ]
            ) {

				object[name] = defaults[name];

			}

		}

		return object;

	},


    domParse: function( html ) {

        var div = document.createElement( "div" );

        div.innerHTML = html;

        return div.children[ 0 ];

    }

};

