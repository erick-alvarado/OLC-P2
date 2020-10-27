"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalizarJava = void 0;
const AST_1 = require("./ast/AST");
const GrafoAST_1 = require("./ast/grafo/GrafoAST");
const Lexico_1 = require("./Lexico");
const Sintactico_1 = require("./Sintactico");
function AnalizarJava(entrada) {
    let codigo = `
    public class IdentificadorClase {
            prueba = 3+3*5+6-1;
        
        
    }
        `;
    let lexico = new Lexico_1.Lexico(codigo.toLowerCase());
    lexico.Analizar();
    let sintactico = new Sintactico_1.Sintactico(lexico.lista_Token);
    sintactico.Analizar();
    let ast = new AST_1.AST(sintactico.Instrucciones, lexico.lista_Error.concat(sintactico.lista_Error), lexico.lista_Token);
    let grafoAST = new GrafoAST_1.GrafoAST(ast);
    let txtDotAST = grafoAST.getGrafo();
    console.log("\n\n---------------- ERRORES ----------------\n");
    console.log(ast.listaError);
    //console.log("\n\n---------------- TOKENS ----------------\n");
    // console.log(ast.listaToken);
    console.log("\n\n------------------TRADUCCION----------------\n");
    console.log(ast.translate(0));
    console.log("------------------- GRAFO -------------------\n");
    console.log(txtDotAST);
    return "exito";
}
exports.AnalizarJava = AnalizarJava;
//# sourceMappingURL=Analisis.js.map