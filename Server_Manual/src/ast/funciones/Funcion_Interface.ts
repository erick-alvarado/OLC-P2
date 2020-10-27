import { Instruccion } from "../Instruccion"
import { Type } from "../Tipo";
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Funcion_Interface extends Instruccion {
    id: String;
    parametros: Array<Instruccion>;
    type: Type;

    /**
     * @class La instruccion declaracion, inserta una nueva variable en la tabla de simbolos
     * @param id identificador de la variable
     * @param type tipo de la variable
     * @param line linea donde se declaro la variable
     * @param column columna donde se declaro la variable
     * @param valor valor de la expresion asociada a la variable
     */
    constructor(type: Type, id: String, parametros: Array<Instruccion>, line: Number, column: Number) {
        super(line, column)
        this.id = id;
        this.type = type;
        this.parametros = parametros;
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
    translate(tab: number) {
        let tabu = this.tab(tab);
        tab++;
        let cadena2 = "";  
        if (this.parametros.length>0){
            for (const ins of this.parametros) {
                cadena2 += ins.translate(tab)+", ";
            }
        }
        cadena2 = cadena2.substr(0,cadena2.length -2);
        return tabu+"self "+this.id+"("+cadena2+")"+":\n"
    }
    generarGrafo(g: ValorGrafo, padre: String) {
       
        //----------- LISTA DE INSTRUCCIONES -----------
        let nombreHijo:String = "";
        
        nombreHijo= "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"public\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        nombreHijo= "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"TYPE\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        nombreHijo= "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\""+this.type.toString()+"\"];\n";
        g.grafo += "  "+"nodo"+(g.contador-1) +" -> "+ nombreHijo+";\n";
        g.contador++;


        nombreHijo= "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\""+this.id+"\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        nombreHijo= "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"(\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        nombreHijo= "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"PARAMETROS\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        
        let aux = padre;
        padre = nombreHijo;
        for (let x = 0; x < this.parametros.length; x++) {
            let inst = this.parametros[x];
            nombreHijo = "nodo"+g.contador;
            g.grafo += "  "+nombreHijo +"[label=\""+inst.getNombreHijo()+"\"];\n";
            g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
            g.contador++;
            inst.generarGrafo(g,nombreHijo);
        }
        padre = aux;
        g.contador++;
        nombreHijo= "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\")\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        g.contador++;
        nombreHijo= "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\";\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;




    }
    getNombreHijo(): String {
        return "FUNC_INTER";
    }
}