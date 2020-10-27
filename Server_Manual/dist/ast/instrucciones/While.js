"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.While = void 0;
const Instruccion_1 = require("../Instruccion");
class While extends Instruccion_1.Instruccion {
    /**
     * @class La instruccion While realiza n iteraciones, dependiendo de la condicion
     * @param line linea de la instruccion while
     * @param column columna de la instruccion while
     * @param condicion condicion del ciclo
     * @param instrucciones lista de sentencias o instrucciones dentro del while
     */
    constructor(condicion, instrucciones, line, column) {
        super(line, column);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
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
        let cadena = "\n";
        if (this.instrucciones.length > 0) {
            for (const ins of this.instrucciones) {
                cadena += ins.translate(tab);
            }
        }
        cadena += "\n";
        let cadena2 = this.condicion.translate(0);
        return tabu + "while " + cadena2 + ":" + cadena;
    }
    generarGrafo(g, padre) {
        let p = padre;
        //Condicion
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"(\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"CONDICION\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        padre = nombreHijo;
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.condicion.getNombreHijo() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        this.condicion.generarGrafo(g, nombreHijo);
        padre = p;
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\")\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"{\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        //----------- LISTA DE INSTRUCCIONES -----------
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"INSTRUCCIONES\"];\n";
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
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"}\"];\n";
        g.grafo += "  " + p + " -> " + nombreHijo + ";\n";
        g.contador++;
        //----------------------------------------------
        return null;
    }
    getNombreHijo() {
        return "WHILE";
    }
}
exports.While = While;
//# sourceMappingURL=While.js.map