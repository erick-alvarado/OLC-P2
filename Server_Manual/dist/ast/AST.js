"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
const Instruccion_1 = require("./Instruccion");
class AST extends Instruccion_1.Instruccion {
    constructor(instrucciones, errores, tokens) {
        super(0, 0);
        this.instrucciones = instrucciones;
        this.listaError = errores;
        this.listaToken = tokens;
    }
    translate(tab) {
        let cadena = "";
        for (let a = 0; a < this.instrucciones.length; a++) {
            cadena += this.instrucciones[a].translate(0);
        }
        return cadena;
    }
    generarGrafo(g, padre) {
        //----------- LISTA DE INSTRUCCIONES -----------
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"CLASES\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        padre = nombreHijo;
        for (let x = 0; x < this.instrucciones.length; x++) {
            let inst = this.instrucciones[x];
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + inst.getNombreHijo() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            inst.generarGrafo(g, nombreHijo);
        }
        //----------------------------------------------
    }
    getlistaErrores() {
        let cadena = "";
        for (let a = 0; a < this.listaError.length; a++) {
            cadena += this.listaError[a] + "\n";
        }
        return cadena;
    }
    getlistaTokens() {
        let cadena = "";
        for (let a = 0; a < this.listaToken.length; a++) {
            cadena += this.listaToken[a].descripcion + "\n";
        }
        return cadena;
    }
    addError(pta) {
        this.listaError.push(pta);
    }
    addToken(token) {
        this.listaToken.push(token);
    }
    setInstruccion(instrucciones) {
        this.instrucciones = instrucciones;
    }
    getNombreHijo() {
        throw new Error("Method not implemented.");
    }
}
exports.AST = AST;
//# sourceMappingURL=AST.js.map