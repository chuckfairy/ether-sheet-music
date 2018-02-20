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
        midi: "C0"
    },
    25: {
        midi: "C#0"
    },
    26: {
        midi: "D0"
    },
    27: {
        midi: "D#0"
    },
    28: {
        midi: "E0"
    },
    29: {
        midi: "F0"
    },
    30: {
        midi: "F#0"
    },
    31: {
        midi: "G0"
    },
    32: {
        midi: "G#0"
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
        midi: "C1"
    },
    37: {
        midi: "C#1"
    },
    38: {
        midi: "D1"
    },
    39: {
        midi: "D#1"
    },
    40: {
        midi: "E1"
    },
    41: {
        midi: "F1"
    },
    42: {
        midi: "F#1"
    },
    43: {
        midi: "G1"
    },
    44: {
        midi: "G#1"
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
        midi: "C2"
    },
    49: {
        midi: "C#2"
    },
    50: {
        midi: "D2"
    },
    51: {
        midi: "D#2"
    },
    52: {
        midi: "E2"
    },
    53: {
        midi: "F2"
    },
    54: {
        midi: "F#2"
    },
    55: {
        midi: "G2"
    },
    56: {
        midi: "G#2"
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
        midi: "C3"
    },
    61: {
        midi: "C#3"
    },
    62: {
        midi: "D3"
    },
    63: {
        midi: "D#3"
    },
    64: {
        midi: "E3"
    },
    65: {
        midi: "F3"
    },
    66: {
        midi: "F#3"
    },
    67: {
        midi: "G3"
    },
    68: {
        midi: "G#3"
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
        midi: "C4"
    },
    73: {
        midi: "C#4"
    },
    74: {
        midi: "D4"
    },
    75: {
        midi: "D#4"
    },
    76: {
        midi: "E4"
    },
    77: {
        midi: "F4"
    },
    78: {
        midi: "F#4"
    },
    79: {
        midi: "G4"
    },
    80: {
        midi: "G#4"
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
        midi: "C5"
    },
    85: {
        midi: "C#5"
    },
    86: {
        midi: "D5"
    },
    87: {
        midi: "D#5"
    },
    88: {
        midi: "E5"
    },
    89: {
        midi: "F5"
    },
    90: {
        midi: "F#5"
    },
    91: {
        midi: "G5"
    },
    92: {
        midi: "G#5"
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
        midi: "C6"
    },
    97: {
        midi: "C#6"
    },
    98: {
        midi: "D6"
    },
    99: {
        midi: "D#6"
    },
    100: {
        midi: "E6"
    },
    101: {
        midi: "F6"
    },
    102: {
        midi: "F#6"
    },
    103: {
        midi: "G6"
    },
    104: {
        midi: "G#6"
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
        midi: "C7"
    },
    109: {
        midi: "C#7"
    },
    110: {
        midi: "D7"
    },
    111: {
        midi: "D#7"
    },
    112: {
        midi: "E7"
    },
    113: {
        midi: "F7"
    },
    114: {
        midi: "F#7"
    },
    115: {
        midi: "G7"
    },
    116: {
        midi: "G#7"
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
        midi: "C8"
    },
    121: {
        midi: "C#8"
    },
    122: {
        midi: "D8"
    },
    123: {
        midi: "D#8"
    },
    124: {
        midi: "E8"
    },
    125: {
        midi: "F8"
    },
    126: {
        midi: "F#8"
    },
    127: {
        midi: "G8"
    },
    128: {
        midi: "G#8"
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
        midi: "C9"
    },
    133: {
        midi: "C#9"
    },
    134: {
        midi: "D9"
    },
    135: {
        midi: "D#9"
    },
    136: {
        midi: "E9"
    },
    137: {
        midi: "F9"
    },
    138: {
        midi: "F#9"
    },
    139: {
        midi: "G9"
    },
    140: {
        midi: "G#9"
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
        midi: "C10"
    },
    145: {
        midi: "C#10"
    },
    146: {
        midi: "D10"
    },
    147: {
        midi: "D#10"
    },
    148: {
        midi: "E10"
    },
    149: {
        midi: "F10"
    }
};


/**
 * Note lengths
 * @NOTE these should match ./contracts/sheet-music.sol
 */

Midi.NoteLength = {
    0: "WHOLE_NOTE",
    1: "DOTTED_HALF_NOTE",
    2: "HALF_NOTE",
    3: "DOTTED_QUARTER_NOTE",
    4: "QUARTER_NOTE",
    5: "DOTTED_EIGHTH_NOTE",
    6: "EIGHTH_NOTE",
    7: "DOTTED_SIXTEENTH_NOTE",
    8: "SIXTEENTH_NOTE"
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
