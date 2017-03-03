"use strict";

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const prev = require('./prev');
const get = require('./get');

exports.tip = '*push* {name} {value?} - Guarda value al final de la variable name. Si value no está usa prev';

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

    let name = input.substring(0, input.indexOf(' ')) || 'default';
    let value = input.substring(input.indexOf(' ') + 1);

    if (name.indexOf('/') !== -1) {
        return Promise.resolve('Oops, la variable no debería llamarse así.');
    }

    let promise;
    if(!value) {
        promise = prev.exec('', data);
    } else {
        promise = Promise.resolve(value);
    }

    let Key = encodeURIComponent(data.user_id) + '/' + name;

    let _value;
    return promise.then((value) => {
        _value = value;
        return s3.getObject({
            Bucket: 'noysi-boot',
            Key: Key
        }).promise();
    }).catch((err) => {
        if(err.code === 'NoSuchKey') {
            return { Body: '' };
        }
        throw err;
    }).then((oldData) => {
        oldData = JSON.parse(oldData.Body);
        let newValue = oldData.value + '\n- - - - - - - - - -\n' + _value;
        return s3.putObject({
            Bucket: 'noysi-boot',
            Key: Key,
            ACL: 'public-read-write',
            Body: JSON.stringify({
                value: newValue,
                meta: {
                    name: name,
                    user_name: data.user_name,
                    user_id: data.user_id,
                    timestamp: data.timestamp,
                    channel_name: data.channel_name,
                    channel_id: data.channel_id
                }
            })
        }).promise();
    }).then(() => {
        return ':ok_hand:'
    }).catch((e) => {
        return 'Oops, ' + e.message
    });

};