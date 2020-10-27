"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clase = void 0;
const Instruccion_1 = require("../Instruccion");
class Clase extends Instruccion_1.Instruccion {
    /**
     *  a = 5;
     * @class La instruccion asignacion, modifica el valor de una variable en la tabla de simbolos
     * @param id identificador de la variable que se va a modificar
     * @param line linea donde se esata asignando el nuevo valor a la variable
     * @param column columna donde se esata asignando el nuevo valor a la variable
     * @param valor nuevo valor que se le asignara a la variable
     */
    constructor(id, instrucciones, line, column) {
        super(line, column);
        this.id = id;
        this.instrucciones = instrucciones;
    }
    translate(tab) {
        tab = 1;
        let cadena = "\n";
        if (this.instrucciones != null) {
            if (this.instrucciones.length > 0) {
                for (const ins of this.instrucciones) {
                    cadena += ins.translate(tab);
                }
            }
        }
        cadena += "\n";
        return "class " + this.id + ":" + cadena;
    }
    generarGrafo(g, padre) {
        //----------- LISTA DE INSTRUCCIONES -----------
        let nombreHijo = "";
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"public\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"class\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.id + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"{\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"INSTRUCCIONES\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        let aux = padre;
        padre = nombreHijo;
        if (this.instrucciones != null) {
            for (let x = 0; x < this.instrucciones.length; x++) {
                let inst = this.instrucciones[x];
                nombreHijo = "nodo" + g.contador;
                g.grafo += "  " + nombreHijo + "[label=\"" + inst.getNombreHijo() + "\"];\n";
                g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
                g.contador++;
                inst.generarGrafo(g, nombreHijo);
            }
        }
        padre = aux;
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"}\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        //----------------------------------------------
    }
    getNombreHijo() {
        return "CLASE";
    }
}
exports.Clase = Clase;
//# sourceMappingURL=Clase.js.map