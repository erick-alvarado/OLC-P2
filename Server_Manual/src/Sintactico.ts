import { Token } from "./ast/Token";
import { Instruccion } from "./ast/Instruccion";
import { Error_ } from "./ast/Error_";

import { ParaQueNoTruene } from "../dist/ast/ParaQueNoTruene";
import { AST } from "../dist/ast/AST";
import { Asignacion } from "../dist/ast/instrucciones/Asignacion";	
import { Sentencia } from "../dist/ast/instrucciones/Sentencia";
import { Declaracion } from "../dist/ast/instrucciones/Declaracion";
import { Print } from "../dist/ast/instrucciones/Print";
import { While } from "../dist/ast/instrucciones/While";
import { DoWhile } from "../dist/ast/instrucciones/DoWhile";
import { Llamada } from "../dist/ast/instrucciones/Llamada";	
import { For } from "../dist/ast/instrucciones/For";
import { Incre_Decre } from "../dist/ast/instrucciones/Incre_Decre";

import { OperacionAritmetica } from "../dist/ast/expresiones/OperacionAritmetica";
import { OperacionLogica } from "../dist/ast/expresiones/OperacionLogica";
import { OperacionRelacional } from "../dist/ast/expresiones/OperacionRelacional";
import { Identificador } from "../dist/ast/expresiones/Identificador";
import { Primitivo } from "../dist/ast/expresiones/Primitivo";	
import { Type } from "../dist/ast/Tipo";
import { TypeOperation } from "../dist/ast/Tipo";	
import { Clase } from "../dist/ast/clases/Clase";
import { Interface } from "../dist/ast/clases/interface";
import { Main } from "../dist/ast/clases/Main";
import { Parametro } from "../dist/ast/instrucciones/Parametro";
import { If } from "../dist/ast/instrucciones/If";
import { Else } from "../dist/ast/instrucciones/Else";
import { Funcion_Clase } from "../dist/ast/funciones/Funcion_Clase";	
import { Funcion_Interface } from "../dist/ast/funciones/Funcion_Interface";


export class Sintactico{
    n: number=0;
    Tokens : Array<Token>=[];
    lista_Error : Array<Token>=[];
    Instrucciones : Array<Instruccion>=[];


    
    constructor(tokens: Array<Token>){
        this.Tokens=tokens;
    }
    Analizar() {
        while(this.Tokens[this.n]!=null){
            if(this.Tokens[this.n].tipo=='public_'){
                this.match(this.Tokens[this.n],'public_');
                switch(this.Tokens[this.n].tipo){
                    case 'class_':
                        this.match(this.Tokens[this.n],'class_');
                        this.match(this.Tokens[this.n],'identificador');
                        this.Instrucciones.push(new Clase(this.Tokens[this.n-1].descripcion,this.Bloque_Sentencias(),0,0));
                        break;
                    case 'interface_':
                        this.match(this.Tokens[this.n],'interface_');
                        this.match(this.Tokens[this.n],'identificador');
                        this.Instrucciones.push(new Interface(this.Tokens[this.n-1].descripcion,this.Bloque_Sentencias(),0,0));
                        break;
                    case 'static_':
                        this.match(this.Tokens[this.n],'static_');
                        this.match(this.Tokens[this.n],'void_');
                        this.match(this.Tokens[this.n],'main_');
                        this.match(this.Tokens[this.n],'parAbre');
                        this.match(this.Tokens[this.n],'string_');
                        this.match(this.Tokens[this.n],'corchetes');
                        this.match(this.Tokens[this.n],'args_');
                        this.match(this.Tokens[this.n],'parCierra');
                        this.Instrucciones.push(new Main(this.Tokens[this.n-1].descripcion,this.Bloque_Sentencias(),0,0));
                        break;
                    default:
                        this.match(this.Tokens[this.n],'ERROR');
                        break;    
                    
                }
            }
            else{
                this.match(this.Tokens[this.n],'ERROR');

            }
        }
    }

