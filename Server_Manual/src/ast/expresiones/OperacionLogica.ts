import { Instruccion } from "../Instruccion";
import { TypeOperation } from "../Tipo";

export class OperacionLogica extends Instruccion {
    operador1:Instruccion;
    operador2:Instruccion;
    tipoOperacion:TypeOperation;
    /**
     * @class La expresion OperacionLogica, realiza la operacion Logica dependiendo del tipo que le sea asigando
     * @param line linea de la expresion
     * @param column columna de la expresion
     * @param operador1 operador izquierdo
     * @param operador2 operador derecho
     * @param tipoOperacion tipo de operacion de la expresion Logica
     */
    constructor(tipoOperacion:TypeOperation, operador1:Instruccion, operador2:Instruccion, line:Number, column:Number){
        super(line,column)
        this.operador1 = operador1;
        this.operador2 = operador2;
        this.tipoOperacion = tipoOperacion;
    }

    translate(tab: number) {
        switch(this.tipoOperacion){
            case TypeOperation.AND:
                return this.operador1.translate(0)+" && "+ this.operador2.translate(0);
            case TypeOperation.OR:
                return this.operador1.translate(0)+" || "+ this.operador2.translate(0);
            case TypeOperation.NOT:
                return "!"+ this.operador1.translate(0);
            case TypeOperation.XOR:
                return this.operador1.translate(0)+" ^ "+ this.operador2.translate(0);
            
        }
        return "";
    }
    generarGrafo(g, padre) {
        //Operador1
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.operador1.getNombreHijo() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        this.operador1.generarGrafo(g, nombreHijo);

        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\" Tipo: " + this.tipoOperacion.toString() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
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
    getNombreHijo() {
        switch (this.tipoOperacion) {
            case TypeOperation.AND: { return "AND"; }
            case TypeOperation.OR: { return "OR"; }
            case TypeOperation.XOR: { return "XOR"; }
            case TypeOperation.NOT: { return "NOT"; }
            default: { return "NOT"; }
        }
    }
}