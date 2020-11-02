export class ValorGrafo {
    contador:number;    
    grafo:string;       
    /**
     * 
     * @param contador Contador de nodos
     * @param grafo     Cadena que contiene el dot o el grafo
     */

    constructor(contador:number, grafo:string) {
        this.contador = contador;
        this.grafo = grafo;
    }

    getContador() :number{
        return this.contador;
    }

    getGrafo():string {
        return this.grafo;
    }

    setContador(contador:number) {
        this.contador = contador;
    }

    setGrafo(grafo:string) {
        this.grafo = grafo;
    }
}