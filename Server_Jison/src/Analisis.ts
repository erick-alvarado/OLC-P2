import Gramatica = require('../Gramatica/gramatica');
import { AST } from "./ast/AST";
import { GrafoAST } from "./ast/grafo/GrafoAST";
var ast;
export function AnalizarJava(entrada:string):String{
    ast = Gramatica.parse(entrada) as AST;
    /*
    console.log("\n\n---------------- ERRORES ----------------\n");

    //Inicia la generacion del grafo
    let grafoAST = new GrafoAST(ast);
    let txtDotAST = grafoAST.getGrafo()
    console.log("\n\n---------------- TOKENS ----------------\n");
    //console.log(ast.listaToken);
    console.log("\n--------------------------------------------\n");
    console.log("\n\n------------------TRADUCCION----------------\n")
    console.log(ast.translate(0));
    console.log("------------------- GRAFO -------------------\n");
    console.log(txtDotAST);*/
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