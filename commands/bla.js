"use strict";

exports.tip = '*bla* {nLines:1} - Un político hablando mucho sin decir nada.';

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

    let a = ["Queridos compañeros ", "Por otra parte,y dados los condicionamientos actuales ", "Asimismo, ", "Sin embargo no hemos de olvidar que ", "De igual manera, ", "La práctica de la vida cotidiana prueba que ", "No es indispensable argumentar el peso y la significación de estos problemas ya que ", "Las experiencias ricas y diversas muestran que ", "El afán de organización, pero sobre todo ", "Los superiores principios ideológicos, condicionan que ", "Incluso, bien pudiéramos atrevernos a sugerir que ", "Es obvio señalar que ", "Pero pecaríamos de insinceros si soslayásemos que ", "Por último, y como definitivo elemento esclarecedor, cabe añadir que "];
    let b = ["la realización de las premisas del programa ", "la complejidad de los estudios de los dirigentes ", "el aumento constante, en cantidad y en extensión, de nuestra actividad ", "la estructura actual de la organización ", "el nuevo modelo de actividad de la organización, ", "el desarrollo continuo de distintas formas de actividad ", "nuestra actividad de información y propaganda ", "el reforzamiento y desarrollo de las estructuras ", "la consulta con los numerosos militantes ", "el inicio de la acción general de formación de las actitudes ", "un relanzamiento específico de todos los sectores implicados ", "la superación de experiencias periclitadas ", "una aplicación indiscriminada de los factores concluyentes ", "el proceso consensuado de unas y otras aplicaciones concurrentes "];
    let c = ["nos obliga a un exhaustivo análisis ", "cumple un rol esencial en la formación ", "exige la precisión y la determinación ", "ayuda a la preparación y a la realización ", "garantiza la participación de un grupo importante en la formación ", "cumple deberes importantes en la determinación ", "facilita la creación ", "obstaculiza la apreciación de la importancia ", "ofrece un ensayo interesante de verificación ", "implica el proceso de reestructuración y modernización ", "habrá de significar un auténtico y eficaz punto de partida ", "permite en todo caso explicitar las razones fundamentales ", "asegura, en todo caso, un proceso muy sensible de inversión ", "deriva de una indirecta incidencia superadora "];
    let d = ["de las condiciones financieras y administrativas existentes. ", "de las directivas de desarrollo para el futuro. ", "del sistema de participación general. ", "de las actitudes de los miembros hacia sus deberes ineludibles. ", "de las nuevas proposiciones. ", "de las direcciones educativas en el sentido del progreso. ", "del sistema de formación de cuadros que corresponda a las necesidades. ", "de las condiciones de las actividades apropiadas. ", "del modelo de desarrollo. ", "de las formas de acción. ", "de las básicas premisas adoptadas. ", "de toda una casuística de amplio espectro. ", "de los elementos generadores. ", "de toda una serie de criterios ideológicamente sistematizados en un frente común de actuación regeneradora. "];
    const getLine = () => {
        return a[Math.floor(Math.random() * a.length)]
            + b[Math.floor(Math.random() * b.length)]
            + c[Math.floor(Math.random() * c.length)]
            + d[Math.floor(Math.random() * d.length)];
    };

    let nLines = Number.parseInt(input);
    if(isNaN(nLines)) {
        nLines = 1;
    }
    let msg = '';
    for(let i = 0; i < nLines; i++) {
        msg += getLine() + '\n';
    }
    return Promise.resolve(msg);
};