    Bloque_Sentencias(): Array<Instruccion>{

        this.match(this.Tokens[this.n],'llaveAbre');
        if(this.Tokens[this.n].tipo=="llaveCierra"){
            this.match(this.Tokens[this.n],'llaveCierra');
            return []; 
        }
        let instrucciones : Array<Instruccion> = [];
        while(this.n<=this.Tokens.length){
            switch(this.Tokens[this.n].tipo){
                case 'identificador'://  INCRE_DECRE/ ASIGNACION   / LLAMADA
                    switch(this.Tokens[this.n+1].tipo){
                        case 'mas_mas':
                            instrucciones.push(this.Incremento_Decremento());
                            break;
                        case 'menos_menos':
                            instrucciones.push(this.Incremento_Decremento());
                            break;
                        case 'igual':
                            instrucciones.push(this.Asignacion());
                            break;
                        case 'parAbre':
                            instrucciones.push(this.Llamada());
                            break;
                        default:
                            this.match(this.Tokens[this.n],'ERROR');
                            break;
                    }
                    break;
                case 'numeric_': //DECLARACION
                    instrucciones.push(this.Declaracion());
                    break;
                case 'string_': //DECLARACION
                    instrucciones.push(this.Declaracion());
                    break;
                case 'boolean_': //DECLARACION
                    instrucciones.push(this.Declaracion());
                    break;
                case 'double_': //DECLARACION
                    instrucciones.push(this.Declaracion());
                    break;
                case 'char_': //DECLARACION
                    instrucciones.push(this.Declaracion());
                    break;
                case 'public_': //FUNCION CLASE / FUNCION INTERFACE
                    instrucciones.push(this.Funcion_Clase_Interface());
                    break;
                case 'while_':
                    instrucciones.push(this.While());
                    break;
                case 'do_':
                    break;
                case 'for_':
                    break;
                case 'if_':
                    break;
                case 'system_':
                    break;
                case 'break_':
                    break;
                case 'continue_':
                    break;
                case 'return_':
                    break;
                default:
                    this.match(this.Tokens[this.n],'llaveCierra'); 
                    return instrucciones;
                    break;
                    
            }
        }
        
    }

    Whil():Instruccion{
        let i ;

        return i;
    }

    While():Instruccion{
        let i ;
        this.match(this.Tokens[this.n],'while_'); 
        this.match(this.Tokens[this.n],'parAbre'); 
        let exp = this.Expresiones();
        this.match(this.Tokens[this.n],'parCierra');
        let bloque = this.Bloque_Sentencias();
        i = new While(exp,bloque,0,0);
        return i;
    }

    


