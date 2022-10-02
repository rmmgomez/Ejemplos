const ruta = '/home/rosa';
import fs from 'fs';
// const fs = require('fs');
fs.readdirSync(ruta).forEach(fichero => { console.log(fichero);});
// OJO con la extensión del archivo, en el caso de no ponerla con la letra m delante (de module), nos tocaría: https://stackoverflow.com/questions/58384179/syntaxerror-cannot-use-import-statement-outside-a-module

