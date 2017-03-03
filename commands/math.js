"use strict";

const math = require('mathjs');

exports.tip = '*math* {exp} - Evalúa una expresión matemática. También realiza conversiones de unidades.';

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
    return new Promise((resolve, reject) => {
        try {
            let result = math.eval(input);
            resolve(String(result));
        } catch (e) {
            resolve('Ooops, ' + e.message);
        }
    });
};