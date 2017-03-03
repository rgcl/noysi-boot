"use strict";

const popsicle = require('popsicle');
const prev = require('./prev');

exports.tip = '*troll* {msg?} - Trollea el último mensaje, o bien el parámetro msg si está establecido';

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
    if(input.length) {
        return Promise.resolve(toI(input));
    }
    return prev.exec('', data).then(toI);
};

function toI(str) {
    return str.replace(/a|e|i|o|u/g, 'i').replace(/A|E|I|O|U/g, 'I');
}