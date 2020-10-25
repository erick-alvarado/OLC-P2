import { ValorGrafo } from "./grafo/ValorGrafo";
import { Instruccion } from "./Instruccion";
import { Error_ } from "./Error_";
import { Token } from "./Token";

export class AST extends Instruccion {
    
    instrucciones: Array<Instruccion>;
    listaError: Array<Error_> ;
    listaToken: Array<Token>;

    constructor(instrucciones: Array<Instruccion>, errores: Array<Error_>, tokens: Array<Token>){
        super(0,0)
        this.instrucciones = instrucciones;
        this.listaError= errores;
        this.listaToken = tokens;
    }

    translate(tab:number):String {
        let cadena = "";
        for(let a = 0;a < this.instrucciones.length; a++){
            cadena += this.instrucciones[a].translate(0);
        }
        return cadena;
    }

    generarGrafo(g: ValorGrafo, padre: String) {
        //----------- LISTA DE INSTRUCCIONES -----------
        let nombreHijo:String = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"CLASES\"];\n";
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
        //----------------------------------------------
    }

    getlistaErrores():String{
        let cadena = "";
        for(let a = 0;a < this.listaError.length; a++){
            cadena += this.listaError[a] +"\n";
        }
        return cadena;
    }
    getlistaTokens():String{
        let cadena = "";
        for(let a = 0;a < this.listaToken.length; a++){
            cadena += this.listaToken[a].descripcion +"\n";
        }
        return cadena;
    }
    addError(pta : Error_){
        this.listaError.push(pta);
    }
    addToken(token :Token){
        this.listaToken.push(token);
    }
    setInstruccion(instrucciones: Array<Instruccion>){
        this.instrucciones = instrucciones;
    }
    getNombreHijo(): String {
        throw new Error("Method not implemented.");
    }
}