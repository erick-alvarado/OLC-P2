import Gramatica = require('../Gramatica/gramatica');
import { AST } from "./ast/AST";
import { Lexico } from "./Lexico";
import { Sintactico } from "./Sintactico";
import { GrafoAST } from "./ast/grafo/GrafoAST";
var ast;
export function AnalizarJava(entrada:string):string[]{
    let lexico = new Lexico(entrada.toLowerCase());
    lexico.Analizar();
    let sintactico = new Sintactico(lexico.lista_Token);
    sintactico.Analizar();
    ast = new AST(sintactico.Instrucciones,lexico.lista_Error.concat(sintactico.lista_Error),lexico.lista_Token);
    console.log("\n\n------------------TRADUCCION----------------\n")
    console.log(ast.translate(0));
    return ast.getListaTokens();
}

export function getGrafo():string{
    let grafoAST = new GrafoAST(ast);
    let txtDotAST = grafoAST.getGrafo();
    return txtDotAST;
}
export function getListaErrores():string{
    return ast.getListaErrores();
}
export function getTraduccion():string{
    return ast.translate(0);
}