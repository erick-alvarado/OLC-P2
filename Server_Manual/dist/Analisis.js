"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTraduccion = exports.getListaErrores = exports.getGrafo = exports.AnalizarJava = void 0;
const AST_1 = require("./ast/AST");
const Lexico_1 = require("./Lexico");
const Sintactico_1 = require("./Sintactico");
const GrafoAST_1 = require("./ast/grafo/GrafoAST");
var ast;
function AnalizarJava(entrada) {
    let lexico = new Lexico_1.Lexico(entrada.toLowerCase());
    lexico.Analizar();
    console.log(lexico.lista_Token);
    let sintactico = new Sintactico_1.Sintactico(lexico.lista_Token);
    sintactico.Analizar();
    console.log(lexico.lista_Error);
    console.log(sintactico.lista_Error);
    ast = new AST_1.AST(sintactico.Instrucciones, lexico.lista_Error.concat(sintactico.lista_Error), lexico.lista_Token);
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