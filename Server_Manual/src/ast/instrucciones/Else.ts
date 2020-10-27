import { Instruccion } from "../Instruccion"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Else extends Instruccion {

    instruccion: Instruccion;
    instrucciones: Array<Instruccion>;
    /**
     * @class La instruccion While realiza n iteraciones, dependiendo de la condicion
     * @param line linea de la instruccion while
     * @param column columna de la instruccion while
     * @param condicion condicion del ciclo
     * @param instrucciones lista de sentencias o instrucciones dentro del while
     */
    constructor(instruccion: Instruccion,instrucciones: Array<Instruccion>, line:Number, column:Number){
        super(line,column);
        this.instruccion = instruccion;
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
        if(this.instruccion==null){
            let cadena = "\n";
            if (this.instrucciones.length>0){
                for (const ins of this.instrucciones) {
                    cadena += ins.translate(tab);
                }
            }
            cadena+="\n";

            return tabu+"else:"+cadena;
        }
        else{
            tab--;
            return tabu+"el"+this.instruccion.translate(-tab);
        }
    }

    generarGrafo(g: ValorGrafo, padre: String) {        
        let p= padre;
        //Condicion
        let nombreHijo = "nodo"+g.contador;
        if(this.instruccion!=null){
            this.instruccion.generarGrafo(g,padre);
        }
        if(this.instrucciones!=null){
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
        }
    }
    
    getNombreHijo(): String {
        return "ELSE";
    }
}