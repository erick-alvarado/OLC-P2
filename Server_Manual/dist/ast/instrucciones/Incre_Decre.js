"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Incre_Decre = void 0;
const Instruccion_1 = require("../Instruccion");
const Tipo_1 = require("../Tipo");
class Incre_Decre extends Instruccion_1.Instruccion {
    /** 5 + 9
     * @class La expresion OperacionAritmetica, realiza la operacion aritmetica dependiendo del tipo que le sea asigando
     * @param line linea de la expresion
     * @param column columna de la expresion
     * @param operador1 operador izquierdo
     * @param operador2 operador derecho
     * @param tipoOperacion tipo de operacion de la expresion aritmetica
     */
    constructor(identificador, tipoOperacion, line, column) {
        super(line, column);
        this.identificador = identificador;
        this.tipoOperacion = tipoOperacion;
    }
    tab(tab) {
        let n = 0;
        let tabs = "";
        while (tab > n) {
            tabs += "\t";
            n++;
        }
        return tabs;
    }
    translate(tab) {
        let tabu = this.tab(tab);
        switch (this.tipoOperacion) {
            case Tipo_1.TypeOperation.ADICION:
                return tabu + "" + this.identificador + "+=1\n";
            case Tipo_1.TypeOperation.SUBSTRACCION:
                return tabu + "" + this.identificador + "-=1\n";
        }
        return "que pedo";
    }
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.contador;
        let p = padre;
        g.grafo += "  " + nombreHijo + "[label=\"ID\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        padre = nombreHijo;
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.identificador + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        padre = p;
        if (this.tipoOperacion == Tipo_1.TypeOperation.ADICION) {
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"++\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
        }
        else {
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"--\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
        }
        return null;
    }
    getNombreHijo() {
        switch (this.tipoOperacion) {
            case Tipo_1.TypeOperation.ADICION: {
                return "ADICION";
            }
            case Tipo_1.TypeOperation.SUBSTRACCION: {
                return "SUBSTRACCION";
            }
        }
    }
}
exports.Incre_Decre = Incre_Decre;
//# sourceMappingURL=Incre_Decre.js.map