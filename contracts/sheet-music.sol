/**
 * Ether sheet music
 */

pragma solidity ^0.4.11;


/**
 * Ownable contract base
 */

contract OwnableContract {

    address private owner;

    function OwnableContract() public {

        owner = msg.sender;

    }

    modifier onlyOwner() {

        require( msg.sender == owner );
        _;

    }

    function getOwner() public view returns ( address ) {

        return owner;

    }

    function changeOwner( address newOwner ) onlyOwner public {

        owner = newOwner;

    }
}


/**
 * Main sheet music contract
 */

contract SheetMusic is OwnableContract {

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

    uint private totalValue;

    uint constant DONATION_GOAL = 100 ether;

    uint constant MINIMUM_DONATION = 0.01 ether;

    bool private donationMet = false;

    mapping( address => string ) private composers;


    /**
     * Midi requirements
     */

    uint8 constant MIDI_LOWEST_NOTE = 21;

    uint8 constant MIDI_HIGHEST_NOTE = 108;


    /**
     * Events
     */

    event NoteCreated( address indexed maker, uint id, uint donation );

    event DonationCreated( address indexed maker, uint donation );

    event DonationGoalReached( address MrCool );

    event DonationTransfered( address donatee );


    /**
     * Construct
     */

    function SheetMusic() public {}


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

        totalValue += msg.value;

        NoteCreated( msg.sender, numNotes, msg.value );

        checkGoal( msg.sender );

    }


    /**
     * Random value add to contract
     */

    function () external payable {

        totalValue += msg.value;

        checkGoal( msg.sender );

    }


    /**
     * Donate with intent
     */

    function donate() external payable {

        totalValue += msg.value;

        DonationCreated( msg.sender, msg.value );

        checkGoal( msg.sender );

    }


    /**
     * Check if goal reached
     */

    function checkGoal( address maker ) internal {

        if( totalValue >= DONATION_GOAL && ! donationMet ) {

            donationMet = true;

            DonationGoalReached( maker );

        }

    }


    /**
     * Getters for notes
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
            totalValue
        );

    }

    function getTotalDonated() external view returns( uint ) {

        return totalValue;

    }


    /**
     * Finishers
     */

    function transferAll( address toAddress ) onlyOwner external {

        toAddress.transfer( this.balance );

        DonationTransfered( toAddress );

    }

    function transfer( address toAddress, uint amount ) onlyOwner external {

        toAddress.transfer( amount );

        DonationTransfered( toAddress );

    }

    function kill() onlyOwner external {

        selfdestruct( getOwner() );

    }

}
