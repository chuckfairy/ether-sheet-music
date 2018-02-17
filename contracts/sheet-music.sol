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

        require( msg.value > MINIMUM_DONATION );

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
     * Random donation to contract
     */

    function () external payable {

        checkGoal( msg.sender );

    }

    function donate() external payable {

        DonationCreated( msg.sender, msg.value );

        checkGoal( msg.sender );

    }


    /**
     * Check if goal reached
     */

    function checkGoal( address maker ) internal {

        if( this.balance >= DONATION_GOAL ) {

            DonationGoalReached( maker );

        }

    }

}
