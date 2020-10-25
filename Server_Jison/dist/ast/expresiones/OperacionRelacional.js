"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperacionRelacional = void 0;
const Instruccion_1 = require("../Instruccion");
const Tipo_1 = require("../Tipo");
class OperacionRelacional extends Instruccion_1.Instruccion {
    /**
     * @class La expresion OperacionRelacional, realiza la operacion Relacional dependiendo del tipo que le sea asigando
     * @param line linea de la expresion
     * @param column columna de la expresion
     * @param operador1 operador izquierdo
     * @param operador2 operador derecho
     * @param tipoOperacion tipo de operacion de la expresion Relacional
     */
    constructor(tipoOperacion, operador1, operador2, line, column) {
        super(line, column);
        this.operador1 = operador1;
        this.operador2 = operador2;
        this.tipoOperacion = tipoOperacion;
    }
    translate(tab) {
        switch (this.tipoOperacion) {
            case Tipo_1.TypeOperation.MAYOR:
                return this.operador1.translate(0) + " > " + this.operador2.translate(0);
            case Tipo_1.TypeOperation.MENOR:
                return this.operador1.translate(0) + " < " + this.operador2.translate(0);
            case Tipo_1.TypeOperation.MAYOR_IGUAL:
                return this.operador1.translate(0) + " >= " + this.operador2.translate(0);
            case Tipo_1.TypeOperation.MENOR_IGUAL:
                return this.operador1.translate(0) + " <= " + this.operador2.translate(0);
            case Tipo_1.TypeOperation.IGUAL:
                return this.operador1.translate(0) + " = " + this.operador2.translate(0);
            case Tipo_1.TypeOperation.IGUAL_IGUAL:
                return this.operador1.translate(0) + " == " + this.operador2.translate(0);
            case Tipo_1.TypeOperation.DISTINTO:
                return "!" + this.operador1.translate(0);
            case Tipo_1.TypeOperation.PARENTESIS:
                return "(" + this.operador1.translate(0) + ")";
        }
        return "";
    }
    generarGrafo(g, padre) {
        //Operador1
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.operador1.getNombreHijo() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        this.operador1.generarGrafo(g, nombreHijo);
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\" Tipo: " + this.tipoOperacion.toString() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        //Operador2
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.operador2.getNombreHijo() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        this.operador2.generarGrafo(g, nombreHijo);
        return null;
    }
    getNombreHijo() {
        switch (this.tipoOperacion) {
            case Tipo_1.TypeOperation.MAYOR: {
                return "MAYOR";
            }
            case Tipo_1.TypeOperation.MENOR: {
                return "MENOR";
            }
            case Tipo_1.TypeOperation.MENOR_IGUAL: {
                return "MENOR_IGUAL";
            }
            case Tipo_1.TypeOperation.MAYOR_IGUAL: {
                return "MAYOR_IGUAL";
            }
            case Tipo_1.TypeOperation.IGUAL: {
                return "IGUAL";
            }
            case Tipo_1.TypeOperation.IGUAL_IGUAL: {
                return "IGUAL_IGUAL";
            }
            default: {
                return "";
            }
        }
    }
}
exports.OperacionRelacional = OperacionRelacional;
//# sourceMappingURL=OperacionRelacional.js.map