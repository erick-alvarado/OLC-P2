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
        // Declaraciones de atributos y métodos
        public void suma(int x, int y){
            // Bloque de instrucciones
        }
    }
    
    public interface IdentificadorInterfaz {
        // Definición de funciones
        public void suma(int x, int y);
    }
    
    public static void main(String[] args) {
        for( int x = 0; x <= a+4; x++){
            // Bloque de Instrucciones
            }
            for( double x = 20; x > 5*4; x --){
            // Bloque de Instrucciones
            }
            
            
            boolean prueba = true;
            while ( prueba ) {
            System.out.println("Esto lo verás una vez");
            prueba = false;
            }
            
            int contador = 0 ;
            do{
            System.out.println ("Contador" + (contador + 1) );
            contador ++;
            } while (contador<10);
            
            
            if ( a > 5 ){
            // Bloque de sentencias then
            } else if (a < 5){
            // Bloque de sentencias else if
            }else{
            // Bloque de sentencias else
            }
            
            
            break;
            continue;
            return a;
            /*
            *
            * Este tipo de comentario
            * soporta más de una línea
            *
            */
            
            
            int x=0, y, z=9;
            boolean ft = true;
            double c = 1.2;
            
            x = true && false;
            
            mifuncion(x, "cadena", true);
            
            
            System.out.println("texto con salto de línea");
            System.out.print("texto sin salto de línea");
            
            
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
    //console.log("------------------- GRAFO -------------------\n");
    //console.log(txtDotAST);
    return "exito";
}
exports.AnalizarJava = AnalizarJava;
//# sourceMappingURL=Analisis.js.map