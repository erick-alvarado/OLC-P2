"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTraduccion = exports.getListaErrores = exports.getGrafo = exports.AnalizarJava = void 0;
const Gramatica = require("../Gramatica/gramatica");
const GrafoAST_1 = require("./ast/grafo/GrafoAST");
var ast;
function AnalizarJava(entrada) {
    ast = Gramatica.parse(entrada);
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
exports.AnalizarJava = AnalizarJava;
function getGrafo() {
    let grafoAST = new GrafoAST_1.GrafoAST(ast);
    let txtDotAST = grafoAST.getGrafo();
    return txtDotAST;
}
exports.getGrafo = getGrafo;
function getListaErrores() {
    return ast.getListaErrores();
}
exports.getListaErrores = getListaErrores;
function getTraduccion() {
    return ast.translate(0);
}
exports.getTraduccion = getTraduccion;
//# sourceMappingURL=Analisis.js.map