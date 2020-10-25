"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitivo = void 0;
const Instruccion_1 = require("../Instruccion");
class Primitivo extends Instruccion_1.Instruccion {
    /**
     * @class La clase Primitivo almacena el valor real (numero|cadena|booleano)
     * @param line linea del primitivo
     * @param column columna del primitivo
     * @param valor valor real
     */
    constructor(valor, line, column) {
        super(line, column);
        this.valor = valor;
    }
    translate(tab) {
        console.log(this.valor);
        return this.valor;
    }
    generarGrafo(g, padre) {
        let cadena = this.valor;
        try {
            if (this.valor[0] == '"' || this.valor[0] == '\'') {
                cadena = cadena.substr(1, cadena.length - 2);
            }
        }
        finally {
        }
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + cadena.toString() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        return null;
    }
    getNombreHijo() {
        return "PRIMITIVO";
    }
}
exports.Primitivo = Primitivo;
//# sourceMappingURL=Primitivo.js.map