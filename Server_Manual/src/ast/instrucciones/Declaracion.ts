import { Instruccion } from "../Instruccion"
import { Type } from "../Tipo";
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Declaracion extends Instruccion {
    id: String;
    valor: Instruccion;
    valores: Instruccion;
    type: Type;

    /**
     * @class La instruccion declaracion, inserta una nueva variable en la tabla de simbolos
     * @param id identificador de la variable
     * @param type tipo de la variable
     * @param line linea donde se declaro la variable
     * @param column columna donde se declaro la variable
     * @param valor valor de la expresion asociada a la variable
     */
    constructor(type: Type, id: String, valor: Instruccion,valores: Instruccion, line: Number, column: Number) {
        super(line, column)
        this.id = id;
        this.type = type;
        this.valor = valor;
        this.valores = valores;
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
        if(this.type==Type.COMA){
            //DECLARA-> ID
            if(this.valor == null && this.valores==null){
                return this.id;
            }
            //DECLARA-> ID = EXP
            if(this.valores==null){
                return this.id+ " = "+this.valor.translate(0);
            }
            //DECLARA-> ID, DECLARA
            if(this.valor ==null){
                return this.id+","+this.valores.translate(0);
            }
            //DECLARA-> ID = EXP, DECLA
            else{
                return this.id+"="+this.valor.translate(0)+","+this.valores.translate(0);
            } 
       }
            
        if(this.valor==null){
            //DECLARACION-> ID ;
            if(this.valores==null){
                return tabu+"var "+this.id+";\n";
            }
            //DECLARACION-> ID, DECLARA ;
            else{
                return tabu+"var "+this.id+","+this.valores.translate(0)+";\n";
            }
        }
        //DECLARACION-> ID=EXP, DECLARA ;
        if(this.valores!=null){
            return tabu+"var "+this.id+"="+this.valor.translate(0)+","+this.valores.translate(0)+";\n";
        }
        //DECLARACION-> ID=EXP;
        return tabu+"var "+this.id+"="+this.valor.translate(0)+"; \n";
        
    }

    generarGrafo(g: ValorGrafo, padre: String) {
        let padreAux = padre; //Auxiar con nombre del padre
        let nombreHijo = ""
        //Tipo
        if(this.type!=Type.COMA){
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\" Tipo: " + this.type.toString() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
        }
        if(this.type==Type.COMA){
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\",\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
        }
        

        // Id
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"ID\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;

       
        let padreHijo = nombreHijo;

        //Identificador
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.id + "\"];\n";
        g.grafo += "  " + padreHijo + " -> " + nombreHijo + ";\n";
        g.contador++;
        
        if (this.valor != null) {
            //Expresion
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"=\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + this.valor.getNombreHijo() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            this.valor.generarGrafo(g, nombreHijo);
        }
        if(this.valores!= null){
            this.valores.generarGrafo(g, padre);
        }
        
        if(this.type!=Type.COMA){
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\";\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
        }
        return null;


    }
    getNombreHijo(): String {
        return "DECLARACION"
    }
}