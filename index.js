'use strict';


const querystring = require('querystring');

const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiJub3lzaTphODcwMjJkIiwiaWF0IjoxNDg0MTgzNTU2LCJzZWNyZXQiOiIwYTg3MmYwNTEzMWQ0NjU4OTFiODAzNjg4N2FmZDQzYSJ9.RwfmAf09VrHNyAr0CS25VjXedboQ7s73Np892nwYMYA=';

const commands = {
    'ayuda': require('./commands/ayuda'),
    'bla': require('./commands/bla'),
    'del': require('./commands/del'),
    'echo': require('./commands/echo'),
    'invoke': require('./commands/invoke'),
    'gato': require('./commands/gato'),
    'get': require('./commands/get'),
    'list': require('./commands/list'),
    'match': require('./commands/match'),
    'math': require('./commands/math'),
    'js': require('./commands/js'),
    'prev': require('./commands/prev'),
    'push': require('./commands/push'),
    'put': require('./commands/put'),
    'run': require('./commands/run'),
    'run-js': require('./commands/run-js'),
    'stackoverflow': require('./commands/stackoverflow'),
    'troll': require('./commands/troll'),
    'trolo': require('./commands/trolo'),
    '?': {
        ignore: true,
        exec: () => {
            return Promise.resolve('Si necesitas ayuda, escribe !ayuda');
        }
    }
};


exports.handler = (event, context, callback) => {
    const done = function (msg) {
        let err, res;
        if(msg instanceof Error) {
            err = msg;
        } else {
            res = msg;
        }
        callback(null, {
            statusCode: err ? '400' : '200',
            body: err ? err.message : JSON.stringify({ text: res }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    let data;
    try {
        data = querystring.parse(event.body || '');
    } catch(e) {
        return done(e);
    }
    data.jwt = jwt;
    data.cmd = commands;

    exports.run(data.text.trim(), data, done);

};

exports.run = (text, data, done) => {
    let inputLine =  text.trim();
    if(inputLine.charAt(0) === '!') {
        inputLine = inputLine.substr(1);
    }
    inputLine = inputLine.replace(/[^ |!]+\.sh[^|]*/g, function(file) {
        return 'run ' + file
    }).replace(/[^ |!]+\.js[^|]*/g, function(file) {
        return 'run-js ' + file
    });
    let pipes = inputLine.split('|');
    (function recursive(pipes, i, pastResult) {
        let input = pipes[i++].trim();
        let inputSplit = input.split(/\s/);
        let command = inputSplit[0].toLowerCase();
        let params = input.substring(command.length) + ' ' + pastResult;
        let cmd = commands[command];
        if(!cmd) {
            cmd = commands['?'];
        }
        cmd.exec(params.trim(), data).then((resp) => {
            if(pipes.length === i) {
                if(cmd.returnClear) {
                    done(resp);
                } else {
                    done('@' + data.user_name + ': ' + resp);
                }
            } else {
                recursive(pipes, i, resp);
            }
        }).catch(done);
    })(pipes, 0, '');
};