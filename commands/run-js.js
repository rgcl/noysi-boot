"use strict";

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const js = require('./js');

exports.ignore = true;

exports.tip = '*run-js* {variable} - Interpreta el valor de una variable como si fuera un script js.';

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

    let name, args;
    if(input.indexOf(' ') != -1) {
        name = input.substring(0, input.indexOf(' '));
        args = input.substring(input.indexOf(' ') + 1);
    } else {
        name = input;
        args = '';
    }


    if (name.indexOf('/') !== -1) {
        return Promise.resolve('Oops, la variable no debería llamarse así.');
    }

    let Key = encodeURIComponent(data.user_id) + '/' + name;

    return s3.getObject({
        Bucket: 'noysi-boot',
        Key: Key
    }).promise().then((vardata) => {
        vardata = JSON.parse(vardata.Body);
        data.text = vardata.value.trim().replace(/\$\*/g, args);
        let argsSplit = args.split(/\s/g);
        data.text = data.text.replace(/\$([0-9]+)]/g, (m) => {
            return argsSplit[parseInt(m.slice(1))] || '';
        });
        data.trigger_word = '!';
        console.log('KEY', Key);
        console.log('data', data);
        return js.exec(data.text, data);
    }).catch((err) => {
        resolve("Oops, parece que tal archivo no existe");
    });

};