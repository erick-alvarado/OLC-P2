"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sintactico = void 0;
const Error_1 = require("./ast/Error_");
const Asignacion_1 = require("../dist/ast/instrucciones/Asignacion");
const Llamada_1 = require("../dist/ast/instrucciones/Llamada");
const Incre_Decre_1 = require("../dist/ast/instrucciones/Incre_Decre");
const OperacionAritmetica_1 = require("../dist/ast/expresiones/OperacionAritmetica");
const OperacionLogica_1 = require("../dist/ast/expresiones/OperacionLogica");
const OperacionRelacional_1 = require("../dist/ast/expresiones/OperacionRelacional");
const Identificador_1 = require("../dist/ast/expresiones/Identificador");
const Primitivo_1 = require("../dist/ast/expresiones/Primitivo");
const Tipo_1 = require("../dist/ast/Tipo");
const Clase_1 = require("../dist/ast/clases/Clase");
const interface_1 = require("../dist/ast/clases/interface");
const Main_1 = require("../dist/ast/clases/Main");
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
        while (this.Tokens[this.n] != null) {
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
                case 'numeric_' || 'string_' || 'boolean_' || 'void_' || 'double_' || 'char_': //DECLARACION
                    break;
                case 'public_': //FUNCION CLASE / FUNCION INTERFACE
                    break;
                case 'while_':
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
                    this.match(this.Tokens[this.n], 'llaveCierra');
                    return instrucciones;
                    break;
            }
        }
    }
    Asignacion() {
        this.match(this.Tokens[this.n], 'identificador');
        this.match(this.Tokens[this.n], 'igual');
        let i = new Asignacion_1.Asignacion(this.Tokens[this.n - 2].descripcion, this.Expresiones(), 0, 0);
        this.match(this.Tokens[this.n], 'pcoma');
        return i;
    }
    Incremento_Decremento() {
        this.match(this.Tokens[this.n], 'identificador');
        let i;
        if (this.Tokens[this.n].tipo == 'mas_mas') {
            i = new Incre_Decre_1.Incre_Decre(this.Tokens[this.n - 1].descripcion, Tipo_1.TypeOperation.ADICION, 0, 0);
            this.match(this.Tokens[this.n], 'mas_mas');
        }
        else {
            i = new Incre_Decre_1.Incre_Decre(this.Tokens[this.n - 1].descripcion, Tipo_1.TypeOperation.SUBSTRACCION, 0, 0);
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
                break;
        }
        return i;
    }
    Expresiones() {
        let i = [];
        i.push(this.Expresion());
        while (this.Tokens[this.n].tipo != 'pcoma') {
            console.log(this.Tokens[this.n - 1].tipo);
            if (this.Tokens[this.n - 1].tipo == 'menos_menos' || this.Tokens[this.n - 1].tipo == 'mas_mas' || this.Tokens[this.n - 1].tipo == 'identificador' || this.Tokens[this.n - 1].tipo == 'entero') {
                i.push(this.Expresion_Opera());
            }
            else {
                i.push(this.Expresion());
            }
            if (this.n >= this.Tokens.length) {
                return i;
            }
        }
        return i;
    }
    Expresion() {
        let i;
        switch (this.Tokens[this.n].tipo) {
            case 'distinto':
                this.match(this.Tokens[this.n], 'distinto');
                i = new OperacionRelacional_1.OperacionRelacional(Tipo_1.TypeOperation.DISTINTO, this.Expresion(), null, 0, 0);
                break;
            case 'not_':
                this.match(this.Tokens[this.n], 'not_');
                i = new OperacionLogica_1.OperacionLogica(Tipo_1.TypeOperation.NOT, this.Expresion(), null, 0, 0);
                break;
            case 'menos':
                this.match(this.Tokens[this.n], 'menos');
                i = new OperacionAritmetica_1.OperacionAritmetica(Tipo_1.TypeOperation.MENOSUNARIO, this.Expresion(), null, 0, 0);
                break;
            case 'parAbre':
                this.match(this.Tokens[this.n], 'parAbre');
                i = new OperacionAritmetica_1.OperacionAritmetica(Tipo_1.TypeOperation.PARENTESIS, this.Expresion(), null, 0, 0);
                this.match(this.Tokens[this.n], 'parCierra');
                break;
            case 'identificador':
                if (this.Tokens[this.n + 1].tipo == 'mas_mas' || this.Tokens[this.n + 1].tipo == 'menos_menos') {
                    i = this.Incremento_Decremento();
                }
                else {
                    this.match(this.Tokens[this.n], 'identificador');
                    i = new Identificador_1.Identificador(this.Tokens[this.n - 1].descripcion);
                }
                break;
            default:
                i = this.Primitivo();
                break;
        }
        return i;
    }
    Expresion_Opera() {
        let i;
        switch (this.Tokens[this.n].tipo) {
            case 'por':
                this.match(this.Tokens[this.n], 'por');
                i = new OperacionAritmetica_1.OperacionAritmetica(Tipo_1.TypeOperation.MULTIPLICACION, this.Expresion(), null, 0, 0);
                break;
            case 'division':
                this.match(this.Tokens[this.n], 'division');
                i = new OperacionAritmetica_1.OperacionAritmetica(Tipo_1.TypeOperation.DIVISION, this.Expresion(), null, 0, 0);
                break;
            case 'mas':
                this.match(this.Tokens[this.n], 'mas');
                i = new OperacionAritmetica_1.OperacionAritmetica(Tipo_1.TypeOperation.SUMA, this.Expresion(), null, 0, 0);
                break;
            case 'menos':
                this.match(this.Tokens[this.n], 'menos');
                i = new OperacionAritmetica_1.OperacionAritmetica(Tipo_1.TypeOperation.RESTA, this.Expresion(), null, 0, 0);
                break;
            case 'mayorQ':
                this.match(this.Tokens[this.n], 'mayorQ');
                i = new OperacionRelacional_1.OperacionRelacional(Tipo_1.TypeOperation.MAYOR, this.Expresion(), null, 0, 0);
                break;
            case 'menorQ':
                this.match(this.Tokens[this.n], 'menorQ');
                i = new OperacionRelacional_1.OperacionRelacional(Tipo_1.TypeOperation.MENOR, this.Expresion(), null, 0, 0);
                break;
            case 'mayorQ_igual':
                this.match(this.Tokens[this.n], 'mayorQ_igual');
                i = new OperacionRelacional_1.OperacionRelacional(Tipo_1.TypeOperation.MAYOR_IGUAL, this.Expresion(), null, 0, 0);
                break;
            case 'menorQ_igual':
                this.match(this.Tokens[this.n], 'menorQ_igual');
                i = new OperacionRelacional_1.OperacionRelacional(Tipo_1.TypeOperation.MENOR_IGUAL, this.Expresion(), null, 0, 0);
                break;
            case 'igual_igual':
                this.match(this.Tokens[this.n], 'igual_igual');
                i = new OperacionRelacional_1.OperacionRelacional(Tipo_1.TypeOperation.IGUAL_IGUAL, this.Expresion(), null, 0, 0);
                break;
            case 'or_':
                this.match(this.Tokens[this.n], 'or_');
                i = new OperacionLogica_1.OperacionLogica(Tipo_1.TypeOperation.OR, this.Expresion(), null, 0, 0);
                break;
            case 'and_':
                this.match(this.Tokens[this.n], 'and_');
                i = new OperacionLogica_1.OperacionLogica(Tipo_1.TypeOperation.AND, this.Expresion(), null, 0, 0);
                break;
            case 'xor_':
                this.match(this.Tokens[this.n], 'xor_');
                i = new OperacionLogica_1.OperacionLogica(Tipo_1.TypeOperation.XOR, this.Expresion(), null, 0, 0);
                break;
            default:
                i = new OperacionRelacional_1.OperacionRelacional("ERROR", null, null, 0, 0);
                this.match(this.Tokens[this.n], 'ERROR');
                break;
        }
        return i;
    }
    match(token, esperado) {
        if (token.tipo == esperado) {
        }
        else {
            this.lista_Error.push(new Error_1.Error_("SINTACTICO", this.Tokens[this.n].fila, this.Tokens[this.n].columna, this.Tokens[this.n].descripcion));
        }
        this.n++;
    }
}
exports.Sintactico = Sintactico;
//# sourceMappingURL=Sintactico.js.map