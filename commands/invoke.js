"use strict";
const querystring = require('querystring');
const popsicle = require('popsicle');
const SEPARATOR = '- - - - - - - - - -';

exports.tip = '*invoke* {cmd} Invoca un comando de un tercero (solo /, #, >).';

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
    console.log('input', input)
    if(!input) {
        return Promise.resolve('Y el comando a invocar es?');
    }
    let trigger_word = input.charAt(0);
    let bot = ({
        '/': {
            url: 'http://theblood.ddns.net/api.php',
            token: 'FDB57EAAD3D64503A09EDC30616824E7'
        },
        '>': {
            url: 'http://bot.laravelonfire.com/',
            token: '7776CD53B92F416E885EC49AB4A6D1DE'
        },
        '#': {
            url: 'https://glados-bot.herokuapp.com/chat',
            token: '363D1F51F7144478AFB5D682AA87C448'
        }
    })[trigger_word];


    let body = data;
    body.token = bot.token || '';
    body.text = input;
    body.trigger_word = trigger_word;
    return popsicle.request({
        method: 'POST',
        url: bot.url,
        body: body,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).use(
        popsicle.plugins.parse(['json', 'urlencoded'])
    ).then(function(data) {
        console.log('data', data);
        return data.body.text;
    });
};