"use strict";

const popsicle = require('popsicle');

exports.ignore = true;

exports.tip = '*trolo* {n?} - balancea elefante';

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

    let n = parseInt(input.split(/\s/)[0], 10);

    if(isNaN(n)) {
        return Promise.resolve('Cuantos??');
    }
    if(n <= 1) {
        return Promise.resolve('...y la tela se rompió. Todos murieron, fue muy trágico.');
    }
    return Promise.resolve('noysi echo !trolo ' + (n -1) + ' Elefantes se balanceaban sobre la tela de una araña. Como veían que resistía, fueron a llamar a otro elefante');
};