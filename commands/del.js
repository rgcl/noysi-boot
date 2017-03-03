"use strict";

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.tip = '*del* {name} - Elimina la variable name.';

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

    if (input.indexOf('/') !== -1) {
        return Promise.resolve('Oops, la variable no debería llamarse así.');
    }
    var Key = encodeURIComponent(data.user_id) + '/' + input;

    return s3.deleteObject({
        Bucket: 'noysi-boot',
        Key: Key
    }).promise().then((data) => {
        return ':ok_hand:';
    }).catch((e) => {
        return 'Oops, ' + e.message
    });

};