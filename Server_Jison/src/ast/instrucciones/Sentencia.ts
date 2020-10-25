import { Instruccion } from "../Instruccion"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Sentencia extends Instruccion {
    nombre: String;
    expresion: Instruccion;
    /**
     * @class La instruccion While realiza n iteraciones, dependiendo de la condicion
     * @param line linea de la instruccion while
     * @param column columna de la instruccion while
     * @param condicion condicion del ciclo
     * @param instrucciones lista de sentencias o instrucciones dentro del while
     */
    constructor(nombre: String,expresion:Instruccion, line:Number, column:Number){
        super(line,column);
        this.nombre = nombre;
        this.expresion = expresion;
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
        tab++;
        if(this.nombre=="return"){
            return tabu+""+this.nombre+" "+this.expresion.translate(0)+";\n";
        }
        return tabu+""+this.nombre+";\n";
    }

    generarGrafo(g: ValorGrafo, padre: String) {
        let p= padre;
        //Condicion
        let nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\""+this.nombre+"\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        
        if(this.expresion!=null){
            this.expresion.generarGrafo(g,padre);
        }
        nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\";\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
    }
    
    getNombreHijo(): String {
        return "SENTENCIA";
    }
}