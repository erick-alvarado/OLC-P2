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

import { Expresion } from "../dist/ast/expresiones/Expresion";
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
        this.Tokens.push(new Token(0,0,"$","$"));
        while(this.Tokens[this.n]!=null){
            if(this.Tokens[this.n].tipo=="$"){
                break;
            }
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
                        this.match(this.Tokens[this.n],'class/interface/static');
                        break;    
                    
                }
            }
            else{
                this.match(this.Tokens[this.n],'public');

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
                             this.match(this.Tokens[this.n],'pcoma'); 
                            break;
                        case 'menos_menos':
                            instrucciones.push(this.Incremento_Decremento());
                            this.match(this.Tokens[this.n],'pcoma'); 
                            break;
                        case 'igual':
                            instrucciones.push(this.Asignacion());
                            break;
                        case 'parAbre':
                            instrucciones.push(this.Llamada());
                            break;
                        default:
                            this.match(this.Tokens[this.n],'mas_mas/menos_menos/igual/parAbre');
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
                    instrucciones.push(this.Do());
                    break;
                case 'for_':
                    instrucciones.push(this.For());
                    break;
                case 'if_':
                    instrucciones.push(this.If());
                    break;
                case 'system_':
                    instrucciones.push(this.Print());
                    break;
                case 'break_':
                    this.match(this.Tokens[this.n],'break_');
                    this.match(this.Tokens[this.n],'pcoma'); 
                    instrucciones.push(new Sentencia(this.Tokens[this.n-2].descripcion,null,0,0))
                    break;
                case 'continue_':
                    this.match(this.Tokens[this.n],'continue_');
                    this.match(this.Tokens[this.n],'pcoma'); 
                    instrucciones.push(new Sentencia(this.Tokens[this.n-2].descripcion,null,0,0))
                    break;
                case 'return_':
                    this.match(this.Tokens[this.n],'return_');
                    let exp = this.E();
                    this.match(this.Tokens[this.n],'pcoma'); 
                    instrucciones.push(new Sentencia("return",exp,0,0))
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
    Print():Instruccion{
        let i ;
        let tipo;
        this.match(this.Tokens[this.n],'system_'); 
        this.match(this.Tokens[this.n],'punto');
        this.match(this.Tokens[this.n],'out_');
        this.match(this.Tokens[this.n],'punto'); 
        if(this.Tokens[this.n].tipo=='print_'){
            tipo =this.Tokens[this.n].tipo;
            this.match(this.Tokens[this.n],'print_');  
        }
        else if(this.Tokens[this.n].tipo=='println_'){
            tipo =this.Tokens[this.n].tipo;
            this.match(this.Tokens[this.n],'println_');  
        }
        else{
            tipo = "";
            this.match(this.Tokens[this.n],'println o print');
        }
        this.match(this.Tokens[this.n],'parAbre');
        let exp = this.E();
        this.match(this.Tokens[this.n],'parCierra');
        this.match(this.Tokens[this.n],'pcoma');

        i = new Print(tipo,exp,0,0);
        return i;
    }

    If():Instruccion{
        let i ;
        let els = null;
        let bloque  = null;
        this.match(this.Tokens[this.n],'if_');
        this.match(this.Tokens[this.n],'parAbre');
        let exp = this.E();
        this.match(this.Tokens[this.n],'parCierra');
        bloque = this.Bloque_Sentencias();

        if(this.Tokens[this.n].tipo=='else_'){
            els = this.Else();
        }
        i = new If(exp,bloque,els,0,0);

        return i;
    }

    Else():Instruccion{
        let i ;
        let iff = null;
        let bloque = null;
        this.match(this.Tokens[this.n],'else_');
        if(this.Tokens[this.n].tipo=='if_'){
            iff = this.If();
        }
        else{
            bloque = this.Bloque_Sentencias();
        }
        i = new Else(iff,bloque,0,0);
        return i;
    }

    
    For():Instruccion{
        let i ;
        this.match(this.Tokens[this.n],'for_');
        this.match(this.Tokens[this.n],'parAbre');
        let decla = this.Declaracion();
        let exp = this.E();
        this.match(this.Tokens[this.n],'pcoma'); 
        let exp2 = this.E();
        this.match(this.Tokens[this.n],'parCierra');
        let bloque = this.Bloque_Sentencias(); 

        i = new For(decla,exp,exp2,bloque,0,0);
        return i;
    }
    Do():Instruccion{
        let i ;
        this.match(this.Tokens[this.n],'do_'); 
        let bloque = this.Bloque_Sentencias();
        this.match(this.Tokens[this.n],'while_'); 
        this.match(this.Tokens[this.n],'parAbre'); 
        let exp = this.E();
        this.match(this.Tokens[this.n],'parCierra'); 
        this.match(this.Tokens[this.n],'pcoma'); 
        i = new DoWhile(exp,bloque,0,0)


        return i;
    }

    While():Instruccion{
        let i ;
        this.match(this.Tokens[this.n],'while_'); 
        this.match(this.Tokens[this.n],'parAbre'); 
        let exp = this.E();
        
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
            this.match(this.Tokens[this.n],'pcoma/llaveAbre');
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
                i = new Declaracion(tipo,id,null,null,0,0);
                this.match(this.Tokens[this.n],'pcoma');
                break;
            case 'coma':
                this.match(this.Tokens[this.n],'coma');
                i = new Declaracion(tipo,id,null,this.Declara(),0,0);
                this.match(this.Tokens[this.n],'pcoma');
                break;
            case 'igual':
                this.match(this.Tokens[this.n],'igual');
                let exp = this.E();
                if(this.Tokens[this.n].tipo=='pcoma'){
                    i = new Declaracion(tipo,id,exp,null,0,0);
                }
                else if(this.Tokens[this.n].tipo=='coma'){
                    this.match(this.Tokens[this.n],'coma');
                    i = new Declaracion(tipo,id,exp,this.Declara(),0,0);
                }
                else{
                    i = new Primitivo("ERROR");
                    this.match(this.Tokens[this.n],'pcoma/coma');
                    return i;
                }
                this.match(this.Tokens[this.n],'pcoma');
                break;
            default:
                i = new Primitivo("ERROR");
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
                i = new Declaracion(Type.COMA,id,null,null,0,0);
                break;
            case 'coma':
                this.match(this.Tokens[this.n],'coma');
                i = new Declaracion(Type.COMA,id,null,this.Declara(),0,0);
                break;
            case 'igual':
                this.match(this.Tokens[this.n],'igual');
                let exp = this.E();
                if(this.Tokens[this.n].tipo=='pcoma'){
                    i = new Declaracion(Type.COMA,id,exp,null,0,0);
                }
                else if(this.Tokens[this.n].tipo=='coma'){
                    this.match(this.Tokens[this.n],'coma');
                    i = new Declaracion(Type.COMA,id,exp,this.Declara(),0,0);
                }
                else{
                    i = new Primitivo("ERROR");
                    this.match(this.Tokens[this.n],'pcoma/coma');
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
            case 'double_':
                this.match(this.Tokens[this.n],'double_');
                i = Type.DOUBLE;
                break;
            case 'void_':
                    this.match(this.Tokens[this.n],'void_');
                    i = Type.VOID;
                    break;
            case 'char_':
                this.match(this.Tokens[this.n],'char_');
                i = Type.CHAR;
                break;
            default:
                i = new Primitivo("ERROR");
                this.match(this.Tokens[this.n],'numeric/string/boolean/double/char');
                return i;
        }
        return i;
    }
    Asignacion(): Instruccion{
        this.match(this.Tokens[this.n],'identificador');
        this.match(this.Tokens[this.n],'igual');
        let i = new Asignacion(this.Tokens[this.n-2].descripcion, this.E(),0,0 );
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
                if(this.Tokens[this.n+1].tipo=="mas_mas"||this.Tokens[this.n+1].tipo=="menos_menos"){
                    i = this.Incremento_Decremento();
                }
                else{
                    i = new Primitivo(this.Tokens[this.n].descripcion);
                    this.match(this.Tokens[this.n],'identificador');
                }
                break;
            default:
                i = new Primitivo("ERROR");
                this.match(this.Tokens[this.n],'decimal/entero/caracter/cadena/true/false/identificador');
                return i;
                break;
        }
        return i;
    }
   
    E(): Instruccion{
        let i;
        let t =this.T();
        let ep =this.EP();
        i = new Expresion(TypeOperation.E, t , ep,0,0);
        return i;
    }
    EP(): Instruccion{
        let tipo= null;
        let t= null;
        let ep=null;
        switch(this.Tokens[this.n].tipo){
            case 'mas':
                tipo = TypeOperation.SUMA;
                this.match(this.Tokens[this.n],'mas');
                t= this.T();
                ep =this.EP();
                break;
            case 'menos':
                tipo = TypeOperation.RESTA;
                this.match(this.Tokens[this.n],'menos');
                t= this.T();
                ep =this.EP();
                break;
            case 'mayorQ':
                tipo = TypeOperation.MAYOR;
                this.match(this.Tokens[this.n],'mayorQ');
                t= this.T();
                ep =this.EP();
                break;
            case 'menorQ':
                tipo = TypeOperation.MENOR;
                this.match(this.Tokens[this.n],'menorQ');
                t= this.T();
                ep =this.EP();
                break;
            case 'mayorQ_igual':
                tipo = TypeOperation.MAYOR_IGUAL;
                this.match(this.Tokens[this.n],'mayorQ_igual');
                t= this.T();
                ep =this.EP();
                break;
            case 'menorQ_igual':
                tipo = TypeOperation.MENOR_IGUAL;
                this.match(this.Tokens[this.n],'menorQ_igual');
                t= this.T();
                ep =this.EP();
                break;
            case 'igual_igual':
                tipo = TypeOperation.IGUAL_IGUAL;
                this.match(this.Tokens[this.n],'igual_igual');
                t= this.T();
                ep =this.EP();
                break;
            case 'distinto':
                tipo = TypeOperation.DISTINTO;
                this.match(this.Tokens[this.n],'distinto');
                t= this.T();
                ep =this.EP();
                break;
            case 'or_':
                tipo = TypeOperation.OR;
                this.match(this.Tokens[this.n],'or_');
                t= this.T();
                ep =this.EP();
                break;
            case 'and_':
                tipo = TypeOperation.AND;
                this.match(this.Tokens[this.n],'and_');
                t= this.T();
                ep =this.EP();
                break;
            case 'xor_':
                tipo = TypeOperation.XOR;
                this.match(this.Tokens[this.n],'xor_');
                t= this.T();
                ep =this.EP();
                break;
            default:
                break;
        }
        return new Expresion(tipo,t,ep,0,0);
    }
    T(): Instruccion{
        let f =this.F();
        let tp = this.TP();
        return new Expresion(TypeOperation.T,f,tp,0,0);;
    }
    TP(): Instruccion{
        let tipo=null;
        let f = null;
        let tp = null;
        switch(this.Tokens[this.n].tipo){
            case 'por':
                tipo = TypeOperation.MULTIPLICACION;
                this.match(this.Tokens[this.n],'por');
                f=this.F();
                tp=this.TP();
                break;
            case 'division':
                tipo = TypeOperation.DIVISION;
                this.match(this.Tokens[this.n],'division');
                f=this.F();
                tp =this.TP();
                break;
            default:
                break;
        }
        return new Expresion(tipo, f,tp,0,0);
    }
    F(): Instruccion{
        let tipo =null ;
        let e = null;

        switch(this.Tokens[this.n].tipo){
            case 'parAbre':
                this.match(this.Tokens[this.n],'parAbre');
                e=this.E();
                this.match(this.Tokens[this.n],'parCierra');
                return new Expresion(TypeOperation.PARENTESIS,e,null,0,0);
            case 'not_':
                this.match(this.Tokens[this.n],'not_');
                e=this.E();
                return new Expresion(TypeOperation.NOT,e,null,0,0);
            case 'menos':
                this.match(this.Tokens[this.n],'menos');
                e=this.E();
                return new Expresion(TypeOperation.MENOSUNARIO,e,null,0,0);
            default:
                return this.Primitivo();
        }
    }



    /*

    Expresion2(): Instruccion{
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
        */
    match(token: Token,esperado: string ){
            if(token.tipo==esperado){
            }
            else{
                if(token.tipo=="$"){
                    this.lista_Error.push(new Error_("SINTACTICO",0,0,"se esperaba:"+esperado));
                    this.Tokens.push(new Token(0,0,"$","$"));
                }
                else{
                    this.lista_Error.push(new Error_("SINTACTICO",this.Tokens[this.n].fila,this.Tokens[this.n].columna,this.Tokens[this.n].descripcion+" se esperaba:"+esperado));
                }
            }
            this.n++;
    }
}