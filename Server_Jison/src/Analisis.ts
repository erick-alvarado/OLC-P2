import Gramatica = require('../Gramatica/gramatica');
import { AST } from "./ast/AST";
import { GrafoAST } from "./ast/grafo/GrafoAST";

export function AnalizarJava(entrada:string):String{

    let codigo = `

    public class IdentificadorClase {
        x++;
        x--;
        x= !a||b&&c^z;
        int x=0, y, z=9;
        boolean ft = true;
        double c = 1.2;
                
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