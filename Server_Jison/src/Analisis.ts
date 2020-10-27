import Gramatica = require('../Gramatica/gramatica');
import { AST } from "./ast/AST";
import { GrafoAST } from "./ast/grafo/GrafoAST";

export function AnalizarJava(entrada:string):String{

    let codigo = `

    public class IdentificadorClase {
        if ( a > 5 ){
            int a;
            if ( a > 5 ){
                int b;
                // Bloque de sentencias then
                } else if (a < 5){
                    int c;
                // Bloque de sentencias else if
                }else{
                    int d;
                // Bloque de sentencias else
                }
            } else if (a < 5){
                int f;
            // Bloque de sentencias else if
            }else{
                int k;
            // Bloque de sentencias else
            }

            
    }
    `;


    
    let ast = Gramatica.parse(codigo) as AST;
    //Inicia la generacion del grafo
    let grafoAST = new GrafoAST(ast);
    let txtDotAST = grafoAST.getGrafo()
    console.log("\n\n---------------- ERRORES ----------------\n");
    console.log(ast.getlistaErrores())
    console.log("\n\n---------------- TOKENS ----------------\n");
    console.log(ast.getlistaTokens());
    console.log("\n--------------------------------------------\n");
    console.log("\n\n------------------TRADUCCION----------------\n")
    console.log(ast.translate(0));
    console.log("------------------- GRAFO -------------------\n");
    console.log(txtDotAST);


    return "exito";
}