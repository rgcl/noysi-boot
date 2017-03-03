"use strict";

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.ignore = true;

exports.tip = '*gato* {xy} - Juega al gato contra el Bot. ~Iphone de premio!~ *BETA*';

const blank = "```\
3| | | |\
2| | | |\
1| | | |\
  a b c\
```";


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

    let Key = 'gato/' + encodeURIComponent(data.user_id);

    return s3.getObject({
        Bucket: 'noysi-boot',
        Key: Key
    }).promise().then((data) => {

        let payload = unserialize(data.Body);

        if(!payload) {
            return getTablero(payload.vector);
        }

        return jugada(input, payload, Key);

    }).catch((err) => {
        if(err.code !== 'NoSuchKey') {
           throw  err;
        }
        return partidaInicial(Key);
    });

};


function partidaInicial(Key) {

    let msg = 'PRE_BETA EN DESARROLLO\nSi ganas te regalo un Iphone, si no ganas debes hacer 1'
        + ' abdominal.\nPara jugar, simplemente escribe !gato con las cordenadas. Por ejemplo, para poner la X al medio:\n```!gato b2```\n'
        + 'Los humanos primero n_n\n\n' + blank;

    return s3.putObject({
        Bucket: 'noysi-boot',
        Key: Key,
        Body: serialize({
            turnos: 0,
            partidas: 1,
            vector: '        '
        }),
        ACL: 'public-read-write'
    }).promise().then(() => {
        return msg;
    });

}

function newPartida(Key, payload) {

    let msg = 'Listo para otra partida? ahora si no ganas debes hacer ' +
        (++payload.partidas) + ' abdominales. Claro que puede que ganes, y que yo te de un Iphone...\n'
        + 'Empieza con !gato {coordenadas}\n\n' + blank;

    return s3.putObject({
        Bucket: 'noysi-boot',
        Key: Key,
        Body: serialize({
            turnos: 0,
            partidas: payload.partidas,
            vector: '        '
        }),
        ACL: 'public-read-write'
    }).promise().then(() => {
        return msg;
    });

}

function unserialize(body) {
    let payload = body.toString().split('|');
    return {
        partidas: parseInt(payload[0], 10),
        turnos: parseInt(payload[1], 10),
        vector: payload[2]
    };
}

function serialize(payload) {
    return payload.turnos | payload.partidas + '|' + payload.vector;
}

function jugada(jugadaHumano, payload, Key) {

    let vector = payload.vector;

    let coordenadasHumano = jugadaHumano.split(/\s/)[0];
    if(coordenadasHumano.length !== 2) {
        return makeErrorMsgCoordenadasInvalidas(vector);
    }

    let x = coordenadasHumano[0].toLowerCase();
    let y = parseInt(coordenadasHumano[1]);

    if(isNaN(y) || y < 1 || y > 3) {
        return makeErrorMsgCoordenadasInvalidas(vector);
    }
    y--;
    switch(x) {
        case 'a':
            x = 0;
            break;
        case 'b':
            x = 1;
            break;
        case 'c':
            x = 2;
            break;
        default:
            return makeErrorMsgCoordenadasInvalidas(vector);
    }

    let cell = vectorGetByXY(vector, x, y);
    if(cell != ' ') {
        return 'Ya hay un ' + cell + ' ahi ¬¬\n\n' + getTablero(vector);
    }

    vector = vectorSetByXY(vector, x, y, 'X');
    payload.turnos++;

    let h1 = vector.slice(0, 2);
    let h2 = vector.slice(2, 6);
    let h3 = vector.slice(6, 8);

    let v1 = vector[0] + vector[3] + vector[7];
    let v2 = vector[1] + vector[4] + vector[8];
    let v3 = vector[2] + vector[5] + vector[9];

    let c1 = vector[0] + vector[4] + vector[9];
    let c2 = vector[6] + vector[4] + vector[2];

    let lineas = [h1, h2, h3, v1, v2, v3, c1, c2];

    let tablero = [
        h1,
        h2,
        h3
    ];

    let gameOver = lineas.some((linea) => {
        return linea === 'XXX';
    });

    // ganó el usuario
    if(gameOver) {
        return 'FATAL ERROR: MatrixMemmoryAccessException, memory dropped suddenly\n\nServicio reestablecido en 3, 2, 1...';
    }

    // marcar jugada
    if(payload.turnos == 1) {
        // es la primera jugada, elijes estrategia

        // Esquina?
        if(h1[0] === 'X' || h1[2] === 'X' ||
            h2[0] === 'X' || h2[2] === 'X'||
            h3[0] === 'X' || h3[2] === 'X') {
            // colocar centro
            vector = vectorSetByXY(vector, 1, 1, 'O');
            payload.vector = vector;
            save(payload);
            return 'Ok, tu turno ' + getTablero(vector);
        }

    }

    gameOver = lineas.some((linea) => {
        return linea === 'OOO';
    });
    if(gameOver) {
        return 'Ha-ha, ahora haz las ' + (payload.partidas++) + ' abdominales, perdedor';
    }


}

function save(Key, payload) {
    return s3.putObject({
        Bucket: 'noysi-boot',
        Key: Key,
        Body: serialize(payload),
        ACL: 'public-read-write'
    }).promise().then(() => {
        return msg;
    });
}

function makeErrorMsgCoordenadasInvalidas(vector) {
    return 'Las coordenadas deben ser tipo a2, b3 y dentro del rango... vuelve a intentar...\n\n' + getTablero(vector);
}

function vectorGetByXY(vector, x, y) {
    return vector[(2 - y) * 3 + x];
}

function vectorSetByXY(vector, x, y, val) {
    vector[(2 - y) * 3 + x] = val;
    return vector;
}

function getTablero(vector) {
    return "```\n" +
        "3|" + vector[0] + "|" + vector[1] + "|" + vector[2] + "|\n" +
        "2|" + vector[3] + "|" + vector[4] + "|" + vector[5] + "|\n" +
        "1|" + vector[6] + "|" + vector[7] + "|" + vector[8] + "|\n" +
        "  a b c\n" +
        "```";
}