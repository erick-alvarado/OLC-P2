"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.If = void 0;
const Instruccion_1 = require("../Instruccion");
class If extends Instruccion_1.Instruccion {
    /**
     * @class La instruccion While realiza n iteraciones, dependiendo de la condicion
     * @param line linea de la instruccion while
     * @param column columna de la instruccion while
     * @param condicion condicion del ciclo
     * @param instrucciones lista de sentencias o instrucciones dentro del while
     */
    constructor(condicion, instrucciones, elso, line, column) {
        super(line, column);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
        this.elso = elso;
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
        let tabu2;
        let tabu;
        if (tab < 0) {
            tabu2 = "";
            tab = tab * -1;
            tabu = this.tab(tab);
        }
        else {
            tabu = this.tab(tab);
            tabu2 = tabu;
        }
        tab++;
        let cadena = "{\n";
        if (this.instrucciones.length > 0) {
            for (const ins of this.instrucciones) {
                cadena += ins.translate(tab);
            }
        }
        cadena += "\n" + tabu + "}";
        if (this.elso == null) {
            return tabu2 + "if(" + this.condicion.translate(tab) + ")" + cadena;
        }
        else {
            tab--;
            return tabu2 + "if(" + this.condicion.translate(tab) + ")" + cadena + this.elso.translate(tab);
        }
    }
    generarGrafo(g, padre) {
        let p = padre;
        //Condicion
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"if\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"(\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.condicion.getNombreHijo() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        this.condicion.generarGrafo(g, nombreHijo);
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
        padre = p;
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"}\"];\n";
        g.grafo += "  " + p + " -> " + nombreHijo + ";\n";
        g.contador++;
        if (this.elso != null) {
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + this.elso.getNombreHijo() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            this.elso.generarGrafo(g, padre);
        }
    }
    getNombreHijo() {
        return "SENTENCIAS_IF";
    }
}
exports.If = If;
//# sourceMappingURL=If.js.map