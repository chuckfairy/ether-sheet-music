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
    },
    109: {
        midi: "C#8"
    },
    110: {
        midi: "D8"
    },
    111: {
        midi: "D#8"
    },
    112: {
        midi: "E8"
    },
    113: {
        midi: "F8"
    },
    114: {
        midi: "F#8"
    },
    115: {
        midi: "G8"
    },
    116: {
        midi: "G#8"
    },
    117: {
        midi: "A8"
    },
    118: {
        midi: "A#8"
    },
    119: {
        midi: "B8"
    },
    120: {
        midi: "C9"
    },
    121: {
        midi: "C#9"
    },
    122: {
        midi: "D9"
    },
    123: {
        midi: "D#9"
    },
    124: {
        midi: "E9"
    },
    125: {
        midi: "F9"
    },
    126: {
        midi: "F#9"
    },
    127: {
        midi: "G9"
    },
    128: {
        midi: "G#9"
    },
    129: {
        midi: "A9"
    },
    130: {
        midi: "A#9"
    },
    131: {
        midi: "B9"
    },
    132: {
        midi: "C10"
    },
    133: {
        midi: "C#10"
    },
    134: {
        midi: "D10"
    },
    135: {
        midi: "D#10"
    },
    136: {
        midi: "E10"
    },
    137: {
        midi: "F10"
    },
    138: {
        midi: "F#10"
    },
    139: {
        midi: "G10"
    },
    140: {
        midi: "G#10"
    },
    141: {
        midi: "A10"
    },
    142: {
        midi: "A#10"
    },
    143: {
        midi: "B10"
    },
    144: {
        midi: "C11"
    },
    145: {
        midi: "C#11"
    },
    146: {
        midi: "D11"
    },
    147: {
        midi: "D#11"
    },
    148: {
        midi: "E11"
    },
    149: {
        midi: "F11"
    }
};


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
        0: "8",
        1: "5",
        2: "4",
        3: "3",
        4: "2",
        5: ">",
        6: "1",
        7: "/",
        8: "/",
    }

};

module.exports = Midi;
