"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
const Instruccion_1 = require("../Instruccion");
class Print extends Instruccion_1.Instruccion {
    /** print("hola")
     * @class La instruccion print, imprime el valor de una expresion en consola
     * @param line linea de la instruccion print
     * @param column columna de la instruccion print
     * @param expresion expresion que se va imprimir
     */
    constructor(tipo, expresion, line, column) {
        super(line, column);
        this.expresion = expresion;
        this.tipo = tipo;
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
        if (this.tipo == 'print_') {
            return tabu + "print(" + this.expresion.translate(0) + ")\n";
        }
        if (this.tipo == 'println_') {
            return tabu + "print(" + this.expresion.translate(0) + ',end="")\n';
        }
    }
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.expresion.getNombreHijo() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        this.expresion.generarGrafo(g, nombreHijo);
        return null;
    }
    getNombreHijo() {
        return "PRINT";
    }
}
exports.Print = Print;
//# sourceMappingURL=Print.js.map