"use strict";

const popsicle = require('popsicle');
const prev = require('./prev');

exports.tip = '*dds* {msg?} - Usando la última tecnología, determina el nivel de sarcasmo de msg (o bien prev).';
exports.ignore = true;

const levels = [
    
];


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
    if(input.length) {
        return Promise.resolve(input);
    }
    return prev('', data);
};