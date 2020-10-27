import { Instruccion } from "../Instruccion";
import { TypeOperation } from "../Tipo";
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Expresion extends Instruccion {
    operador1:Instruccion;
    operador2:Instruccion;
    tipoOperacion:TypeOperation;
    /**
     * @class La expresion OperacionRelacional, realiza la operacion Relacional dependiendo del tipo que le sea asigando
     * @param line linea de la expresion
     * @param column columna de la expresion
     * @param operador1 operador izquierdo
     * @param operador2 operador derecho
     * @param tipoOperacion tipo de operacion de la expresion Relacional
     */
    constructor(tipoOperacion:TypeOperation, operador1:Instruccion, operador2:Instruccion, line:Number, column:Number){
        super(line,column)
        this.operador1 = operador1;
        this.operador2 = operador2;
        this.tipoOperacion = tipoOperacion;
    }

    translate(tab: number) {
        switch(this.tipoOperacion){
            case TypeOperation.MAYOR:
                return "> "+this.operador1.translate(0)+ this.operador2.translate(0);
            case TypeOperation.MENOR:
                return "< "+this.operador1.translate(0)+ this.operador2.translate(0);
            case TypeOperation.MAYOR_IGUAL:
                return ">= "+ this.operador1.translate(0)+this.operador2.translate(0);
            case TypeOperation.MENOR_IGUAL:
                return"<= "+ this.operador1.translate(0)+ this.operador2.translate(0);
            case TypeOperation.IGUAL:
                return "= "+this.operador1.translate(0)+ this.operador2.translate(0);
            case TypeOperation.IGUAL_IGUAL:
                return "== "+this.operador1.translate(0)+ this.operador2.translate(0);
            case TypeOperation.DISTINTO:
                return "!= "+this.operador1.translate(0);
            case TypeOperation.PARENTESIS:
                return "("+this.operador1.translate(0)+")";
            case TypeOperation.AND:
                return " and "+this.operador1.translate(0)+ this.operador2.translate(0);
            case TypeOperation.OR:
                return " or "+this.operador1.translate(0)+ this.operador2.translate(0);
            case TypeOperation.NOT:
                return " not "+ this.operador1.translate(0);
            case TypeOperation.XOR:
                return " xor "+this.operador1.translate(0)+ this.operador2.translate(0);
            case TypeOperation.SUMA:
                return "+"+this.operador1.translate(0)+ this.operador2.translate(0);
            case TypeOperation.RESTA:
                return "-"+this.operador1.translate(0)+ this.operador2.translate(0);
            case TypeOperation.MULTIPLICACION:
                return "*"+this.operador1.translate(0)+ this.operador2.translate(0);
            case TypeOperation.DIVISION:
                return "/"+this.operador1.translate(0)+ this.operador2.translate(0);
            
            case TypeOperation.MENOSUNARIO:
                return "-"+this.operador1.translate(0);
            case TypeOperation.PARENTESIS:
                return "("+this.operador1.translate(0)+")";
            default:
                let a =""
                let b="";
                if(this.operador1!=null){
                    a=""+this.operador1.translate(0)
                }
                if(this.operador2!=null){
                    b=""+this.operador2.translate(0)
                }
                return  a+b;
        }
        return "";
    }

    generarGrafo(g: ValorGrafo, padre: String) {
        //Operador1
        let nombreHijo;
        if(this.operador1!=null){
            if(this.operador1.getNombreHijo()==null){
            this.operador1.generarGrafo(g,padre);

            }
            else{
                nombreHijo = "nodo"+g.contador;
            g.grafo += "  "+nombreHijo +"[label=\""+this.operador1.getNombreHijo() + "\"];\n";
            g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
            g.contador++;
            this.operador1.generarGrafo(g,nombreHijo);
            }
            
        }
        
        
        //Operador2
        if(this.operador2!=null){
            if(this.operador2.getNombreHijo()==null){
                this.operador2.generarGrafo(g,nombreHijo);
            }
            else{
                nombreHijo = "nodo"+g.contador;
            g.grafo += "  "+nombreHijo +"[label=\""+this.operador2.getNombreHijo() + "\"];\n";
            g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
            g.contador++;
            this.operador2.generarGrafo(g,nombreHijo);
            }
            
        }
        
        return null;
    }
    getNombreHijo(): String {
        switch(this.tipoOperacion){
            case TypeOperation.MAYOR:       {return "MAYOR";}
            case TypeOperation.MENOR:       {return "MENOR";}
            case TypeOperation.MENOR_IGUAL:       {return "MENOR_IGUAL";}
            case TypeOperation.MAYOR_IGUAL:       {return "MAYOR_IGUAL";}
            case TypeOperation.IGUAL:       {return "IGUAL";}
            case TypeOperation.DISTINTO:       {return "DISTINTO";}
            case TypeOperation.IGUAL_IGUAL:       {return "IGUAL_IGUAL";}
            case TypeOperation.AND: { return "AND"; }
            case TypeOperation.OR: { return "OR"; }
            case TypeOperation.XOR: { return "XOR"; }
            case TypeOperation.NOT: { return "NOT"; }
            case TypeOperation.SUMA: { return "SUMA"; }
            case TypeOperation.RESTA: { return "RESTA"; }
            case TypeOperation.MULTIPLICACION: { return "MULTIPLICACION"; }
            case TypeOperation.DIVISION: { return "DIVISION"; }
            case TypeOperation.PARENTESIS: { return "PARENTESIS"; }
            case TypeOperation.E: { return "EXPRESION"; }
            case TypeOperation.EP: { return "EP"; }
            case TypeOperation.T: { return "T"; }
            case TypeOperation.TP: { return "TP"; }
            case TypeOperation.F: { return "F"; }
            case null :{ return "NULL" }
            default: 
                break;
        }
    }
}