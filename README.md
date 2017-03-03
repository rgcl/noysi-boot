
#noysi-boot


> **Advertencia:** Este fue un proyecto de hobby no profesional. 
> Se expone para fines educativos y narcisistas solamente.
> En todo caso, la licencia
> es MIT, así que puedes usarlo para lo que quieras.

Este es un ejemplo de boot para noysi en nodejs.

Esta basado en comandos. Cada comando es un archivo con una función js.

La implementación inicial fue en AWS API-Gateway + AWS Lambda, pero también
 se puede usar a modo librería en cosas clase media como expressjs o whatever*.
 
No se terminaron todos los comandos, y no es "llegar y usar" (por ejemplo, algunos 
 comandos como get, put, del y list requieren que configures la conección a tu cuenta AWS).
 
##Cómo se ve el boot?
Ingresa a https://noysi.com/site-es/comunidades/programadoreschile y busca
el canal "_bot channel_", luego escribe _!ayuda_

Este boot no es conversacional, sino más bien parecido a una interfaz de línea de
comandos. Puedes usar pipe (|) para que la salida de un comando sea la entrada del otro.

##Ejemplos:
`!js console.log('Hola pal q lee')` -> 'Hola pal q lee'

`!js console.log('hola pal q lee) | troll` -> 'Hili pil q lii'

`!math 9 - 3 / 1 / 3 + 1` -> 9

`!invoke #talk no merecías ganar` -> 'por qué no te enfrentas?'
 
##Ejemplo de implementación en express:
```javascript
const boot = require('noysi-boot');
const app = require('express').express();

app.use('/algo', (req, res) => {
    
    let text = req.body.text;
    let data = req.body;
    
    data.jwt = 'tu token jwt desde el panel de integraciones de noysi';
    
    boot.exec(text, data, (result) => {
       
        res.json({
            text: result
        });
        
    });
    
}); 

```

##Creando nuevos comandos

1) decide un nombre, por ejemplo _saluda_
2) crea un archivo en commands, ejemplo _saluda.js_
3) En _saluda.js_ sigue este patrón:

```javascript
"use strict";

exports.tip = '*saluda* {nombre?} - Da un saludo.';

/**
* @param {string} input el texto que acompaña al comando
* @param {object} data los datos que arroja noysi en cada petición, por ejemplo
* channel_id. Además está el token jwt para hacer peticiones a noysi (ver ejemplo en prev.js). 
*/
exports.exec = (input, data) => {
    if(input.length > 0) {
        return Promise.resolve("Un Hola pal que lee para tí, " + input);
    }
    return Promise.resolve("Hola pal que lee");
};
```

4) Registrar el archivo _saluda.js_ en index.js, en la variable commands:
 
```javascript
const commands = {
    // ....
    'saluda': require('./commands/saluda'),
    // ....
}
```

Listo!


___

*(Perdí un concurso aśi que estoy picado XD)