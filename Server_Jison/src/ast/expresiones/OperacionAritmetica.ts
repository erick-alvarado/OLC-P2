import { Instruccion } from "../Instruccion"
import { Type, TypeOperation } from "../Tipo";
import { ValorGrafo } from "../grafo/ValorGrafo";

export class OperacionAritmetica extends Instruccion {
    operador1:Instruccion;
    operador2:Instruccion;
    tipoOperacion:TypeOperation;
    /** 5 + 9
     * @class La expresion OperacionAritmetica, realiza la operacion aritmetica dependiendo del tipo que le sea asigando
     * @param line linea de la expresion
     * @param column columna de la expresion
     * @param operador1 operador izquierdo
     * @param operador2 operador derecho
     * @param tipoOperacion tipo de operacion de la expresion aritmetica
     */
    constructor(tipoOperacion:TypeOperation, operador1:Instruccion, operador2:Instruccion, line:Number, column:Number){
        super(line,column)
        this.operador1 = operador1;
        this.operador2 = operador2;
        this.tipoOperacion = tipoOperacion;
    }
    

    translate(tab:number) {
        switch(this.tipoOperacion){
            case TypeOperation.SUMA:
                return this.operador1.translate(0)+" + "+ this.operador2.translate(0);
            case TypeOperation.RESTA:
                return this.operador1.translate(0)+" - "+ this.operador2.translate(0);
            case TypeOperation.MULTIPLICACION:
                return this.operador1.translate(0)+" * "+ this.operador2.translate(0);
            case TypeOperation.DIVISION:
                return this.operador1.translate(0)+" / "+ this.operador2.translate(0);
            
            case TypeOperation.MENOSUNARIO:
                return "-"+this.operador1.translate(0);
            case TypeOperation.PARENTESIS:
                return "("+this.operador1.translate(0)+")";
        }
        return "";
    }
    
    generarGrafo(g: ValorGrafo, padre: String) {
        //Operador1
        let nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\""+this.operador1.getNombreHijo() + "\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        this.operador1.generarGrafo(g,nombreHijo);

        if(this.operador2 != null){
            //Operador2
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + this.operador2.getNombreHijo() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            this.operador2.generarGrafo(g, nombreHijo);
        }
        return null;
    }
    getNombreHijo(): String {
        switch(this.tipoOperacion){
            case TypeOperation.SUMA: { return "SUMA"; }
            case TypeOperation.RESTA: { return "RESTA"; }
            case TypeOperation.MULTIPLICACION: { return "MULTIPLICACION"; }
            case TypeOperation.DIVISION: { return "DIVISION"; }
            case TypeOperation.PARENTESIS: { return "PARENTESIS"; }
            case TypeOperation.MENOSUNARIO:{ return "MENOS_UNARIO"; }
            default:{ return "MENOS_UNARIO"; }
        }
    }
}