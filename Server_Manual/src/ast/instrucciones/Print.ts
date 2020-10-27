import { Instruccion } from "../Instruccion"
import { ValorGrafo } from "../grafo/ValorGrafo"

export class Print extends Instruccion {
    expresion:Instruccion;
    tipo: string;
    /** print("hola")
     * @class La instruccion print, imprime el valor de una expresion en consola
     * @param line linea de la instruccion print
     * @param column columna de la instruccion print
     * @param expresion expresion que se va imprimir
     */
    constructor(tipo:string,expresion:Instruccion, line:Number, column:Number){
        super(line,column)
        this.expresion = expresion;
        this.tipo=tipo;
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
        if(this.tipo=='print_'){
            return tabu+"print("+this.expresion.translate(0)+")\n";
        }
        if(this.tipo=='println_'){
            return tabu+"print("+this.expresion.translate(0)+',end="")\n';
        }
    }

    generarGrafo(g: ValorGrafo, padre: String) {
        let nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\""+ this.expresion.getNombreHijo() +"\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        this.expresion.generarGrafo(g,nombreHijo);
        
        return null;
    }
    getNombreHijo(): String {
        return "PRINT";
    }

}