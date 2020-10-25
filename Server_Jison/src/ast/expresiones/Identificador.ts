import { Instruccion } from "../Instruccion";
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Identificador extends Instruccion {
    id:String;
    /**
     * @class La Identificador, almacena el id de la variable a la que se esta accesando
     * @param line linea del primitivo
     * @param column columna del primitivo
     * @param id identificador de la variable a la que se accesa
     */
    constructor(id:String, line:Number, column:Number){
        super(line,column)
        this.id = id;
    }
    tab(tab: number): String{
        let n =0
        let tabs = ""
        while(tab>n){
            n++;
            tabs+="\t"
        }
        return tabs;
    }
    translate(tab:number) {
        let tabu = this.tab(tab);
        return tabu+""+ this.id;
    }
    generarGrafo(g: ValorGrafo, padre: String) {
        let nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\""+ this.id +"\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        
        return null;
    }
    getNombreHijo(): String {
        return "IDENTIFICADOR";
    }
}