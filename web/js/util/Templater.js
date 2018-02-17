/**
 * Unity templater and nunjucks engine user
 *
 * @requires [ AJAX, nunjucks ]
 *
 * @param Object options
 *
 */
"use strict";

var Templater = function( options ) {

    var scope = this;

    scope.opts = Utils.setDefaults( options, Templater.Defaults );

    scope.templates = scope.opts.templates || [];

    scope.raw = {};

    scope.compilied = {};

    if( scope.opts.autoload ) { scope.compile( scope.opts.onAutoload ); }

};

Templater.prototype = {

    constructor: Templater,


    //Templates to be compilied

    templates: [],


    //Raw templates

    raw: {},


    //Compilied templates

    compiled: {},


    //options set

    opts: {},


    //Compile from options

    compile: function( callback ) {

        var scope = this;

        var templatesURLS = scope.templates;

        var tl = templatesURLS.length;

        var compiledCount = 0;

        var addTemplate = function( template ) {

            AJAX.get( scope.opts.directory + template, function( response ) {

                templatesURLS[ template ] = response;

                scope.compileTemplate( template, response );

                compiledCount++;

                scope.dispatch({ type: "compile " + template });

                if( compiledCount === tl ) {

                    scope.templates = [];
                    callback && callback();

                    scope.dispatch({ type: "compile" });

                }

            });

        };

        for( var i = 0; i < tl; i ++ ) {

            addTemplate( templatesURLS[ i ] );

        }


    },

    compileTemplate: function( name, text ) {

        var scope = this;

        return scope.compiled[ name ] = scope.opts.engine.compile( text, scope.opts.environment );

    },


    //Render template

    render: function( name, vars, callback ) {

        var scope = this;

        var template = scope.compiled[ name ];

        if( template ) {

            template = template.render( vars );

            template = template.trim();

            callback && callback( template );

        } else {

            AJAX.get( scope.opts.directory + name, function( responseText ) {

                template = scope.compileTemplate( name, responseText );

                template = template.render( vars );

                template = template.trim();

                callback && callback( template );

            });

        }

    },


    //Add multiple templates

    addTemplates: function( templates ) {

        var scope = this;
        scope.templates = Utils.arrayMerge( scope.templates, templates );

    },


    //add template to be compilied

    addTemplate: function( templateURL ) {

        this.templates.push( templateURL );

    }

};

EventDispatcher.prototype.apply( Templater.prototype );


//Engine env

Templater.DefaultEnvironment = new nunjucks.Environment( new nunjucks.WebLoader( "/" ) );


//Defaults

Templater.Defaults = {
    engine: nunjucks,
    environment: Templater.DefaultEnvironment,
    autoload: true,
    onLoad: false,
    templates: false,
    directory: "/templates/"
};
