"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperacionAritmetica = void 0;
const Instruccion_1 = require("../Instruccion");
const Tipo_1 = require("../Tipo");
class OperacionAritmetica extends Instruccion_1.Instruccion {
    /** 5 + 9
     * @class La expresion OperacionAritmetica, realiza la operacion aritmetica dependiendo del tipo que le sea asigando
     * @param line linea de la expresion
     * @param column columna de la expresion
     * @param operador1 operador izquierdo
     * @param operador2 operador derecho
     * @param tipoOperacion tipo de operacion de la expresion aritmetica
     */
    constructor(tipoOperacion, operador1, operador2, line, column) {
        super(line, column);
        this.operador1 = operador1;
        this.operador2 = operador2;
        this.tipoOperacion = tipoOperacion;
    }
    translate(tab) {
        switch (this.tipoOperacion) {
            case Tipo_1.TypeOperation.SUMA:
                return this.operador1.translate(0) + " + ";
            case Tipo_1.TypeOperation.RESTA:
                return this.operador1.translate(0) + " - ";
            case Tipo_1.TypeOperation.MULTIPLICACION:
                return this.operador1.translate(0) + " * ";
            case Tipo_1.TypeOperation.DIVISION:
                return this.operador1.translate(0) + " / ";
            case Tipo_1.TypeOperation.MENOSUNARIO:
                return "-" + this.operador1.translate(0);
            case Tipo_1.TypeOperation.PARENTESIS:
                return "(" + this.operador1.translate(0) + ")";
        }
        return "";
    }
    generarGrafo(g, padre) {
        //Operador1
        if (this.operador1 != null) {
            let nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + this.operador1.getNombreHijo() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            this.operador1.generarGrafo(g, nombreHijo);
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\" Tipo: " + this.tipoOperacion.toString() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
        }
    }
    getNombreHijo() {
        switch (this.tipoOperacion) {
            case Tipo_1.TypeOperation.SUMA: {
                return "SUMA";
            }
            case Tipo_1.TypeOperation.RESTA: {
                return "RESTA";
            }
            case Tipo_1.TypeOperation.MULTIPLICACION: {
                return "MULTIPLICACION";
            }
            case Tipo_1.TypeOperation.DIVISION: {
                return "DIVISION";
            }
            case Tipo_1.TypeOperation.PARENTESIS: {
                return "PARENTESIS";
            }
            default: {
                return "MENOS_UNARIO";
            }
        }
    }
}
exports.OperacionAritmetica = OperacionAritmetica;
//# sourceMappingURL=OperacionAritmetica.js.map