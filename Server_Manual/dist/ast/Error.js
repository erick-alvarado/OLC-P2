"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LError = void 0;
class LError {
    constructor() {
    }
    setError(texto) {
        this.lista_error.push(texto);
        console.log(this.lista_error);
        console.log("agregado");
    }
    getErrores() {
        let cadena = "";
        for (let a = 0; a < this.lista_error.length; a++) {
            cadena += this.lista_error[a] + "\n";
        }
        return cadena;
    }
}
exports.LError = LError;
var lista_error = [];
//# sourceMappingURL=Error.js.map