"use strict";

const Sandbox = require('sandbox');

exports.tip = '*js* {code} - Interprete  JavaScript.';

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
    try {
        return new Promise((resolve) => {
            let s = new Sandbox();
            s.options.timeout = 3000;
            s.run(input, (output) => {
                let response = output.console.join('\n') +
                    (output.result === 'null' ? '' : '\n' + output.result);
                resolve(response);
            });
        });
    } catch(err) {
        return Promise.resolve('Oops, ' + err.message);
    }
};
