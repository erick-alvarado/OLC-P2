import { Instruccion } from "../Instruccion"
import { Type, TypeOperation } from "../Tipo";
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Incre_Decre extends Instruccion {
    identificador:Instruccion;
    tipoOperacion:TypeOperation;
    /** 5 + 9
     * @class La expresion OperacionAritmetica, realiza la operacion aritmetica dependiendo del tipo que le sea asigando
     * @param line linea de la expresion
     * @param column columna de la expresion
     * @param operador1 operador izquierdo
     * @param operador2 operador derecho
     * @param tipoOperacion tipo de operacion de la expresion aritmetica
     */
    constructor(identificador:Instruccion,tipoOperacion:TypeOperation,  line:Number, column:Number){
        super(line,column)
        this.identificador = identificador;
        this.tipoOperacion = tipoOperacion;
    }
    tab(tab: number): String{
        let n =0
        let tabs = ""
        while(tab>n){
            tabs+="\t"
            n++;
        }
        return tabs;
    }
    translate(tab:number) {
        let tabu = this.tab(tab);
        
        switch(this.tipoOperacion){
            case TypeOperation.ADICION:
                return tabu+""+this.identificador+"++\n";
            case TypeOperation.SUBSTRACCION:
                return tabu+""+this.identificador+"--\n";
        }
        return "que pedo"
    }
    
    generarGrafo(g: ValorGrafo, padre: String) {
        let nombreHijo = "nodo"+g.contador;
        let p = padre;
        g.grafo += "  "+nombreHijo +"[label=\"ID\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        padre = nombreHijo;    
        nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\""+this.identificador+"\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        padre = p;

        if(this.tipoOperacion==TypeOperation.ADICION){
            nombreHijo = "nodo"+g.contador;
            g.grafo += "  "+nombreHijo +"[label=\"++\"];\n";
            g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
            g.contador++;
        }
        else{
            nombreHijo = "nodo"+g.contador;
            g.grafo += "  "+nombreHijo +"[label=\"--\"];\n";
            g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
            g.contador++;
        }

        return null;
    }
    getNombreHijo(): String {
        switch(this.tipoOperacion){
            case TypeOperation.ADICION: { return "ADICION"; }
            case TypeOperation.SUBSTRACCION: { return "SUBSTRACCION"; }
        }
    }
}