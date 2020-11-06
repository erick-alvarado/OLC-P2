"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expresion = void 0;
const Instruccion_1 = require("../Instruccion");
const Tipo_1 = require("../Tipo");
class Expresion extends Instruccion_1.Instruccion {
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
                return "> " + this.operador1.translate(0) + this.operador2.translate(0);
            case Tipo_1.TypeOperation.MENOR:
                return "< " + this.operador1.translate(0) + this.operador2.translate(0);
            case Tipo_1.TypeOperation.MAYOR_IGUAL:
                return ">= " + this.operador1.translate(0) + this.operador2.translate(0);
            case Tipo_1.TypeOperation.MENOR_IGUAL:
                return "<= " + this.operador1.translate(0) + this.operador2.translate(0);
            case Tipo_1.TypeOperation.IGUAL:
                return "= " + this.operador1.translate(0) + this.operador2.translate(0);
            case Tipo_1.TypeOperation.IGUAL_IGUAL:
                return "== " + this.operador1.translate(0) + this.operador2.translate(0);
            case Tipo_1.TypeOperation.DISTINTO:
                return "!= " + this.operador1.translate(0);
            case Tipo_1.TypeOperation.PARENTESIS:
                return "(" + this.operador1.translate(0) + ")";
            case Tipo_1.TypeOperation.AND:
                return " and " + this.operador1.translate(0) + this.operador2.translate(0);
            case Tipo_1.TypeOperation.OR:
                return " or " + this.operador1.translate(0) + this.operador2.translate(0);
            case Tipo_1.TypeOperation.NOT:
                return " not " + this.operador1.translate(0);
            case Tipo_1.TypeOperation.XOR:
                return " xor " + this.operador1.translate(0) + this.operador2.translate(0);
            case Tipo_1.TypeOperation.SUMA:
                return "+" + this.operador1.translate(0) + this.operador2.translate(0);
            case Tipo_1.TypeOperation.RESTA:
                return "-" + this.operador1.translate(0) + this.operador2.translate(0);
            case Tipo_1.TypeOperation.MULTIPLICACION:
                return "*" + this.operador1.translate(0) + this.operador2.translate(0);
            case Tipo_1.TypeOperation.DIVISION:
                return "/" + this.operador1.translate(0) + this.operador2.translate(0);
            case Tipo_1.TypeOperation.MENOSUNARIO:
                return "-" + this.operador1.translate(0);
            case Tipo_1.TypeOperation.PARENTESIS:
                return "(" + this.operador1.translate(0) + ")";
            default:
                let a = "";
                let b = "";
                if (this.operador1 != null) {
                    a = "" + this.operador1.translate(0);
                }
                if (this.operador2 != null) {
                    b = "" + this.operador2.translate(0);
                }
                return a + b;
        }
        return "";
    }
    generarGrafo(g, padre) {
        //Operador1
        let nombreHijo;
        if (this.operador1 != null) {
            if (this.operador1.getNombreHijo() == null) {
                this.operador1.generarGrafo(g, padre);
            }
            else {
                nombreHijo = "nodo" + g.contador;
                g.grafo += "  " + nombreHijo + "[label=\"" + this.operador1.getNombreHijo() + "\"];\n";
                g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
                g.contador++;
                this.operador1.generarGrafo(g, nombreHijo);
            }
        }
        //Operador2
        if (this.operador2 != null) {
            if (this.operador2.getNombreHijo() == null) {
                this.operador2.generarGrafo(g, nombreHijo);
            }
            else {
                nombreHijo = "nodo" + g.contador;
                g.grafo += "  " + nombreHijo + "[label=\"" + this.operador2.getNombreHijo() + "\"];\n";
                g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
                g.contador++;
                this.operador2.generarGrafo(g, nombreHijo);
            }
        }
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
            case Tipo_1.TypeOperation.DISTINTO: {
                return "DISTINTO";
            }
            case Tipo_1.TypeOperation.IGUAL_IGUAL: {
                return "IGUAL_IGUAL";
            }
            case Tipo_1.TypeOperation.AND: {
                return "AND";
            }
            case Tipo_1.TypeOperation.OR: {
                return "OR";
            }
            case Tipo_1.TypeOperation.XOR: {
                return "XOR";
            }
            case Tipo_1.TypeOperation.NOT: {
                return "NOT";
            }
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
            case Tipo_1.TypeOperation.MENOSUNARIO: {
                return "MENOS_UNARIO";
            }
            case Tipo_1.TypeOperation.PARENTESIS: {
                return "PARENTESIS";
            }
            case Tipo_1.TypeOperation.E: {
                return "EXPRESION";
            }
            case Tipo_1.TypeOperation.EP: {
                return "EP";
            }
            case Tipo_1.TypeOperation.T: {
                return "T";
            }
            case Tipo_1.TypeOperation.TP: {
                return "TP";
            }
            case Tipo_1.TypeOperation.F: {
                return "F";
            }
            case null: {
                return "NULL";
            }
            default:
                break;
        }
    }
}
exports.Expresion = Expresion;
//# sourceMappingURL=Expresion.js.map