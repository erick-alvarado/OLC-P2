import { Instruccion } from "../Instruccion"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class While extends Instruccion {
    condicion:Array<Instruccion>;
    instrucciones: Array<Instruccion>;
    /**
     * @class La instruccion While realiza n iteraciones, dependiendo de la condicion
     * @param line linea de la instruccion while
     * @param column columna de la instruccion while
     * @param condicion condicion del ciclo
     * @param instrucciones lista de sentencias o instrucciones dentro del while
     */
    constructor(condicion:Array<Instruccion>, instrucciones: Array<Instruccion>, line:Number, column:Number){
        super(line,column);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
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
        let cadena = "{\n";
        if (this.instrucciones.length>0){
            for (const ins of this.instrucciones) {
                cadena += ins.translate(tab);
            }
        }
        cadena+="\n"+tabu+"}\n"
        
        let cadena2 = "";
        if (this.condicion.length>0){
            for (const ins of this.condicion) {
                cadena2 += ins.translate(0);
            }
        }


        return tabu+"while("+cadena2+")"+cadena;
    }

    generarGrafo(g: ValorGrafo, padre: String) {
        let p= padre;
        //Condicion
        let nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"(\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        
        nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"CONDICION\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        padre = nombreHijo;
        for (let x = 0; x < this.condicion.length; x++) {
            let inst = this.condicion[x];
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
        g.grafo += "  "+nombreHijo +"[label=\"{\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        //----------- LISTA DE INSTRUCCIONES -----------
        nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"INSTRUCCIONES\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        padre = nombreHijo;
        for (let x = 0; x < this.instrucciones.length; x++) {
            let inst = this.instrucciones[x];
            nombreHijo = "nodo"+g.contador;
            g.grafo += "  "+nombreHijo +"[label=\""+inst.getNombreHijo()+"\"];\n";
            g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
            g.contador++;
            inst.generarGrafo(g,nombreHijo);
        }

        nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"}\"];\n";
        g.grafo += "  "+p +" -> "+ nombreHijo+";\n";
        g.contador++;
        //----------------------------------------------
        return null;
    }
    
    getNombreHijo(): String {
        return "WHILE";
    }
}