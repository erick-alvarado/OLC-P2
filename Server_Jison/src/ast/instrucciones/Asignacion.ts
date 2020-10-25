import { Instruccion } from "../Instruccion"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Asignacion extends Instruccion {
    id:String;
    valor:Instruccion;
    /**
     *  a = 5;
     * @class La instruccion asignacion, modifica el valor de una variable en la tabla de simbolos
     * @param id identificador de la variable que se va a modificar
     * @param line linea donde se esata asignando el nuevo valor a la variable
     * @param column columna donde se esata asignando el nuevo valor a la variable
     * @param valor nuevo valor que se le asignara a la variable
     */
    constructor(id:String, valor:Instruccion, line:Number, column:Number){
        super(line,column)
        this.id = id;
        this.valor = valor;
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
        return tabu+""+this.id + " = " + this.valor.translate(0) + ";\n";
    }
    generarGrafo(g: ValorGrafo, padre: String) {
        
        //Identificador
        let nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\""+this.id+"\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        
        nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"=\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        
        nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\""+this.valor.getNombreHijo()+"\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        this.valor.generarGrafo(g,nombreHijo);
        nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\";\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        
        return null;
    }
    getNombreHijo(): String {
        return "ASIGNACION";
    }
}