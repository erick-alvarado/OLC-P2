"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperacionLogica = void 0;
const Instruccion_1 = require("../Instruccion");
const Tipo_1 = require("../Tipo");
class OperacionLogica extends Instruccion_1.Instruccion {
    /**
     * @class La expresion OperacionLogica, realiza la operacion Logica dependiendo del tipo que le sea asigando
     * @param line linea de la expresion
     * @param column columna de la expresion
     * @param operador1 operador izquierdo
     * @param operador2 operador derecho
     * @param tipoOperacion tipo de operacion de la expresion Logica
     */
    constructor(tipoOperacion, operador1, operador2, line, column) {
        super(line, column);
        this.operador1 = operador1;
        this.operador2 = operador2;
        this.tipoOperacion = tipoOperacion;
    }
    translate(tab) {
        switch (this.tipoOperacion) {
            case Tipo_1.TypeOperation.AND:
                return this.operador1.translate(0) + " && " + this.operador2.translate(0);
            case Tipo_1.TypeOperation.OR:
                return this.operador1.translate(0) + " || " + this.operador2.translate(0);
            case Tipo_1.TypeOperation.NOT:
                return "!" + this.operador1.translate(0);
            case Tipo_1.TypeOperation.XOR:
                return this.operador1.translate(0) + " ^ " + this.operador2.translate(0);
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
        if (this.operador2 != null) {
            //Operador2
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + this.operador2.getNombreHijo() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            this.operador2.generarGrafo(g, nombreHijo);
        }
        return null;
    }
    getNombreHijo() {
        switch (this.tipoOperacion) {
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
            default: {
                return "NOT";
            }
        }
    }
}
exports.OperacionLogica = OperacionLogica;
//# sourceMappingURL=OperacionLogica.js.map