import { AST } from "./ast/AST";
import { GrafoAST } from "./ast/grafo/GrafoAST";
import { Lexico } from "./Lexico";
import { Sintactico } from "./Sintactico";

export function AnalizarJava(entrada:string):String{
    
    let codigo = `
    public class IdentificadorClase {
        int contador = 0 ;
    do{
    contador ++;    

    } while (contador!1+6<10);
        
        
    }
        `;

    let lexico = new Lexico(codigo.toLowerCase());
    lexico.Analizar();
    let sintactico = new Sintactico(lexico.lista_Token);
    sintactico.Analizar();

    let ast = new AST(sintactico.Instrucciones,lexico.lista_Error.concat(sintactico.lista_Error),lexico.lista_Token);

    let grafoAST = new GrafoAST(ast);
    let txtDotAST = grafoAST.getGrafo()

    console.log("\n\n---------------- ERRORES ----------------\n");
    console.log(ast.listaError);

    //console.log("\n\n---------------- TOKENS ----------------\n");
   // console.log(ast.listaToken);

    console.log("\n\n------------------TRADUCCION----------------\n")
    console.log(ast.translate(0));


    console.log("------------------- GRAFO -------------------\n");
    console.log(txtDotAST);


    return "exito";
}