"use strict";

const popsicle = require('popsicle');

exports.tip = '*prev* {nPrevio?} - Retorna el último mensaje del canal, o bien nPrevio, si está establecido.';

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

    let nPrevio = parseInt(input, 10);
    if(isNaN(nPrevio)) {
        nPrevio = 2;
    }

    return popsicle.request({
        method: 'GET',
        url: 'https://noysi.com/v1/teams/' + data.team_id + '/channels/' + data.channel_id + '/messages',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + data.jwt
        }
    }).use(
        popsicle.plugins.parse('json')
    ).then(function(data) {
        let msg = data.body.list[data.body.list.length - nPrevio];
        return msg ? msg.text : 'No lo alcanzo, está demasiado atrás';
    });
};