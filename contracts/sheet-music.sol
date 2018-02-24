/**
 * 100 ether sheet music
 */

pragma solidity ^0.4.11;

contract SheetMusic {

    /**
     * Note lengths
     */

    enum NoteLength {

        WHOLE_NOTE,

        DOTTED_HALF_NOTE,

        HALF_NOTE,

        DOTTED_QUARTER_NOTE,

        QUARTER_NOTE,

        DOTTED_EIGHTH_NOTE,

        EIGHTH_NOTE,

        DOTTED_SIXTEENTH_NOTE,

        SIXTEENTH_NOTE

    }


    /**
     * Note struct
     */

    struct Note {

        address maker;

        uint8 midiNote;

        NoteLength length;

        uint donation; //In weis

    }


    /**
     * Internal props
     */

    mapping( uint => Note ) private notes;

    uint private numNotes;

    uint constant DONATION_GOAL = 100 ether;

    uint constant MINIMUM_DONATION = 0.01 ether;

    bool private donationMet = false;

    mapping( address => string ) private composers;


    /**
     * Midi requirements
     */

    uint8 constant MIDI_LOWEST_NOTE = 21;

    uint8 constant MIDI_HIGHEST_NOTE = 149;


    /**
     * Events
     */

    event NoteCreated( address indexed maker, uint id, uint donation );

    event DonationCreated( address indexed maker, uint donation );

    event DonationGoalReached( address theCoolestFuckingCat );


    /**
     * Construct
     */

    function SheetMusic() public {

    }


    /**
     * Main create note
     * There is no 0 note. First one is 1
     */

    function createNote( uint8 midiNote, NoteLength length ) external payable {

        //Spam check note

        require( msg.value >= MINIMUM_DONATION );

        require( midiNote >= MIDI_LOWEST_NOTE );
        require( midiNote <= MIDI_HIGHEST_NOTE );


        //Create note

        Note memory newNote = Note({
            maker: msg.sender,
            donation: msg.value,
            midiNote: midiNote,
            length: length
        });

        notes[ ++ numNotes ] = newNote;

        NoteCreated( msg.sender, numNotes, msg.value );

        checkGoal( msg.sender );

    }


    /**
     * Random value add to contract
     */

    function () external payable {

        checkGoal( msg.sender );

    }


    /**
     * Donate with intent
     */

    function donate() external payable {

        DonationCreated( msg.sender, msg.value );

        checkGoal( msg.sender );

    }


    /**
     * Check if goal reached
     */

    function checkGoal( address maker ) internal {

        if( this.balance >= DONATION_GOAL && ! donationMet ) {

            donationMet = true;

            DonationGoalReached( maker );

        }

    }


    /**
     * Getters
     */

    function getNumberOfNotes() external view returns ( uint ) {

        return numNotes;

    }

    function getNote( uint id ) external view returns (
        address,
        uint8,
        NoteLength,
        uint
    ) {

        Note storage note = notes[ id ];

        return (
            note.maker,
            note.midiNote,
            note.length,
            note.donation
        );

    }


    /**
     * Stats getter
     */

    function getDonationStats() external view returns (
        uint goal,
        uint minimum,
        uint currentValue
    ) {

        return (
            DONATION_GOAL,
            MINIMUM_DONATION,
            this.balance
        );

    }

}
