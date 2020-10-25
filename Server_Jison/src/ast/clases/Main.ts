import { Instruccion } from "../Instruccion"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Main extends Instruccion {
    id:String;
    instrucciones: Array<Instruccion>
    /**
     *  a = 5;
     * @class La instruccion asignacion, modifica el valor de una variable en la tabla de simbolos
     * @param id identificador de la variable que se va a modificar
     * @param line linea donde se esata asignando el nuevo valor a la variable
     * @param column columna donde se esata asignando el nuevo valor a la variable
     * @param valor nuevo valor que se le asignara a la variable
     */
    constructor(id:String,instrucciones: Array<Instruccion>, line:Number, column:Number){
        super(line,column)
        this.id = id;
        this.instrucciones=instrucciones;
    }

    translate(tab: number) {
        tab = 1
        let cadena = "{\n";
        if (this.instrucciones.length>0){
            for (const ins of this.instrucciones) {
                cadena += ins.translate(tab);
            }
        }
        
        cadena+="\n}\n"
        return "function main ()"+cadena;
    }
    generarGrafo(g: ValorGrafo, padre: String) {
       
        //----------- LISTA DE INSTRUCCIONES -----------
        let nombreHijo:String = "";
        
        nombreHijo= "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"public\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        nombreHijo= "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"static\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        nombreHijo= "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"void\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        nombreHijo= "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"main\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        nombreHijo= "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"(\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        nombreHijo= "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"String\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        nombreHijo= "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"[]\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        nombreHijo= "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"args\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        nombreHijo= "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\")\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        nombreHijo= "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"{\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        nombreHijo= "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"INSTRUCCIONES\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        
        let aux = padre;
        padre = nombreHijo;
        for (let x = 0; x < this.instrucciones.length; x++) {
            let inst = this.instrucciones[x];
            nombreHijo = "nodo"+g.contador;
            g.grafo += "  "+nombreHijo +"[label=\""+inst.getNombreHijo()+"\"];\n";
            g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
            g.contador++;
            inst.generarGrafo(g,nombreHijo);
        }
        padre = aux;
        g.contador++;
        nombreHijo= "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"}\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        //----------------------------------------------
    }
    getNombreHijo(): String {
        return "MAIN";
    }
}