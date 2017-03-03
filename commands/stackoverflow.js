"use strict";
const querystring = require('querystring');
const popsicle = require('popsicle');
const SEPARATOR = '- - - - - - - - - -';

exports.tip = '*stackoverflow* {question} {--limit 5?} - Busca question en StackOverflow.';

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

    if(!input) {
        return Promise.resolve('Y la pregunta es?...\n(!stackoverflow {question})');
    }

    let limit = input.match(/--limit ([0-9]+)/);
    if(!limit) {
        limit = 5;
    } else {
        limit = limit[1];
    }

    let title = querystring.stringify(input);
    return popsicle.request({
        method: 'GET',
        url: 'http://api.stackexchange.com/2.2/search/advanced?order=desc&sort=relevance&q=' + title + '&accepted=True&site=stackoverflow',
        headers: {
            'Content-Type': 'application/json'
        }
    }).use(
        popsicle.plugins.parse('json')
    ).then(function(data) {
        let resp = '';
        data.body.items.slice(0, limit).forEach((item) => {
            resp += '\n*' + item.title + '* (' + item.answer_count + ' respuestas)\n' +
                ':link: ' + item.link + '\n' +
                ':note: ' + item.tags.join(', ') + '\n' + SEPARATOR
        });
        resp = resp.substring(0, resp.length - SEPARATOR.length);
        return resp;
    });
};