"use strict";

exports.tip = '*ayuda* {cmd?} - Muestra ayuda sobre el comando cmd.';

exports.alias = ['help', 'aiuda', 'aiudaa'];
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
    if(!input.length) {


        let msg = '!Bot está para ayudar\n\n' +
            'Puedes encadenar varios comandos con "|" (pipe), ejemplo:\n' +
            '!blah | troll | put\n(notar que solo el primer comando necesita \'!\')\n\nLista de comandos:\n\n';
        for (let key in data.cmd) {
            if (data.cmd.hasOwnProperty(key)) {
                let cmd = data.cmd[key];
                if (!cmd.ignore && cmd.tip) {
                    msg += cmd.tip + '\n';
                }
            }
        }
        return Promise.resolve(msg);
    }

    let cmd = data.cmd[input.toLowerCase()];

    if(!cmd) {
        return Promise.resolve('Ese comando no existe');
    }

    if(!cmd.man) {
        return Promise.resolve('Al respecto, solo sé lo siguiente:\n' + cmd.tip);
    }

    return Promise.resolve(cmd.man);

};