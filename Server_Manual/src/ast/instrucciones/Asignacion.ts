import { Instruccion } from "../Instruccion"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Asignacion extends Instruccion {
    id:String;
    valor:Array<Instruccion>;
    /**
     *  a = 5;
     * @class La instruccion asignacion, modifica el valor de una variable en la tabla de simbolos
     * @param id identificador de la variable que se va a modificar
     * @param line linea donde se esata asignando el nuevo valor a la variable
     * @param column columna donde se esata asignando el nuevo valor a la variable
     * @param valor nuevo valor que se le asignara a la variable
     */
    constructor(id:String, valor:Array<Instruccion>, line:Number, column:Number){
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
        let cadena=""
        if (this.valor.length>0){
            for (const ins of this.valor) {
                cadena += ins.translate(tab);
            }
        }
        return tabu+""+this.id + " = " + cadena + ";\n";
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
        
        for (let x = 0; x < this.valor.length; x++) {
            let inst = this.valor[x];
            nombreHijo = "nodo"+g.contador;
            g.grafo += "  "+nombreHijo +"[label=\""+inst.getNombreHijo()+"\"];\n";
            g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
            g.contador++;
            inst.generarGrafo(g,nombreHijo);
        }
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