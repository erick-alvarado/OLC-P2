import { Instruccion } from "../Instruccion"
import { ValorGrafo } from "../grafo/ValorGrafo"

export class Llamada extends Instruccion {
    id: String;
    primitivos:Array<Instruccion>;
    /** print("hola")
     * @class La instruccion print, imprime el valor de una expresion en consola
     * @param line linea de la instruccion print
     * @param column columna de la instruccion print
     * @param expresion expresion que se va imprimir
     */
    constructor(id:String,primitivos:Array<Instruccion>, line:Number, column:Number){
        super(line,column)
        this.id = id;
        this.primitivos=primitivos;
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
        let cadena = "";
        if (this.primitivos.length>0){
            for (const ins of this.primitivos) {
                cadena += ins.translate(0)+",";
            }
            cadena = cadena.substr(0,cadena.length -1);

        }
        return tabu +""+this.id+"("+cadena+");\n"
    }

    generarGrafo(g: ValorGrafo, padre: String) {
       //Identificador
       let p = padre;
       let nombreHijo = "nodo"+g.contador;
       g.grafo += "  "+nombreHijo +"[label=\""+this.id+"\"];\n";
       g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
       g.contador++;
       
       nombreHijo = "nodo"+g.contador;
       g.grafo += "  "+nombreHijo +"[label=\"(\"];\n";
       g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
       g.contador++;
       //----------- LISTA DE INSTRUCCIONES -----------
       nombreHijo = "nodo"+g.contador;
       g.grafo += "  "+nombreHijo +"[label=\"PRIMITIVOS\"];\n";
       g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
       g.contador++;
       padre = nombreHijo;
       for (let x = 0; x < this.primitivos.length; x++) {
           let inst = this.primitivos[x];
           nombreHijo = "nodo"+g.contador;
           g.grafo += "  "+nombreHijo +"[label=\""+inst.getNombreHijo()+"\"];\n";
           g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
           g.contador++;
           inst.generarGrafo(g,nombreHijo);
       }
       padre = p;
       nombreHijo = "nodo"+g.contador;
       g.grafo += "  "+nombreHijo +"[label=\")\"];\n";
       g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
       g.contador++;
       nombreHijo = "nodo"+g.contador;
       g.grafo += "  "+nombreHijo +"[label=\";\"];\n";
       g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
       g.contador++;
       
        
        return null;
    }
    getNombreHijo(): String {
        return "LLAMADA";
    }

}