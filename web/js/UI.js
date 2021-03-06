/**
 * UI setup
 *
 * @requires [ Templater, async, ABCJS, EM.Music ]
 *
 */
"use strict";

EM.UI = function( music ) {

    var scope = this;

    scope.Music = music;

    scope.NotePicker = new EM.NotePicker();
    scope.Sequencer = new EM.Sequencer();

    scope.NotePicker.setRequired( false );
    scope.Sequencer.setRequired( true );


    //Default to note picker

    scope.currentEditor = scope.Sequencer;

    scope.init();

};

EM.UI.prototype = {

    /**
     * Props
     */

    Music: null,
    NotePicker: null,
    Sequencer: null,

    currentEditor: null,

    templater: null,

    templates: [
        "composer-note.html",
        "global-stats.html",
        "abc-piece.html",
        "abc-note.html"
    ],

    pieceDom: null,
    pieceId: "music-piece",
    pieceMidiPlayId: "music-piece-midi",
    pieceMidiDownloadId: "music-piece-midi-download",

    statsDom: null,
    statsId: "global-stats",

    composersDom: null,
    composersId: "composer-stats",

    messagesDom: null,
    messagesId: "message-area",
    messageTime: 5000,

    createForm: null,
    createFormId: "create-note-form",

    newNoteCreated: false,

    tempoId: "music-piece-bpm",
    tempoInput: null,


    /**
     * Main
     */

    init: function() {

        var scope = this;

        scope.pieceDom = document.getElementById( scope.pieceId );
        scope.statsDom = document.getElementById( scope.statsId );
        scope.composersDom = document.getElementById( scope.composersId );
        scope.messagesDom = document.getElementById( scope.messagesId );

        scope.tempoInput = document.getElementById( scope.tempoId );

        scope.createForm = document.getElementById( scope.createFormId );

        setTimeout( function() { scope.setupCreateForm(); }, 50 );

        scope.templater = new Templater({
            templates: scope.templates
        });

        scope.templater.compile( function() {

            scope.setupStats();
            scope.setupComposerStats();

        });


        //Game created event display

        scope.Music.on( "note-created", function( result ) {

            scope.setupNewNote( result.data.id );

        });


        //Game created message

        scope.Music.on( "user-note-created", function( result ) {

            scope.userNoteCreated( result.data );

        });

        setTimeout( scope.setupAddressHeader, 100 );
        setTimeout( scope.setupNetworkHeader, 100 );

        scope.tempoInput.onchange = function() {

            scope.renderPiece();

        };

    },


    /**
     * Address header
     */

    setupAddressHeader: function() {

        var header = document.getElementById( "address-section" );

        if( HAS_WEB3 ) {

            header.innerHTML = web3.eth.defaultAccount;

        } else {

            header.innerHTML = "Web3 Not Found";

        }

    },


    /**
     * Network header
     */

    setupNetworkHeader: function() {

        var header = document.getElementById( "network-section" );

        header.innerHTML = NETWORK_NAME;

    },


    /**
     * Stats global setup
     */

    setupStats: function() {

        var scope = this;

        scope.Music.getStats( function( stats ) {

            scope.setFormMinimum( 1 );
            scope.updateDonationStats();

        });

    },


    /**
     * Setup composer stats
     */

    setupComposerStats: function() {

        var scope = this;

        scope.Music.setupComposers( function( composers ) {

            composers = EM.Shim.getValues( composers );

            scope.renderPiece();

            scope.composersDom.innerHTML = "";

            scope.renderComposerNotes( composers );


            //Setup listeners after everything loaded

            scope.Music.setupListeners();

        });

    },


    /**
     * Create form event setup
     */

    setupCreateForm: function() {

        var scope = this;

        if( ! HAS_WEB3 ) { return; }


        //Editor change

        scope.setEditorChangeEvents();


        //Remove disable

        var disabledDiv = document.getElementById( "create-form-disabled" );
        disabledDiv.style.display = "none";


        //Create form

        var donation = document.getElementById( "donation" );


        //Main submit

        scope.createForm.onsubmit = function( e ) {

            e.preventDefault();

            var args = scope.currentEditor.getArgs();

            if( ! args[ 2 ].length ) {

                return alert( "No beats created. Please add some music before submitting" );

            }


            //Launch contract call

            scope.Music.createBeat(
                donation.value,
                args[ 0 ],
                args[ 1 ],
                args[ 2 ]
            );

        };

        updateCreatorView();

        function updateCreatorView() {

            scope.updateCreatorView();

        }

        //Events

        scope.NotePicker.on( "change", updateCreatorView );
        scope.Sequencer.on( "change", updateCreatorView );

    },



    /**
     * Current editor change
     */

    setEditorChangeEvents: function() {

        var scope = this;

        var notePickerBtn = document.getElementById( "note-picker-tab" );
        var sequencerBtn = document.getElementById( "sequencer-tab" );

        notePickerBtn.addEventListener( "click", function() {

            scope.currentEditor = scope.NotePicker;

            scope.NotePicker.setRequired( true );
            scope.Sequencer.setRequired( false );

            scope.updateCreatorView();

        });

        sequencerBtn.addEventListener( "click", function() {

            scope.currentEditor = scope.Sequencer;

            scope.Sequencer.setRequired( true );
            scope.NotePicker.setRequired( false );

            scope.updateCreatorView();

        });

    },


    /**
     * Creator view render
     */

    updateCreatorView: function() {

        var scope = this;

        var creatorView = document.getElementById( "note-creator-view" );
        var listenView = document.getElementById( "note-creator-listen" );

        var beats = scope.currentEditor.getABC();

        scope.setFormMinimum( beats.length || 1 );

        if( ! beats || ! beats.length ) {

            creatorView.innerHTML = "";
            return;

        }

        var abc = scope.Music.convertArrayToABC( beats );
        abc = "X: 1\n" +
            "K: C\n" +
            "L: 1/32\n" +
            ":" + abc;

        var midiOpts = {
            inlineControls: {
                startPlaying: true
            }
        };

        ABCJS.renderAbc( creatorView, abc );
        var midiRender = ABCJS.renderMidi( listenView, abc, midiOpts, midiOpts );

    },


    /**
     * New note event setup new piece and new composer add
     */

    setupNewNote: function( id ) {

        var scope = this;

        scope.setMessage( "A new beat as been created #" + id + "!" );

        if( ! scope.newNoteCreated ) {

            var alertDiv = document.getElementById( "music-changed-alert" );
            alertDiv.style.display = "block"
            scope.newNoteCreated = true;

        }

        scope.Music.getBeat( id, function( note ) {

            scope.renderComposerNotes( [ note ] );

            scope.renderPiece();

        });

        scope.updateDonationStats();

    },


    /**
     * Stats
     */

    setFormMinimum: function( beats ) {

        var scope = this;

        var min = scope.Music.globalStats.min;


        //Create form min
        var minArea = document.getElementById( "donation-min-form" );
        minArea.innerHTML = min * beats;

        var donationInput = document.getElementById( "donation" );
        donationInput.setAttribute( "min", min * beats );

    },


    /**
     * User note created
     */

    userNoteCreated: function( txHash ) {

        var scope = this;

        var donation = document.getElementById( "donation" );
        donation.value = "";

        scope.setMessage( "You created a beat!" );

        var url = scope.Music.getTransactionUrl( txHash );
        var urlLink = "<a href='" + url + "' target='_blank'>" + url + "</a>";

        var div = document.getElementById( "music-note-created" );

        div.innerHTML =
            "Thank you, your note has been submitted.<br>View the transaction here " + urlLink;

        div.style.display = "block";

    },


    /**
     * Update donation stats
     */

    updateDonationStats: function() {

        var scope = this;

        var current = scope.Music.globalStats.current;
        var goal = scope.Music.globalStats.goal;

        var vars = {
            stats: scope.Music.globalStats,
            network: scope.Music.getNetworkEtherscan(),
            address: ADDRESS
        };

        scope.templater.render( "global-stats.html", vars, function( template ) {

            scope.statsDom.innerHTML = template;

        });

        var percentRaised = Math.floor( ( current / goal ) * 10000 );
        percentRaised = percentRaised * .01;
        percentRaised = percentRaised.toFixed( 2 );

        var donationRaisedDiv = document.getElementById( "donation-top-raised" );
        donationRaisedDiv.innerHTML = percentRaised + "% Raised";

        var fillBar = document.getElementById( "donation-bar-fill" );
        fillBar.style.width = percentRaised + "%";

    },


    /**
     * Render the piece
     */

    renderPiece: function() {

        var scope = this;

        var notes = EM.Shim.getValues( scope.Music.notesLoaded );

        var vars = {
            notes: notes,
            tempo: scope.tempoInput.value | 0
        };

        scope.templater.render( "abc-piece.html", vars, function( template ) {

            //Render piece

            var pieceOpts = { responsive: "resize" };

            ABCJS.renderAbc(
                scope.pieceId,
                template,
                pieceOpts,
                pieceOpts,
                pieceOpts
            );


            //Midi setup

            var downloadOpts = {
                generateDownload: true,
                generateInline: false
            };

            ABCJS.renderMidi( scope.pieceMidiPlayId, template );
            ABCJS.renderMidi(
                scope.pieceMidiDownloadId,
                template,
                {},
                downloadOpts
            );

        });

    },


    /**
     * Individual composer notes
     */

    renderComposerNotes: function( composers ) {

        var scope = this;

        var vars = {
            composers: composers,
            network: scope.Music.getNetworkEtherscan()
        };

        scope.templater.render( "composer-note.html", vars, function( template ) {

            scope.composersDom.insertAdjacentHTML(
                "beforeend",
                template
            );

            scope.setupComposerABC();

        });

    },


    /**
     * Set vextab sheet music
     */

    setupComposerABC: function() {

        var scope = this;

        var notes = scope.composersDom.getElementsByClassName(
            "abc-composer-note"
        );
        notes = Array.prototype.slice.call( notes );
        var nl = notes.length;

        var opts = {};

        var width = 150;
        var height = 300;

        async.mapSeries( notes, function( note, callback ) {

            var abc = note.getAttribute( "data-note" );

            ABCJS.renderAbc( note, abc );

            note.className = "";

            setTimeout( callback, 50 );

        });

    },


    /**
     * Main messages actions
     */

    setMessage: function( text ) {

        var scope = this;

        scope.messagesDom.innerHTML = text;
        scope.messagesDom.style.display = "block";

        setTimeout( function() {

            scope.messagesDom.style.display = "none";
            scope.messagesDom.innerHTML = "";

        }, scope.messageTime );

    }

};
