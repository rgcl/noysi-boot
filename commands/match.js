"use strict";

const popsicle = require('popsicle');

exports.tip = '*match* {regex} {msg} - Retorna las coincidencias de msg con la expresión regular (EcmaScript).';

exports.returnClear = true;

/*
 "token": "",
 "team_id": "td6cn1b7g",
 "team_name": "ProgramadoresChile",
 "channel_id": "c1d5mcimo",
 "channel_name": "general",
 "timestamp": "1484282672116",
 "user_id": "noysi%3Aa87022d",
 "user_name": "rodrigo",
 "text": "test",
 "trigger_word": "test"
 */
exports.exec = (input, data) => {

    if(input.indexOf(' ') === -1) {
        return Promise.reject('por favor, indicar la expresión regular y el mensaje.');
    }
    let regex = input.substring(0, input.indexOf(' '));
    let msg = input.substring(input.indexOf(' ') + 1);

    let regexp = new RegExp(regex, 'g');

    let matches = msg.match(regexp) || ['Sin coincidencias'];
    return Promise.resolve('\n' + matches.join('\n'));
};