    Funcion_Clase_Interface(): Instruccion{
        let i;
        this.match(this.Tokens[this.n],'public_');
        let tipo = this.Tipo();
        this.match(this.Tokens[this.n],'identificador');
        let id = this.Tokens[this.n-1].descripcion;
        this.match(this.Tokens[this.n],'parAbre');
        let params = this.Parametros();
        this.match(this.Tokens[this.n],'parCierra');
        if(this.Tokens[this.n].tipo=='pcoma'){
            i = new Funcion_Interface(tipo,id,params,0,0);
            this.match(this.Tokens[this.n],'pcoma');
        }
        else if (this.Tokens[this.n].tipo=='llaveAbre'){
            i = new Funcion_Clase(tipo,id,params,this.Bloque_Sentencias(),0,0);
        }
        else{
            i = new Primitivo("ERROR");
            this.match(this.Tokens[this.n],'ERROR');
        }
        return i
    }
    Parametros(): Array <Instruccion>{
        let i : Array<Instruccion> = [];
        i.push(this.Parametro());
        while(this.Tokens[this.n].tipo=='coma'){
            this.match(this.Tokens[this.n],'coma');
            i.push(this.Parametro());
        }
        return i;
    }
    Parametro(): Instruccion{
        let i ;
        let tipo = this.Tipo();
        this.match(this.Tokens[this.n],'identificador');
        i = new Parametro(tipo,this.Tokens[this.n-1].descripcion,0,0);
        return i;
    }
    Declaracion(): Instruccion{
        let i;
        let tipo = this.Tipo();
        this.match(this.Tokens[this.n],'identificador');
        let id = this.Tokens[this.n-1].descripcion;

        switch(this.Tokens[this.n].tipo){
            case 'pcoma':
                i = new Declaracion(tipo,this.Tokens[this.n-1].descripcion,null,null,0,0);
                this.match(this.Tokens[this.n],'pcoma');
                break;
            case 'coma':
                this.match(this.Tokens[this.n],'coma');
                i = new Declaracion(tipo,id,null,this.Declara(),0,0);
                this.match(this.Tokens[this.n],'pcoma');
                break;
            case 'igual':
                this.match(this.Tokens[this.n],'igual');
                let exp = this.Expresion();
                if(this.Tokens[this.n].tipo=='pcoma'){
                    i = new Declaracion(tipo,id,exp,null,0,0);
                }
                else if(this.Tokens[this.n].tipo=='coma'){
                    this.match(this.Tokens[this.n],'coma');
                    i = new Declaracion(tipo,id,exp,this.Declara(),0,0);
                }
                else{
                    i = new Primitivo("ERROR");
                    this.match(this.Tokens[this.n],'ERROR');
                    return i;
                }
                this.match(this.Tokens[this.n],'pcoma');
                break;
        }
        return i;
    }
    Declara(): Instruccion{
        let i;
        this.match(this.Tokens[this.n],'identificador');
        let id = this.Tokens[this.n-1].descripcion;

        switch(this.Tokens[this.n].tipo){
            case 'pcoma':
                i = new Declaracion(Type.COMA,this.Tokens[this.n-1].descripcion,null,null,0,0);
                break;
            case 'coma':
                this.match(this.Tokens[this.n],'coma');
                i = new Declaracion(Type.COMA,this.Tokens[this.n-1].descripcion,null,this.Declara(),0,0);
                break;
            case 'igual':
                this.match(this.Tokens[this.n],'igual');
                let exp = this.Expresion();
                if(this.Tokens[this.n].tipo=='pcoma'){
                    i = new Declaracion(Type.COMA,id,exp,null,0,0);
                }
                else if(this.Tokens[this.n].tipo=='coma'){
                    this.match(this.Tokens[this.n],'coma');
                    i = new Declaracion(Type.COMA,id,exp,this.Declara(),0,0);
                }
                else{
                    i = new Primitivo("ERROR");
                    this.match(this.Tokens[this.n],'ERROR');
                    return i;
                }
                break;
        }
        return i;
    }
    Tipo(): Type{
        let i;
        switch(this.Tokens[this.n].tipo){
            case 'numeric_':
                this.match(this.Tokens[this.n],'numeric_');
                i = Type.NUMERIC;
                break;
            case 'string_':
                this.match(this.Tokens[this.n],'string_');
                i = Type.STRING;
                break;
            case 'boolean_':
                this.match(this.Tokens[this.n],'boolean_');
                i = Type.BOOLEAN;
                break;
            case 'void_':
                this.match(this.Tokens[this.n],'void_');
                i = Type.VOID;
                break;
            case 'double_':
                this.match(this.Tokens[this.n],'double_');
                i = Type.DOUBLE;
                break;
            case 'char_':
                this.match(this.Tokens[this.n],'char_');
                i = Type.CHAR;
                break;
            default:
                i = new Primitivo("ERROR");
                this.match(this.Tokens[this.n],'ERROR');
                return i;
                break;
            
        }
        return i;
    }
    Asignacion(): Instruccion{
        this.match(this.Tokens[this.n],'identificador');
        this.match(this.Tokens[this.n],'igual');
        let i = new Asignacion(this.Tokens[this.n-2].descripcion, this.Expresiones(),0,0 );
        this.match(this.Tokens[this.n],'pcoma');
        return i;
    }
    Incremento_Decremento(): Instruccion{
        this.match(this.Tokens[this.n],'identificador');
        let i;
        if(this.Tokens[this.n].tipo=='mas_mas'){
            i = new Incre_Decre(this.Tokens[this.n-1].descripcion,TypeOperation.ADICION,0,0 );
            this.match(this.Tokens[this.n],'mas_mas');
        }
        else{
            i = new Incre_Decre(this.Tokens[this.n-1].descripcion,TypeOperation.SUBSTRACCION,0,0 );
            this.match(this.Tokens[this.n],'menos_menos');

        }
        this.match(this.Tokens[this.n],'pcoma');
        return i;
    }
    Llamada(): Instruccion{
        this.match(this.Tokens[this.n],'identificador');
        this.match(this.Tokens[this.n],'parAbre');
        let i = new Llamada(this.Tokens[this.n-2].descripcion,this.Primitivos());
        this.match(this.Tokens[this.n],'parCierra');
        this.match(this.Tokens[this.n],'pcoma');
        return i;
    }
    Primitivos(): Array <Instruccion>{
        let i : Array<Instruccion> = [];
        i.push(this.Primitivo());
        while(this.Tokens[this.n].tipo=='coma'){
            this.match(this.Tokens[this.n],'coma');
            i.push(this.Primitivo());
        }
        return i;
    }
    Primitivo(): Instruccion{
        let i;
        switch(this.Tokens[this.n].tipo){
            case 'decimal':
                i = new Primitivo(this.Tokens[this.n].descripcion);
                this.match(this.Tokens[this.n],'decimal');
                break;
            case 'entero':
                i = new Primitivo(this.Tokens[this.n].descripcion);
                this.match(this.Tokens[this.n],'entero');
                break;
            case 'caracter':
                i = new Primitivo(this.Tokens[this.n].descripcion);
                this.match(this.Tokens[this.n],'caracter');
                break;
            case 'cadena':
                i = new Primitivo(this.Tokens[this.n].descripcion);
                this.match(this.Tokens[this.n],'cadena');
                break;
            case 'true_':
                i = new Primitivo(this.Tokens[this.n].descripcion);
                this.match(this.Tokens[this.n],'true_');
                break;
            case 'false_':
                i = new Primitivo(this.Tokens[this.n].descripcion);
                this.match(this.Tokens[this.n],'false_');
                break;
            case 'identificador':
                i = new Primitivo(this.Tokens[this.n].descripcion);
                this.match(this.Tokens[this.n],'identificador');
                break;
            default:
                i = new Primitivo("ERROR");
                this.match(this.Tokens[this.n],'ERROR');
                return i;
                break;
        }
        return i;
    }
    Expresiones(): Array <Instruccion>{
        let i : Array<Instruccion> = [];
        i.push(this.Expresion());
        
        while(this.Tokens[this.n].tipo !='pcoma' ){
            if(this.Tokens[this.n].tipo =='parCierra'){
                return i;
            }
            else if(this.Tokens[this.n-1].tipo=='menos_menos'||this.Tokens[this.n-1].tipo=='mas_mas'||this.Tokens[this.n-1].tipo=='identificador'||this.Tokens[this.n-1].tipo == 'entero'||this.Tokens[this.n-1].tipo == 'decimal'||this.Tokens[this.n-1].tipo == 'caracter'||this.Tokens[this.n-1].tipo == 'cadena'||this.Tokens[this.n-1].tipo == 'true_'||this.Tokens[this.n-1].tipo == 'false_'){
                i.push(this.Expresion_Opera());
            }
            else{
                i.push(this.Expresion());
            }
            if(this.n>=this.Tokens.length){
                return i;
            }
        }
        return i;
    }
    Expresion(): Instruccion{
        let i ;
        switch(this.Tokens[this.n].tipo){
            case 'distinto':
                this.match(this.Tokens[this.n],'distinto');
                i = new OperacionRelacional(TypeOperation.DISTINTO,this.Expresion(),null,0,0);
                break;
            case 'not_':
                this.match(this.Tokens[this.n],'not_');
                i = new OperacionLogica(TypeOperation.NOT,this.Expresion(),null,0,0);
                break;
            case 'menos':
                this.match(this.Tokens[this.n],'menos');
                i = new OperacionAritmetica(TypeOperation.MENOSUNARIO,this.Expresion(),null,0,0);
                break;
            case 'parAbre':
                this.match(this.Tokens[this.n],'parAbre');
                i = new OperacionAritmetica(TypeOperation.PARENTESIS,this.Expresion(),null,0,0);
                this.match(this.Tokens[this.n],'parCierra');
                break;
            case 'identificador':
                if(this.Tokens[this.n+1].tipo=='mas_mas'||this.Tokens[this.n+1].tipo=='menos_menos'){
                    i =this.Incremento_Decremento();
                }
                else{
                    this.match(this.Tokens[this.n],'identificador');
                    i = new Identificador(this.Tokens[this.n-1].descripcion);
                }
                break;
            default:
                i = this.Primitivo();
                break;
        
        }
        return i;
    }
    Expresion_Opera(): Instruccion{
        let i ;
        switch(this.Tokens[this.n].tipo){
            case 'por':
                this.match(this.Tokens[this.n],'por');
                i = new OperacionAritmetica( TypeOperation.MULTIPLICACION,this.Expresion(),null,0,0);
                break;
            case 'division':
                this.match(this.Tokens[this.n],'division');
                i = new OperacionAritmetica( TypeOperation.DIVISION,this.Expresion(),null,0,0);
                break;
            case 'mas':
                this.match(this.Tokens[this.n],'mas');
                i = new OperacionAritmetica( TypeOperation.SUMA,this.Expresion(),null,0,0);
                break;
            case 'menos':
                this.match(this.Tokens[this.n],'menos');
                i = new OperacionAritmetica(  TypeOperation.RESTA,this.Expresion(),null,0,0);
                break;
            case 'mayorQ':
                this.match(this.Tokens[this.n],'mayorQ');
                i =  new OperacionRelacional( TypeOperation.MAYOR,this.Expresion(),null,0,0);
                break;
            case 'menorQ':
                this.match(this.Tokens[this.n],'menorQ');
                i =  new OperacionRelacional( TypeOperation.MENOR,this.Expresion(),null,0,0);
                break;
            case 'mayorQ_igual':
                this.match(this.Tokens[this.n],'mayorQ_igual');
                i =  new OperacionRelacional( TypeOperation.MAYOR_IGUAL,this.Expresion(),null,0,0);
                break;
            case 'menorQ_igual':
                this.match(this.Tokens[this.n],'menorQ_igual');
                i =  new OperacionRelacional( TypeOperation.MENOR_IGUAL,this.Expresion(),null,0,0);
                break;
            case 'igual_igual':
                this.match(this.Tokens[this.n],'igual_igual');
                i =  new OperacionRelacional(  TypeOperation.IGUAL_IGUAL,this.Expresion(),null,0,0);
                break;
            case 'or_':
                this.match(this.Tokens[this.n],'or_');
                i =  new OperacionLogica( TypeOperation.OR,this.Expresion(),null,0,0);
                break;
            case 'and_':
                this.match(this.Tokens[this.n],'and_');
                i =  new OperacionLogica( TypeOperation.AND,this.Expresion(),null,0,0);
                break;
            case 'xor_':
                this.match(this.Tokens[this.n],'xor_');
                i =  new OperacionLogica( TypeOperation.XOR,this.Expresion(),null,0,0);
                break;
            default:
                i = new OperacionRelacional("ERROR",null,null,0,0);
                this.match(this.Tokens[this.n],'ERROR');
                break;
        }
        return i;
    }

    match(token: Token,esperado: string ){
        if(token.tipo==esperado){
        }
        else{
            this.lista_Error.push(new Error_("SINTACTICO",this.Tokens[this.n].fila,this.Tokens[this.n].columna,this.Tokens[this.n].descripcion+" se esperaba:"+esperado));
        }
        this.n++;

    }
}