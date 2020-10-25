import { Instruccion } from "../Instruccion"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Primitivo extends Instruccion {
    valor:any;
    /**
     * @class La clase Primitivo almacena el valor real (numero|cadena|booleano)
     * @param line linea del primitivo
     * @param column columna del primitivo
     * @param valor valor real
     */
    constructor(valor:any, line:Number, column:Number){
        super(line,column)
        this.valor = valor;
    }

    translate(tab:number) {
        return this.valor;
    }
    generarGrafo(g: ValorGrafo, padre: String) {
        let cadena = this.valor;
        try{
            
            if(this.valor[0]=='"'||this.valor[0]=='\''){
                cadena = cadena.substr(1,cadena.length -2);
            }
        }finally{

        }
        
        let nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\""+ cadena.toString() +"\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        return null;
    }
    getNombreHijo(): String {
        return "PRIMITIVO";
    }
}