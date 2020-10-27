"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sintactico = void 0;
const Error_1 = require("./ast/Error_");
const Asignacion_1 = require("../dist/ast/instrucciones/Asignacion");
const Declaracion_1 = require("../dist/ast/instrucciones/Declaracion");
const While_1 = require("../dist/ast/instrucciones/While");
const DoWhile_1 = require("../dist/ast/instrucciones/DoWhile");
const Llamada_1 = require("../dist/ast/instrucciones/Llamada");
const Incre_Decre_1 = require("../dist/ast/instrucciones/Incre_Decre");
const Expresion_1 = require("../dist/ast/expresiones/Expresion");
const Primitivo_1 = require("../dist/ast/expresiones/Primitivo");
const Tipo_1 = require("../dist/ast/Tipo");
const Tipo_2 = require("../dist/ast/Tipo");
const Clase_1 = require("../dist/ast/clases/Clase");
const interface_1 = require("../dist/ast/clases/interface");
const Main_1 = require("../dist/ast/clases/Main");
const Parametro_1 = require("../dist/ast/instrucciones/Parametro");
const Funcion_Clase_1 = require("../dist/ast/funciones/Funcion_Clase");
const Funcion_Interface_1 = require("../dist/ast/funciones/Funcion_Interface");
class Sintactico {
    constructor(tokens) {
        this.n = 0;
        this.Tokens = [];
        this.lista_Error = [];
        this.Instrucciones = [];
        this.Tokens = tokens;
    }
    Analizar() {
        while (this.Tokens[this.n] != null) {
            if (this.Tokens[this.n].tipo == 'public_') {
                this.match(this.Tokens[this.n], 'public_');
                switch (this.Tokens[this.n].tipo) {
                    case 'class_':
                        this.match(this.Tokens[this.n], 'class_');
                        this.match(this.Tokens[this.n], 'identificador');
                        this.Instrucciones.push(new Clase_1.Clase(this.Tokens[this.n - 1].descripcion, this.Bloque_Sentencias(), 0, 0));
                        break;
                    case 'interface_':
                        this.match(this.Tokens[this.n], 'interface_');
                        this.match(this.Tokens[this.n], 'identificador');
                        this.Instrucciones.push(new interface_1.Interface(this.Tokens[this.n - 1].descripcion, this.Bloque_Sentencias(), 0, 0));
                        break;
                    case 'static_':
                        this.match(this.Tokens[this.n], 'static_');
                        this.match(this.Tokens[this.n], 'void_');
                        this.match(this.Tokens[this.n], 'main_');
                        this.match(this.Tokens[this.n], 'parAbre');
                        this.match(this.Tokens[this.n], 'string_');
                        this.match(this.Tokens[this.n], 'corchetes');
                        this.match(this.Tokens[this.n], 'args_');
                        this.match(this.Tokens[this.n], 'parCierra');
                        this.Instrucciones.push(new Main_1.Main(this.Tokens[this.n - 1].descripcion, this.Bloque_Sentencias(), 0, 0));
                        break;
                    default:
                        this.match(this.Tokens[this.n], 'ERROR');
                        break;
                }
            }
            else {
                this.match(this.Tokens[this.n], 'ERROR');
            }
        }
    }
    Bloque_Sentencias() {
        this.match(this.Tokens[this.n], 'llaveAbre');
        if (this.Tokens[this.n].tipo == "llaveCierra") {
            this.match(this.Tokens[this.n], 'llaveCierra');
            return [];
        }
        let instrucciones = [];
        while (this.n <= this.Tokens.length) {
            switch (this.Tokens[this.n].tipo) {
                case 'identificador': //  INCRE_DECRE/ ASIGNACION   / LLAMADA
                    switch (this.Tokens[this.n + 1].tipo) {
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
                            this.match(this.Tokens[this.n], 'ERROR');
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
                    this.match(this.Tokens[this.n], 'llaveCierra');
                    return instrucciones;
                    break;
            }
        }
    }
    Whil() {
        let i;
        return i;
    }
    Do() {
        let i;
        this.match(this.Tokens[this.n], 'do_');
        let bloque = this.Bloque_Sentencias();
        this.match(this.Tokens[this.n], 'while_');
        this.match(this.Tokens[this.n], 'parAbre');
        let exp = this.E();
        this.match(this.Tokens[this.n], 'parCierra');
        this.match(this.Tokens[this.n], 'pcoma');
        i = new DoWhile_1.DoWhile();
        return i;
    }
    While() {
        let i;
        this.match(this.Tokens[this.n], 'while_');
        this.match(this.Tokens[this.n], 'parAbre');
        let exp = this.E();
        this.match(this.Tokens[this.n], 'parCierra');
        let bloque = this.Bloque_Sentencias();
        i = new While_1.While(exp, bloque, 0, 0);
        return i;
    }
    Funcion_Clase_Interface() {
        let i;
        this.match(this.Tokens[this.n], 'public_');
        let tipo = this.Tipo();
        this.match(this.Tokens[this.n], 'identificador');
        let id = this.Tokens[this.n - 1].descripcion;
        this.match(this.Tokens[this.n], 'parAbre');
        let params = this.Parametros();
        this.match(this.Tokens[this.n], 'parCierra');
        if (this.Tokens[this.n].tipo == 'pcoma') {
            i = new Funcion_Interface_1.Funcion_Interface(tipo, id, params, 0, 0);
            this.match(this.Tokens[this.n], 'pcoma');
        }
        else if (this.Tokens[this.n].tipo == 'llaveAbre') {
            i = new Funcion_Clase_1.Funcion_Clase(tipo, id, params, this.Bloque_Sentencias(), 0, 0);
        }
        else {
            i = new Primitivo_1.Primitivo("ERROR");
            this.match(this.Tokens[this.n], 'ERROR');
        }
        return i;
    }
    Parametros() {
        let i = [];
        i.push(this.Parametro());
        while (this.Tokens[this.n].tipo == 'coma') {
            this.match(this.Tokens[this.n], 'coma');
            i.push(this.Parametro());
        }
        return i;
    }
    Parametro() {
        let i;
        let tipo = this.Tipo();
        this.match(this.Tokens[this.n], 'identificador');
        i = new Parametro_1.Parametro(tipo, this.Tokens[this.n - 1].descripcion, 0, 0);
        return i;
    }
    Declaracion() {
        let i;
        let tipo = this.Tipo();
        this.match(this.Tokens[this.n], 'identificador');
        let id = this.Tokens[this.n - 1].descripcion;
        switch (this.Tokens[this.n].tipo) {
            case 'pcoma':
                i = new Declaracion_1.Declaracion(tipo, this.Tokens[this.n - 1].descripcion, null, null, 0, 0);
                this.match(this.Tokens[this.n], 'pcoma');
                break;
            case 'coma':
                this.match(this.Tokens[this.n], 'coma');
                i = new Declaracion_1.Declaracion(tipo, id, null, this.Declara(), 0, 0);
                this.match(this.Tokens[this.n], 'pcoma');
                break;
            case 'igual':
                this.match(this.Tokens[this.n], 'igual');
                let exp = this.E();
                if (this.Tokens[this.n].tipo == 'pcoma') {
                    i = new Declaracion_1.Declaracion(tipo, id, exp, null, 0, 0);
                }
                else if (this.Tokens[this.n].tipo == 'coma') {
                    this.match(this.Tokens[this.n], 'coma');
                    i = new Declaracion_1.Declaracion(tipo, id, exp, this.Declara(), 0, 0);
                }
                else {
                    i = new Primitivo_1.Primitivo("ERROR");
                    this.match(this.Tokens[this.n], 'ERROR');
                    return i;
                }
                this.match(this.Tokens[this.n], 'pcoma');
                break;
        }
        return i;
    }
    Declara() {
        let i;
        this.match(this.Tokens[this.n], 'identificador');
        let id = this.Tokens[this.n - 1].descripcion;
        switch (this.Tokens[this.n].tipo) {
            case 'pcoma':
                i = new Declaracion_1.Declaracion(Tipo_1.Type.COMA, this.Tokens[this.n - 1].descripcion, null, null, 0, 0);
                break;
            case 'coma':
                this.match(this.Tokens[this.n], 'coma');
                i = new Declaracion_1.Declaracion(Tipo_1.Type.COMA, this.Tokens[this.n - 1].descripcion, null, this.Declara(), 0, 0);
                break;
            case 'igual':
                this.match(this.Tokens[this.n], 'igual');
                let exp = this.E();
                if (this.Tokens[this.n].tipo == 'pcoma') {
                    i = new Declaracion_1.Declaracion(Tipo_1.Type.COMA, id, exp, null, 0, 0);
                }
                else if (this.Tokens[this.n].tipo == 'coma') {
                    this.match(this.Tokens[this.n], 'coma');
                    i = new Declaracion_1.Declaracion(Tipo_1.Type.COMA, id, exp, this.Declara(), 0, 0);
                }
                else {
                    i = new Primitivo_1.Primitivo("ERROR");
                    this.match(this.Tokens[this.n], 'ERROR');
                    return i;
                }
                break;
        }
        return i;
    }
    Tipo() {
        let i;
        switch (this.Tokens[this.n].tipo) {
            case 'numeric_':
                this.match(this.Tokens[this.n], 'numeric_');
                i = Tipo_1.Type.NUMERIC;
                break;
            case 'string_':
                this.match(this.Tokens[this.n], 'string_');
                i = Tipo_1.Type.STRING;
                break;
            case 'boolean_':
                this.match(this.Tokens[this.n], 'boolean_');
                i = Tipo_1.Type.BOOLEAN;
                break;
            case 'void_':
                this.match(this.Tokens[this.n], 'void_');
                i = Tipo_1.Type.VOID;
                break;
            case 'double_':
                this.match(this.Tokens[this.n], 'double_');
                i = Tipo_1.Type.DOUBLE;
                break;
            case 'char_':
                this.match(this.Tokens[this.n], 'char_');
                i = Tipo_1.Type.CHAR;
                break;
            default:
                i = new Primitivo_1.Primitivo("ERROR");
                this.match(this.Tokens[this.n], 'ERROR');
                return i;
                break;
        }
        return i;
    }
    Asignacion() {
        this.match(this.Tokens[this.n], 'identificador');
        this.match(this.Tokens[this.n], 'igual');
        let i = new Asignacion_1.Asignacion(this.Tokens[this.n - 2].descripcion, this.E(), 0, 0);
        this.match(this.Tokens[this.n], 'pcoma');
        return i;
    }
    Incremento_Decremento() {
        this.match(this.Tokens[this.n], 'identificador');
        let i;
        if (this.Tokens[this.n].tipo == 'mas_mas') {
            i = new Incre_Decre_1.Incre_Decre(this.Tokens[this.n - 1].descripcion, Tipo_2.TypeOperation.ADICION, 0, 0);
            this.match(this.Tokens[this.n], 'mas_mas');
        }
        else {
            i = new Incre_Decre_1.Incre_Decre(this.Tokens[this.n - 1].descripcion, Tipo_2.TypeOperation.SUBSTRACCION, 0, 0);
            this.match(this.Tokens[this.n], 'menos_menos');
        }
        this.match(this.Tokens[this.n], 'pcoma');
        return i;
    }
    Llamada() {
        this.match(this.Tokens[this.n], 'identificador');
        this.match(this.Tokens[this.n], 'parAbre');
        let i = new Llamada_1.Llamada(this.Tokens[this.n - 2].descripcion, this.Primitivos());
        this.match(this.Tokens[this.n], 'parCierra');
        this.match(this.Tokens[this.n], 'pcoma');
        return i;
    }
    Primitivos() {
        let i = [];
        i.push(this.Primitivo());
        while (this.Tokens[this.n].tipo == 'coma') {
            this.match(this.Tokens[this.n], 'coma');
            i.push(this.Primitivo());
        }
        return i;
    }
    Primitivo() {
        let i;
        switch (this.Tokens[this.n].tipo) {
            case 'decimal':
                i = new Primitivo_1.Primitivo(this.Tokens[this.n].descripcion);
                this.match(this.Tokens[this.n], 'decimal');
                break;
            case 'entero':
                i = new Primitivo_1.Primitivo(this.Tokens[this.n].descripcion);
                this.match(this.Tokens[this.n], 'entero');
                break;
            case 'caracter':
                i = new Primitivo_1.Primitivo(this.Tokens[this.n].descripcion);
                this.match(this.Tokens[this.n], 'caracter');
                break;
            case 'cadena':
                i = new Primitivo_1.Primitivo(this.Tokens[this.n].descripcion);
                this.match(this.Tokens[this.n], 'cadena');
                break;
            case 'true_':
                i = new Primitivo_1.Primitivo(this.Tokens[this.n].descripcion);
                this.match(this.Tokens[this.n], 'true_');
                break;
            case 'false_':
                i = new Primitivo_1.Primitivo(this.Tokens[this.n].descripcion);
                this.match(this.Tokens[this.n], 'false_');
                break;
            case 'identificador':
                i = new Primitivo_1.Primitivo(this.Tokens[this.n].descripcion);
                this.match(this.Tokens[this.n], 'identificador');
                break;
            default:
                i = new Primitivo_1.Primitivo("ERROR");
                this.match(this.Tokens[this.n], 'ERROR');
                return i;
                break;
        }
        return i;
    }
    E() {
        let i;
        let t = this.T();
        let ep = this.EP();
        i = new Expresion_1.Expresion(Tipo_2.TypeOperation.E, t, ep, 0, 0);
        return i;
    }
    EP() {
        let tipo = null;
        let t = null;
        let ep = null;
        switch (this.Tokens[this.n].tipo) {
            case 'mas':
                tipo = Tipo_2.TypeOperation.SUMA;
                this.match(this.Tokens[this.n], 'mas');
                t = this.T();
                ep = this.EP();
                break;
            case 'menos':
                tipo = Tipo_2.TypeOperation.RESTA;
                this.match(this.Tokens[this.n], 'menos');
                t = this.T();
                ep = this.EP();
                break;
            case 'mayorQ':
                tipo = Tipo_2.TypeOperation.MAYOR;
                this.match(this.Tokens[this.n], 'mayorQ');
                t = this.T();
                ep = this.EP();
                break;
            case 'menorQ':
                tipo = Tipo_2.TypeOperation.MENOR;
                this.match(this.Tokens[this.n], 'menorQ');
                t = this.T();
                ep = this.EP();
                break;
            case 'mayorQ_igual':
                tipo = Tipo_2.TypeOperation.MAYOR_IGUAL;
                this.match(this.Tokens[this.n], 'mayorQ_igual');
                t = this.T();
                ep = this.EP();
                break;
            case 'menorQ_igual':
                tipo = Tipo_2.TypeOperation.MENOR_IGUAL;
                this.match(this.Tokens[this.n], 'menorQ_igual');
                t = this.T();
                ep = this.EP();
                break;
            case 'igual_igual':
                tipo = Tipo_2.TypeOperation.IGUAL_IGUAL;
                this.match(this.Tokens[this.n], 'igual_igual');
                t = this.T();
                ep = this.EP();
                break;
            case 'distinto':
                tipo = Tipo_2.TypeOperation.DISTINTO;
                this.match(this.Tokens[this.n], 'distinto');
                t = this.T();
                ep = this.EP();
                break;
            case 'or_':
                tipo = Tipo_2.TypeOperation.OR;
                this.match(this.Tokens[this.n], 'or_');
                t = this.T();
                ep = this.EP();
                break;
            case 'and_':
                tipo = Tipo_2.TypeOperation.AND;
                this.match(this.Tokens[this.n], 'and_');
                t = this.T();
                ep = this.EP();
                break;
            case 'xor_':
                tipo = Tipo_2.TypeOperation.XOR;
                this.match(this.Tokens[this.n], 'xor_');
                t = this.T();
                ep = this.EP();
                break;
            default:
                break;
        }
        return new Expresion_1.Expresion(tipo, t, ep, 0, 0);
    }
    T() {
        let f = this.F();
        let tp = this.TP();
        return new Expresion_1.Expresion(Tipo_2.TypeOperation.T, f, tp, 0, 0);
        ;
    }
    TP() {
        let tipo = null;
        let f = null;
        let tp = null;
        switch (this.Tokens[this.n].tipo) {
            case 'por':
                tipo = Tipo_2.TypeOperation.MULTIPLICACION;
                this.match(this.Tokens[this.n], 'por');
                f = this.F();
                tp = this.TP();
                break;
            case 'division':
                tipo = Tipo_2.TypeOperation.DIVISION;
                this.match(this.Tokens[this.n], 'division');
                f = this.F();
                tp = this.TP();
                break;
            default:
                break;
        }
        return new Expresion_1.Expresion(tipo, f, tp, 0, 0);
    }
    F() {
        let tipo = null;
        let e = null;
        switch (this.Tokens[this.n].tipo) {
            case 'parAbre':
                this.match(this.Tokens[this.n], 'parAbre');
                e = this.E();
                this.match(this.Tokens[this.n], 'parCierra');
                return new Expresion_1.Expresion(Tipo_2.TypeOperation.PARENTESIS, e, null, 0, 0);
            case 'not_':
                this.match(this.Tokens[this.n], 'not_');
                e = this.E();
                return new Expresion_1.Expresion(Tipo_2.TypeOperation.NOT, e, null, 0, 0);
            case 'menos':
                this.match(this.Tokens[this.n], 'menos');
                e = this.E();
                return new Expresion_1.Expresion(Tipo_2.TypeOperation.MENOSUNARIO, e, null, 0, 0);
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
    match(token, esperado) {
        if (token.tipo == esperado) {
        }
        else {
            this.lista_Error.push(new Error_1.Error_("SINTACTICO", this.Tokens[this.n].fila, this.Tokens[this.n].columna, this.Tokens[this.n].descripcion + " se esperaba:" + esperado));
        }
        this.n++;
    }
}
exports.Sintactico = Sintactico;
//# sourceMappingURL=Sintactico.js.map