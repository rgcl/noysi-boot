"use strict";

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.tip = '*list* - Lista las variables del usuario.';

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
    let Key = encodeURIComponent(data.user_id) + '/';


    return s3.listObjects({
        Bucket: 'noysi-boot',
        Prefix: Key
    }).promise().then((data) => {

        if(!data.Contents.length) {
            return 'No tienes variables.';
        }

        let resp = '\n';
        data.Contents.forEach((item) => {
            resp += '- ' + item.Key.split('/')[1] +
                ' (' + item.Size + ' bytes)\n';
        });
        return resp;

    });

};