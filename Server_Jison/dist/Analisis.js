"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalizarJava = void 0;
const Gramatica = require("../Gramatica/gramatica");
const GrafoAST_1 = require("./ast/grafo/GrafoAST");
function AnalizarJava(entrada) {
    let codigo = `

    public class IdentificadorClase {
        a('a',"b",'a');
    }
    `;
    let ast = Gramatica.parse(codigo);
    //Inicia la generacion del grafo
    let grafoAST = new GrafoAST_1.GrafoAST(ast);
    let txtDotAST = grafoAST.getGrafo();
    console.log("\n\n---------------- ERRORES ----------------\n");
    console.log(ast.getlistaErrores());
    console.log("\n\n---------------- TOKENS ----------------\n");
    console.log(ast.getlistaTokens());
    console.log("\n--------------------------------------------\n");
    console.log("\n\n------------------TRADUCCION----------------\n");
    console.log(ast.translate(0));
    console.log("------------------- GRAFO -------------------\n");
    //console.log(txtDotAST);
    return "exito";
}
exports.AnalizarJava = AnalizarJava;
//# sourceMappingURL=Analisis.js.map