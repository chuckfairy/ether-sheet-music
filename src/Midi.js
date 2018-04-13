/**
 * Midi notes source
 */
"use strict";

var Midi = {};


/**
 * Midi note numbers
 */

Midi.NoteNumber = {
    21: {
        midi: "A0",
    },
    22: {
        midi: "A#0"
    },
    23: {
        midi: "B0"
    },
    24: {
        midi: "C1"
    },
    25: {
        midi: "C#1"
    },
    26: {
        midi: "D1"
    },
    27: {
        midi: "D#1"
    },
    28: {
        midi: "E1"
    },
    29: {
        midi: "F1"
    },
    30: {
        midi: "F#1"
    },
    31: {
        midi: "G1"
    },
    32: {
        midi: "G#1"
    },
    33: {
        midi: "A1"
    },
    34: {
        midi: "A#1"
    },
    35: {
        midi: "B1"
    },
    36: {
        midi: "C2"
    },
    37: {
        midi: "C#2"
    },
    38: {
        midi: "D2"
    },
    39: {
        midi: "D#2"
    },
    40: {
        midi: "E2"
    },
    41: {
        midi: "F2"
    },
    42: {
        midi: "F#2"
    },
    43: {
        midi: "G2"
    },
    44: {
        midi: "G#2"
    },
    45: {
        midi: "A2"
    },
    46: {
        midi: "A#2"
    },
    47: {
        midi: "B2"
    },
    48: {
        midi: "C3"
    },
    49: {
        midi: "C#3"
    },
    50: {
        midi: "D3"
    },
    51: {
        midi: "D#3"
    },
    52: {
        midi: "E3"
    },
    53: {
        midi: "F3"
    },
    54: {
        midi: "F#3"
    },
    55: {
        midi: "G3"
    },
    56: {
        midi: "G#3"
    },
    57: {
        midi: "A3"
    },
    58: {
        midi: "A#3"
    },
    59: {
        midi: "B3"
    },
    60: {
        midi: "C4"
    },
    61: {
        midi: "C#4"
    },
    62: {
        midi: "D4"
    },
    63: {
        midi: "D#4"
    },
    64: {
        midi: "E4"
    },
    65: {
        midi: "F4"
    },
    66: {
        midi: "F#4"
    },
    67: {
        midi: "G4"
    },
    68: {
        midi: "G#4"
    },
    69: {
        midi: "A4"
    },
    70: {
        midi: "A#4"
    },
    71: {
        midi: "B4"
    },
    72: {
        midi: "C5"
    },
    73: {
        midi: "C#5"
    },
    74: {
        midi: "D5"
    },
    75: {
        midi: "D#5"
    },
    76: {
        midi: "E5"
    },
    77: {
        midi: "F5"
    },
    78: {
        midi: "F#5"
    },
    79: {
        midi: "G5"
    },
    80: {
        midi: "G#5"
    },
    81: {
        midi: "A5"
    },
    82: {
        midi: "A#5"
    },
    83: {
        midi: "B5"
    },
    84: {
        midi: "C6"
    },
    85: {
        midi: "C#6"
    },
    86: {
        midi: "D6"
    },
    87: {
        midi: "D#6"
    },
    88: {
        midi: "E6"
    },
    89: {
        midi: "F6"
    },
    90: {
        midi: "F#6"
    },
    91: {
        midi: "G6"
    },
    92: {
        midi: "G#6"
    },
    93: {
        midi: "A6"
    },
    94: {
        midi: "A#6"
    },
    95: {
        midi: "B6"
    },
    96: {
        midi: "C7"
    },
    97: {
        midi: "C#7"
    },
    98: {
        midi: "D7"
    },
    99: {
        midi: "D#7"
    },
    100: {
        midi: "E7"
    },
    101: {
        midi: "F7"
    },
    102: {
        midi: "F#7"
    },
    103: {
        midi: "G7"
    },
    104: {
        midi: "G#7"
    },
    105: {
        midi: "A7"
    },
    106: {
        midi: "A#7"
    },
    107: {
        midi: "B7"
    },
    108: {
        midi: "C8"
    }
};


/**
 * Sequencer order === reverse
 */

Midi.SequenceOrder = (function() {

    var output = [];

    for( var noteId in Midi.NoteNumber ) {

        var note = Midi.NoteNumber[ noteId ];
        output.push({
            id: noteId,
            midi: note.midi
        });

    }

    return output.reverse();

})();


/**
 * Min/Max constants
 */

Midi.MIN_MIDI_NOTE = 21;
Midi.MAX_MIDI_NOTE = 108;


/**
 * Note lengths
 * @NOTE these should match ./contracts/sheet-music.sol
 */

Midi.NoteLength = {
    0: "Whole Note",
    1: "Dotted Half Note",
    2: "Half Note",
    3: "Dotted Quarter Note",
    4: "Quarter Note",
    5: "Dotted Eighth Note",
    6: "Eighth Note",
    7: "Dotted Sixteenth Note",
    8: "Sixteenth Note"
};


/**
 * Conversion to VexTab
 */

Midi.VexTab = {

    NoteLength: {
        0: "1",
        1: "1",
        2: "2",
        3: "2",
        4: "4",
        5: "4",
        6: "8",
        7: "8",
        8: "16",
    }

};


/**
 * ABC notation conversion
 */

Midi.ABC = {

    NoteLength: {
        0: "32",
        1: "24",
        2: "16",
        3: "10",
        4: "8",
        5: "6",
        6: "4",
        7: "3",
        8: "2",
    }

};

module.exports = Midi;
