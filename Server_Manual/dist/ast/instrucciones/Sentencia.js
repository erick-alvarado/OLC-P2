"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sentencia = void 0;
const Instruccion_1 = require("../Instruccion");
class Sentencia extends Instruccion_1.Instruccion {
    /**
     * @class La instruccion While realiza n iteraciones, dependiendo de la condicion
     * @param line linea de la instruccion while
     * @param column columna de la instruccion while
     * @param condicion condicion del ciclo
     * @param instrucciones lista de sentencias o instrucciones dentro del while
     */
    constructor(nombre, expresion, line, column) {
        super(line, column);
        this.nombre = nombre;
        this.expresion = expresion;
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
        tab++;
        if (this.nombre == "return") {
            return tabu + "" + this.nombre + " " + this.expresion.translate(0) + ";\n";
        }
        return tabu + "" + this.nombre + ";\n";
    }
    generarGrafo(g, padre) {
        let p = padre;
        //Condicion
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.nombre + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        if (this.expresion != null) {
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"EXPRESION\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            this.expresion.generarGrafo(g, nombreHijo);
        }
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\";\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
    }
    getNombreHijo() {
        return "SENTENCIA";
    }
}
exports.Sentencia = Sentencia;
//# sourceMappingURL=Sentencia.js.map