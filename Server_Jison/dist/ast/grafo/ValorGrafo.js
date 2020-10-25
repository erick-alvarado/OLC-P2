"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValorGrafo = void 0;
class ValorGrafo {
    /**
     *
     * @param contador Contador de nodos
     * @param grafo     Cadena que contiene el dot o el grafo
     */
    constructor(contador, grafo) {
        this.contador = contador;
        this.grafo = grafo;
    }
    getContador() {
        return this.contador;
    }
    getGrafo() {
        return this.grafo;
    }
    setContador(contador) {
        this.contador = contador;
    }
    setGrafo(grafo) {
        this.grafo = grafo;
    }
}
exports.ValorGrafo = ValorGrafo;
//# sourceMappingURL=ValorGrafo.js.map